<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import AuthForm from '@/components/auth/AuthForm.vue'

const router = useRouter()
const form = ref({
  email: '',
  password: ''
})

const handleLogin = () => {
  // Add your authentication logic here
  console.log('Logging in with:', form.value.email, form.value.password)
  router.push('/dashboard')
}
</script>

<template>
  <AuthLayout>
    <template #title>Sign in to your account</template>
    <template #subtitle>
      Or <router-link to="/register" class="font-medium text-blue-600 hover:text-blue-500">Register</router-link>
    </template>

    <AuthForm @submit="handleLogin">
      <template #fields>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
          <div class="mt-1">
            <input id="email" name="email" type="email" autocomplete="email" required
                   v-model="form.email"
                   class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="mt-1">
            <input id="password" name="password" type="password" autocomplete="current-password" required
                   v-model="form.password"
                   class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          </div>
        </div>
      </template>

      <template #button>Sign in</template>
      
    </AuthForm>
  </AuthLayout>
</template>

<style scoped>
/* Add any custom styles here if needed */
</style>