<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'

// Report data
const reports = ref([])
const loading = ref(true)
const dateRange = ref('last-30-days')
const reportType = ref('violations-summary')

// Chart data
const chartData = ref({})
const chartOptions = ref({})

// Fetch reports
const fetchReports = async () => {
  try {
    loading.value = true
    
    // Example Supabase query - adjust based on your needs
    const { data, error } = await supabase
      .from('violation_reports')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    reports.value = data
    generateChartData(data)
  } catch (error) {
    console.error('Error fetching reports:', error)
  } finally {
    loading.value = false
  }
}

// Generate sample chart data
const generateChartData = (reportData) => {
  chartData.value = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Violations',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: '#3B82F6',
      },
      {
        label: 'Warnings',
        data: [8, 15, 7, 12, 4, 6],
        backgroundColor: '#F59E0B',
      }
    ]
  }
  
  chartOptions.value = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    }
  }
}

// Export report
const exportReport = (format) => {
  console.log(`Exporting report as ${format}`)
  // Implement actual export logic (PDF/Excel generation)
}

onMounted(() => {
  fetchReports()
})
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Reports Dashboard</h1>
        <p class="text-gray-600">Analyze and export violation data</p>
      </div>
      
      <div class="flex space-x-3 mt-4 md:mt-0">
        <select 
          v-model="dateRange"
          class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
          <option value="custom">Custom Range</option>
        </select>
        
        <select 
          v-model="reportType"
          class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="violations-summary">Violations Summary</option>
          <option value="driver-reports">Driver Reports</option>
          <option value="location-analysis">Location Analysis</option>
          <option value="equipment-reports">Equipment Reports</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <!-- Main Content -->
    <div v-else class="space-y-6">
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 class="text-sm font-medium text-gray-500">Total Violations</h3>
          <p class="text-2xl font-bold mt-1">142</p>
          <p class="text-sm text-green-600 mt-1">↓ 12% from last period</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 class="text-sm font-medium text-gray-500">Repeat Offenders</h3>
          <p class="text-2xl font-bold mt-1">23</p>
          <p class="text-sm text-red-600 mt-1">↑ 8% from last period</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 class="text-sm font-medium text-gray-500">Avg. Resolution Time</h3>
          <p class="text-2xl font-bold mt-1">3.2 <span class="text-sm">days</span></p>
          <p class="text-sm text-green-600 mt-1">↓ 1.1 days improvement</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 class="text-sm font-medium text-gray-500">Most Common Violation</h3>
          <p class="text-2xl font-bold mt-1">Overweight</p>
          <p class="text-sm text-gray-500 mt-1">38% of total</p>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Main Chart -->
        <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Violations by Month</h2>
            <div class="flex space-x-2">
              <button 
                @click="exportReport('pdf')"
                class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md flex items-center"
              >
                <i class="ri-file-pdf-line mr-1"></i> PDF
              </button>
              <button 
                @click="exportReport('excel')"
                class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md flex items-center"
              >
                <i class="ri-file-excel-line mr-1"></i> Excel
              </button>
            </div>
          </div>
          <!-- Chart would go here - using a placeholder -->
          <div class="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-400">
            [Violations Chart]
            <!-- In a real app, you would use Chart.js or similar here -->
          </div>
        </div>

        <!-- Violation Types Pie Chart -->
        <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h2 class="text-lg font-semibold mb-4">Violation Types</h2>
          <div class="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-400">
            [Pie Chart]
            <!-- Pie chart showing violation type distribution -->
          </div>
        </div>
      </div>

      <!-- Data Table -->
      <div class="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Recent Violation Reports</h3>
          <p class="mt-1 text-sm text-gray-500">Last 50 recorded violations</p>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Case ID
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Violation
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="report in reports.slice(0, 5)" :key="report.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ report.case_id || 'VL-' + report.id.slice(0, 6) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ report.driver_name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ report.violation_type }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ new Date(report.created_at).toLocaleDateString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': report.status === 'resolved',
                      'bg-yellow-100 text-yellow-800': report.status === 'pending',
                      'bg-red-100 text-red-800': report.status === 'unresolved'
                    }">
                    {{ report.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
          <router-link 
            to="/violations"
            class="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View all violations →
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>