<template>
    <div class="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h1 class="text-3xl font-bold mb-6 text-center">Log Details</h1>
  
      <div v-if="loading" class="text-center text-gray-500">Loading log details...</div>
      <div v-else-if="error" class="text-center text-red-600">Error: {{ error.message }}</div>
      <div v-else class="space-y-4">
        <div class="flex justify-between">
          <span class="font-semibold text-gray-700">Date:</span>
          <span>{{ log.date }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold text-gray-700">Plate Number:</span>
          <span>{{ log.plate_number }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold text-gray-700">Truck Type:</span>
          <span>{{ log.truck_type }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold text-gray-700">Commodity:</span>
          <span>{{ log.commodity }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold text-gray-700">Total Weight:</span>
          <span>{{ log.total_weight }} kg</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold text-gray-700">Overload:</span>
          <span :class="log.overload ? 'text-red-600 font-bold' : 'text-green-600'">
            {{ log.overload ? 'YES' : 'NO' }}
          </span>
        </div>
      </div>
  
      <div class="mt-6 text-center">
        <button @click="goBack" class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          Back to Daily Logs
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { createClient } from '@supabase/supabase-js'
  
  const supabaseUrl = 'https://your-project-url.supabase.co'
  const supabaseKey = 'your-anon-key'
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  const route = useRoute()
  const router = useRouter()
  const log = ref({})
  const loading = ref(true)
  const error = ref(null)
  
  const fetchLog = async () => {
    const { data, error: fetchError } = await supabase
      .from('dailylog')
      .select('*')
      .eq('id', route.params.id)
      .single()
  
    if (fetchError) {
      error.value = fetchError
    } else {
      log.value = data
    }
    loading.value = false
  }
  
  const goBack = () => {
    router.push('/dailylog')
  }
  
  onMounted(fetchLog)
  </script>
  
  <style scoped>
  /* You can add scoped custom styles here if needed */
  </style>
  