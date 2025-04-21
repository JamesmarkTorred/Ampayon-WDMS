import { ref } from 'vue'
import { supabase } from '@/supabase'

export function useAuth() {
  const user = ref(null)
  const profile = ref(null)

  // Auth state listener
  supabase.auth.onAuthStateChange(async (event, session) => {
    user.value = session?.user || null

    if (user.value) {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.value.id).single()
      if (error) {
        console.error('Failed to fetch profile:', error)
        profile.value = null
      } else {
        profile.value = data
      }
    } else {
      profile.value = null
    }
  })

  const init = async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    user.value = currentUser

    if (user.value) {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.value.id).single()
      if (error) {
        console.error('Failed to fetch profile:', error)
        profile.value = null
      } else {
        profile.value = data
      }
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
    profile.value = null
  }

  return {
    user,
    profile,
    init,
    logout,
  }
}
