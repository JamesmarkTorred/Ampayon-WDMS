<script setup>
import { supabase } from '@/supabase'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  isOpen: Boolean,
})

// Add user reference if needed (or remove the user.value line)
const user = ref(null)
const activeTab = ref('home')
const isLoggingOut = ref(false)

const setActiveTab = (tab) => {
  activeTab.value = tab
}

const toggleDropdown = (tab) => {
  activeTab.value = activeTab.value === tab ? null : tab
}

const handleLogout = async () => {
  isLoggingOut.value = true
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    // Clear user state if you're using it
    user.value = null
    
    // Redirect to login
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
    // Consider adding user feedback here (e.g., toast notification)
  } finally {
    isLoggingOut.value = false
  }
}
</script>

<template>
  <div
    class="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform"
    :class="{ '-translate-x-full': !isOpen }"
  >
    <router-link
      to="/dashboard"
      class="flex items-center pb-4 border-b border-b-gray-800"
      @click="setActiveTab('home')"
    >
      <img src="@/assets/logo.png" alt="DPWH Logo" class="w-8 h-8 rounded object-cover" />
      <span class="text-lg font-bold text-white ml-3">DPWH</span>
    </router-link>

    <ul class="mt-4">
      <!-- Dashboard -->
      <li class="mb-1 group" :class="{ active: activeTab === 'dashboard' }">
        <router-link
          to="/dashboard"
          class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white"
          @click="setActiveTab('dashboard')"
        >
          <i class="ri-dashboard-2-line mr-3 text-lg"></i>
          <span class="text-sm">Dashboard</span>
        </router-link>
      </li>

      <!-- Function Dropdown -->
      <li class="mb-1 group" :class="{ active: activeTab === 'function' }">
        <a
          href="#"
          class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white"
          @click.prevent="toggleDropdown('function')"
          :aria-expanded="activeTab === 'function'"
        >
          <i class="ri-instance-line mr-3 text-lg"></i>
          <span class="text-sm">Function</span>
          <i
            class="ri-arrow-right-s-line ml-auto transition-transform duration-200"
            :class="{ 'rotate-90': activeTab === 'function' }"
          ></i>
        </a>
        <ul 
          class="pl-7 mt-2" 
          v-show="activeTab === 'function'"
          aria-hidden="activeTab !== 'function'"
        >
          <li class="mb-4">
            <router-link
              to="/dailylog"
              class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
              @click="setActiveTab('function')"
            >
              Logs
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="/violations"
              class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
              @click="setActiveTab('function')"
            >
              Violation Tracking
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="/reports"
              class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
              @click="setActiveTab('function')"
            >
              Report
            </router-link>
          </li>
        </ul>
      </li>

      <!-- Manage Dropdown -->
      <li class="mb-1 group" :class="{ active: activeTab === 'manage' }">
        <a
          href="#"
          class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white"
          @click.prevent="toggleDropdown('manage')"
          :aria-expanded="activeTab === 'manage'"
        >
          <i class="ri-group-line mr-3 text-lg"></i>
          <span class="text-sm">Manage</span>
          <i
            class="ri-arrow-right-s-line ml-auto transition-transform duration-200"
            :class="{ 'rotate-90': activeTab === 'manage' }"
          ></i>
        </a>
        <ul 
          class="pl-7 mt-2" 
          v-show="activeTab === 'manage'"
          aria-hidden="activeTab !== 'manage'"
        >
          <li class="mb-4">
            <router-link
              to="/manage/users"
              class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
              @click="setActiveTab('manage')"
            >
              Manage User
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="/manage/roles"
              class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
              @click="setActiveTab('manage')"
            >
              Manage Role
            </router-link>
          </li>
        </ul>
      </li>

      <!-- Logout -->
      <li class="mb-1 group mt-auto pt-4 border-t border-gray-800">
        <button
          type="button"
          class="w-full flex items-center py-2 px-4 text-gray-300 hover:bg-red-900/50 hover:text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          @click="handleLogout"
          :disabled="isLoggingOut"
          :aria-busy="isLoggingOut"
        >
          <i
            class="ri-logout-box-r-line mr-3 text-lg"
            :class="{ 'animate-spin': isLoggingOut }"
          ></i>
          <span class="text-sm">
            {{ isLoggingOut ? 'Logging out...' : 'Logout' }}
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>