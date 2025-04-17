import { createRouter, createWebHistory } from 'vue-router'

import DashboardLayout from '@/components/DashboardLayout.vue'
import HomeViewLayout from '@/components/HomeViewLayout.vue'
import ForgotPassword from '@/views/auth/ForgotPassword.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import HomeAbout from '@/views/homeview/HomeAbout.vue'
import HomeContent from '@/views/homeview/HomeContent.vue'
import DailyLogs from '@/views/dashboard/dailylogs/DailyLogs.vue'
import CreateLogs from '@/views/dashboard/dailylogs/CreateLogs.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeViewLayout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeContent,
        },
        {
          path: '/about', // no leading slash for child routes
          name: 'about',
          component: HomeAbout,
        },
        {
          path: '/login',
          name: 'login',
          component: Login,
        },
        {
          path: '/register',
          name: 'register',
          component: Register,
        },
        {
          path: '/forgot-password',
          name: 'forgotPassword',
          component: ForgotPassword,
        },
      ],
    },

    {
      path: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView,
        },
        {
          path: '/dailylog',
          name: 'dailylog',
          component: DailyLogs
        },
        {
          path: '/createlog',
          name: 'createlog',
          component: CreateLogs
        },
      ],
    },
  ],
})

export default router
