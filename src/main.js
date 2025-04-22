import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { supabase } from '@/supabase'

const app = createApp(App)
const pinia = createPinia()

// Initialize Pinia first (if you're using stores for auth)
app.use(pinia)
app.use(router)

// Auth state change handler
supabase.auth.onAuthStateChange((event, session) => {
  // Handle important auth events
  switch (event) {
    case 'INITIAL_SESSION':
      // Initial session check complete
      break
    case 'SIGNED_IN':
      // User just signed in
      if (window.location.pathname === '/login' || window.location.pathname === '/register') {
        router.push('/dashboard')
      }
      break
    case 'SIGNED_OUT':
      // User signed out
      if (!['/login', '/register', '/'].includes(window.location.pathname)) {
        router.push('/login')
      }
      break
    case 'TOKEN_REFRESHED':
      // Session token was refreshed
      break
    case 'USER_UPDATED':
      // User data was updated
      break
  }

  // Optional: Update Pinia store if you're using it for auth
  if (pinia && pinia.state.value.auth) {
    pinia.state.value.auth.user = session?.user || null
  }
})

// Wait for initial auth check before mounting
supabase.auth.getSession().finally(() => {
  app.mount('#app')
})