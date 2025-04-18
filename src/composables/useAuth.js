import { ref } from 'vue'
import { supabase } from '@/supabase'
import { useRouter } from 'vue-router'

export function useAuth() {
  const router = useRouter()
  const user = ref(null)
  const profile = ref(null)

  // Initialize auth state
  supabase.auth.onAuthStateChange(async (event, session) => {
    user.value = session?.user || null

    if (user.value) {
      // Get profile data
      const { data } = await supabase.from('profiles').select('*').eq('id', user.value.id).single()
      profile.value = data
    } else {
      profile.value = null
    }
  })

  const init = async () => {
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser()
    user.value = currentUser

    if (user.value) {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.value.id).single()
      profile.value = data
    }
  }

  return {
    user,
    profile,
    init,
  }
}
