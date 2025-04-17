<template>
    <div class="container mx-auto px-4 py-8">
      <!-- Header Section -->
      <div class="flex flex-wrap justify-between items-center mb-6">
        <div class="w-full md:w-auto mb-4 md:mb-0">
          <h2 class="text-2xl font-bold">Create log</h2>
        </div>
        <div class="w-full md:w-auto">
          <router-link 
            to="/dailylog" 
            class="inline-flex items-center px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-colors"
          >
            <i class="fas fa-arrow-left mr-2"></i> Back
          </router-link>
        </div>
      </div>
  
      <!-- Error Messages -->
      <div v-if="errors.length > 0" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
        <div class="font-bold">Whoops!</div>
        <p>There were some problems with your input.</p>
        <ul class="list-disc pl-5 mt-2">
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>
  
      <!-- Form -->
      <form @submit.prevent="submitForm" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Truck Data Information (Left) -->
          <section class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4 pb-2 border-b">Truck Data Information</h2>
            
            <div class="space-y-4">
              <!-- Date -->
              <div>
                <label for="date" class="block text-sm font-medium text-gray-700 mb-1">Date:</label>
                <input 
                  type="date" 
                  id="date" 
                  v-model="form.date" 
                  required 
                  :class="{'border-red-500': hasError('date')}"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <p v-if="hasError('date')" class="mt-1 text-sm text-red-600">{{ getError('date') }}</p>
              </div>
  
              <!-- Time -->
              <div>
                <label for="time" class="block text-sm font-medium text-gray-700 mb-1">Time (HH:MM AM/PM):</label>
                <input 
                  type="time" 
                  id="time" 
                  v-model="form.time" 
                  required 
                  :class="{'border-red-500': hasError('time')}"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <p v-if="hasError('time')" class="mt-1 text-sm text-red-600">{{ getError('time') }}</p>
              </div>
  
              <!-- Driver Name -->
              <div>
                <label for="driver_name" class="block text-sm font-medium text-gray-700 mb-1">Driver Name:</label>
                <input 
                  type="text" 
                  id="driver_name" 
                  v-model="form.driver_name" 
                  required 
                  :class="{'border-red-500': hasError('driver_name')}"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <p v-if="hasError('driver_name')" class="mt-1 text-sm text-red-600">{{ getError('driver_name') }}</p>
              </div>
  
              <!-- Driver OTP -->
              <div>
                <label for="driver_otp" class="block text-sm font-medium text-gray-700 mb-1">TOP (Temporary Operator's Permit):</label>
                <input 
                  type="text" 
                  id="driver_otp" 
                  v-model="form.driver_otp" 
                  required 
                  :class="{'border-red-500': hasError('driver_otp')}"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <p v-if="hasError('driver_otp')" class="mt-1 text-sm text-red-600">{{ getError('driver_otp') }}</p>
              </div>
  
              <!-- Driver License -->
              <div>
                <label for="driver_license" class="block text-sm font-medium text-gray-700 mb-1">Driver's License:</label>
                <input 
                  type="text" 
                  id="driver_license" 
                  v-model="form.driver_license" 
                  required 
                  :class="{'border-red-500': hasError('driver_license')}"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <p v-if="hasError('driver_license')" class="mt-1 text-sm text-red-600">{{ getError('driver_license') }}</p>
              </div>
  
              <!-- Plate Number -->
              <div>
                <label for="plate_number" class="block text-sm font-medium text-gray-700 mb-1">Plate Number (Tractor Head & Trailer):</label>
                <input 
                  type="text" 
                  id="plate_number" 
                  v-model="form.plate_number" 
                  required 
                  :class="{'border-red-500': hasError('plate_number')}"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <p v-if="hasError('plate_number')" class="mt-1 text-sm text-red-600">{{ getError('plate_number') }}</p>
              </div>
  
              <!-- LTO CR -->
              <div>
                <label for="lto_cr" class="block text-sm font-medium text-gray-700 mb-1">LTO CR No.:</label>
                <input 
                  type="text" 
                  id="lto_cr" 
                  v-model="form.lto_cr" 
                  required 
                  :class="{'border-red-500': hasError('lto_cr')}"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <p v-if="hasError('lto_cr')" class="mt-1 text-sm text-red-600">{{ getError('lto_cr') }}</p>
              </div>
  
              <!-- LTO OR Date -->
              <div>
                <label for="lto_or" class="block text-sm font-medium text-gray-700 mb-1">LTO OR Date:</label>
                <input 
                  type="date" 
                  id="lto_or" 
                  v-model="form.lto_or" 
                  required 
                  :class="{'border-red-500': hasError('lto_or')}"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <p v-if="hasError('lto_or')" class="mt-1 text-sm text-red-600">{{ getError('lto_or') }}</p>
              </div>
  
              <!-- Truck Type -->
              <div>
                <label for="truck_type" class="block text-sm font-medium text-gray-700 mb-1">Truck/Trailer Type:</label>
                <select 
                  id="truck_type" 
                  v-model="form.truck_type" 
                  required 
                  @change="updateGVW"
                  :class="{'border-red-500': hasError('truck_type')}"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select</option>
                  <option value="1-1">1-1 (6 wheels)</option>
                  <option value="1-2">1-2 (10 wheels)</option>
                  <option value="1-3">1-3 (14 wheels)</option>
                  <option value="11-1">11-1 (10 wheels)</option>
                  <option value="11-2">11-2 (14 wheels)</option>
                  <option value="11-3">11-3 (18 wheels)</option>
                  <option value="12-1">12-1 (14 wheels)</option>
                  <option value="12-2">12-2 (18 wheels)</option>
                  <option value="12-3">12-3 (22 wheels)</option>
                  <option value="11-11">11-11 (14 wheels)</option>
                  <option value="11-12">11-12 (18 wheels)</option>
                  <option value="12-11">12-11 (18 wheels)</option>
                  <option value="12-12">12-12 (22 wheels)</option>
                </select>
                <p v-if="hasError('truck_type')" class="mt-1 text-sm text-red-600">{{ getError('truck_type') }}</p>
              </div>
  
              <!-- Commodity Carried -->
              <div>
                <label for="commodity_carried" class="block text-sm font-medium text-gray-700 mb-1">Commodity Carried:</label>
                <input 
                  type="text" 
                  id="commodity_carried" 
                  v-model="form.commodity_carried" 
                  required 
                  :class="{'border-red-500': hasError('commodity_carried')}"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <p v-if="hasError('commodity_carried')" class="mt-1 text-sm text-red-600">{{ getError('commodity_carried') }}</p>
              </div>
  
              <!-- Commodity Type -->
              <div>
                <label for="commodity_type" class="block text-sm font-medium text-gray-700 mb-1">Commodity Type:</label>
                <input 
                  type="text" 
                  id="commodity_type" 
                  v-model="form.commodity_type" 
                  required 
                  :class="{'border-red-500': hasError('commodity_type')}"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <p v-if="hasError('commodity_type')" class="mt-1 text-sm text-red-600">{{ getError('commodity_type') }}</p>
              </div>
  
              <!-- Origin -->
              <div>
                <label for="origin" class="block text-sm font-medium text-gray-700 mb-1">Origin:</label>
                <input 
                  type="text" 
                  id="origin" 
                  v-model="form.origin" 
                  required 
                  :class="{'border-red-500': hasError('origin')}"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <p v-if="hasError('origin')" class="mt-1 text-sm text-red-600">{{ getError('origin') }}</p>
              </div>
  
              <!-- Destination -->
              <div>
                <label for="destination" class="block text-sm font-medium text-gray-700 mb-1">Destination:</label>
                <input 
                  type="text" 
                  id="destination" 
                  v-model="form.destination" 
                  required 
                  :class="{'border-red-500': hasError('destination')}"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <p v-if="hasError('destination')" class="mt-1 text-sm text-red-600">{{ getError('destination') }}</p>
              </div>
            </div>
          </section>
  
          <!-- Weighing Data (Right) -->
          <section class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4 pb-2 border-b">Weighing Data</h2>
            
            <div class="space-y-4">
              <!-- Axle Weights -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Weight per Axle (kgs):</label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input 
                    type="number" 
                    v-model="form.first_axle" 
                    placeholder="1st Axle" 
                    required 
                    @input="calculateTotalWeight"
                    class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <input 
                    type="number" 
                    v-model="form.second_axle" 
                    placeholder="2nd Axle" 
                    @input="calculateTotalWeight"
                    class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <input 
                    type="number" 
                    v-model="form.third_axle" 
                    placeholder="3rd Axle" 
                    @input="calculateTotalWeight"
                    class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <input 
                    type="number" 
                    v-model="form.fourth_axle" 
                    placeholder="4th Axle" 
                    @input="calculateTotalWeight"
                    class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <input 
                    type="number" 
                    v-model="form.fifth_axle" 
                    placeholder="5th Axle" 
                    @input="calculateTotalWeight"
                    class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <input 
                    type="number" 
                    v-model="form.sixth_axle" 
                    placeholder="6th Axle" 
                    @input="calculateTotalWeight"
                    class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <input 
                    type="number" 
                    v-model="form.seventh_axle" 
                    placeholder="7th Axle" 
                    @input="calculateTotalWeight"
                    class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <input 
                    type="number" 
                    v-model="form.eighth_axle" 
                    placeholder="8th Axle" 
                    @input="calculateTotalWeight"
                    class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                </div>
              </div>
  
              <!-- Total Weight -->
              <div>
                <label for="total_weight" class="block text-sm font-medium text-gray-700 mb-1">Total Weight (kgs):</label>
                <input 
                  type="number" 
                  id="total_weight" 
                  v-model="form.total_weight" 
                  required 
                  readonly 
                  class="w-full px-3 py-2 border rounded-md bg-gray-100"
                >
              </div>
  
              <!-- Allowable GVW -->
              <div>
                <label for="allowable_gvw" class="block text-sm font-medium text-gray-700 mb-1">Allowable GVW (kgs):</label>
                <input 
                  type="text" 
                  id="allowable_gvw" 
                  v-model="form.allowable_gvw" 
                  readonly 
                  class="w-full px-3 py-2 border rounded-md bg-gray-100"
                >
              </div>
  
              <!-- Excess Load per Axle -->
              <div>
                <label for="excess_load" class="block text-sm font-medium text-gray-700 mb-1">Excess Load per Axle (kgs):</label>
                <input 
                  type="text" 
                  id="excess_load" 
                  v-model="form.excess_load" 
                  readonly 
                  class="w-full px-3 py-2 border rounded-md bg-gray-100"
                >
              </div>
  
              <!-- Excess Load per GVW -->
              <div>
                <label for="excess_gvw" class="block text-sm font-medium text-gray-700 mb-1">Excess Load per GVW (kgs):</label>
                <input 
                  type="text" 
                  id="excess_gvw" 
                  v-model="form.excess_gvw" 
                  readonly 
                  class="w-full px-3 py-2 border rounded-md bg-gray-100"
                >
              </div>
  
              <!-- Number of Overloaded Axles -->
              <div>
                <label for="overloaded_axles" class="block text-sm font-medium text-gray-700 mb-1">Number of Overloaded Axles:</label>
                <input 
                  type="number" 
                  id="overloaded_axles" 
                  v-model="form.overloaded_axles" 
                  required 
                  :class="{'border-red-500': hasError('overloaded_axles')}"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <p v-if="hasError('overloaded_axles')" class="mt-1 text-sm text-red-600">{{ getError('overloaded_axles') }}</p>
              </div>
  
              <!-- Overloaded -->
              <div>
                <label for="overloaded" class="block text-sm font-medium text-gray-700 mb-1">Overloaded:</label>
                <select 
                  id="overloaded" 
                  v-model="form.overloaded" 
                  :class="{'border-red-500': hasError('overloaded')}"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select</option>
                  <option value="both">Both (GVW & Axle)</option>
                  <option value="gvw-only">GVW Only</option>
                  <option value="axle-only">Axle Only</option>
                </select>
                <p v-if="hasError('overloaded')" class="mt-1 text-sm text-red-600">{{ getError('overloaded') }}</p>
              </div>
  
              <!-- Apprehended -->
              <div>
                <label for="apprehended" class="block text-sm font-medium text-gray-700 mb-1">Apprehended:</label>
                <select 
                  id="apprehended" 
                  v-model="form.apprehended" 
                  required 
                  :class="{'border-red-500': hasError('apprehended')}"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <p v-if="hasError('apprehended')" class="mt-1 text-sm text-red-600">{{ getError('apprehended') }}</p>
              </div>
            </div>
          </section>
        </div>
  
        <!-- Submit Button -->
        <div class="text-center">
          <button 
            type="submit" 
            class="inline-flex items-center px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            <i class="fas fa-save mr-2"></i> Save Log
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      // Form data
      const form = ref({
        date: '',
        time: '',
        driver_name: '',
        driver_otp: '',
        driver_license: '',
        plate_number: '',
        lto_cr: '',
        lto_or: '',
        truck_type: '',
        commodity_carried: '',
        commodity_type: '',
        origin: '',
        destination: '',
        first_axle: '',
        second_axle: '',
        third_axle: '',
        fourth_axle: '',
        fifth_axle: '',
        sixth_axle: '',
        seventh_axle: '',
        eighth_axle: '',
        total_weight: '',
        allowable_gvw: '',
        excess_load: '',
        excess_gvw: '',
        overloaded_axles: '',
        overloaded: '',
        apprehended: ''
      });
  
      // Error handling
      const errors = ref([]);
  
      // Set today's date as default
      onMounted(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        form.value.date = `${year}-${month}-${day}`;
      });
  
      // Update GVW based on truck type
      const updateGVW = () => {
        const gvwMapping = {
          '1-1': 15000,
          '1-2': 25000,
          '1-3': 35000,
          '11-1': 30000,
          '11-2': 40000,
          '11-3': 50000,
          '12-1': 35000,
          '12-2': 45000,
          '12-3': 55000,
          '11-11': 45000,
          '11-12': 55000,
          '12-11': 50000,
          '12-12': 60000,
        };
        form.value.allowable_gvw = gvwMapping[form.value.truck_type] || 'N/A';
        calculateExcessLoad();
      };
  
      // Calculate total weight
      const calculateTotalWeight = () => {
        const axleWeights = [
          parseFloat(form.value.first_axle) || 0,
          parseFloat(form.value.second_axle) || 0,
          parseFloat(form.value.third_axle) || 0,
          parseFloat(form.value.fourth_axle) || 0,
          parseFloat(form.value.fifth_axle) || 0,
          parseFloat(form.value.sixth_axle) || 0,
          parseFloat(form.value.seventh_axle) || 0,
          parseFloat(form.value.eighth_axle) || 0
        ];
        
        form.value.total_weight = axleWeights.reduce((sum, weight) => sum + weight, 0);
        calculateExcessLoad();
      };
  
      // Calculate excess load
      const calculateExcessLoad = () => {
        // Calculate excess per axle
        const axleWeights = [
          parseFloat(form.value.first_axle) || 0,
          parseFloat(form.value.second_axle) || 0,
          parseFloat(form.value.third_axle) || 0,
          parseFloat(form.value.fourth_axle) || 0,
          parseFloat(form.value.fifth_axle) || 0,
          parseFloat(form.value.sixth_axle) || 0,
          parseFloat(form.value.seventh_axle) || 0,
          parseFloat(form.value.eighth_axle) || 0
        ];
        
        const excessPerAxle = axleWeights.reduce((sum, weight) => {
          return sum + (weight > 13500 ? weight - 13500 : 0);
        }, 0);
        
        form.value.excess_load = excessPerAxle > 0 ? excessPerAxle : 0;
        
        // Calculate excess GVW
        const allowableGVW = parseFloat(form.value.allowable_gvw) || 0;
        const totalWeight = parseFloat(form.value.total_weight) || 0;
        const excessGVW = totalWeight > allowableGVW ? totalWeight - allowableGVW : 0;
        
        form.value.excess_gvw = excessGVW > 0 ? excessGVW : 0;
      };
  
      // Error handling helpers
      const hasError = (field) => {
        return errors.value.some(e => e.field === field);
      };
  
      const getError = (field) => {
        const error = errors.value.find(e => e.field === field);
        return error ? error.message : '';
      };
  
      // Form submission
      const submitForm = async () => {
        errors.value = []; // Clear previous errors
        
        // Here you would typically make an API call to submit the form
        // For demonstration, we'll just log the form data
        console.log('Form submitted:', form.value);
        
        // Example error handling (replace with your actual validation)
        if (!form.value.driver_name) {
          errors.value.push({ field: 'driver_name', message: 'Driver name is required' });
        }
        
        // If no errors, proceed with submission
        if (errors.value.length === 0) {
          try {
            // await api.post('/daily_logs', form.value);
            alert('Log saved successfully!');
            // Optionally reset form or redirect
            // form.value = {...initialFormState};
            // router.push('/daily_logs');
          } catch (error) {
            // Handle API errors
            if (error.response && error.response.data.errors) {
              errors.value = Object.entries(error.response.data.errors).map(([field, messages]) => ({
                field,
                message: messages[0] // Get the first error message for each field
              }));
            } else {
              errors.value.push({ field: '', message: 'An unexpected error occurred' });
            }
          }
        }
      };
  
      return {
        form,
        errors,
        updateGVW,
        calculateTotalWeight,
        calculateExcessLoad,
        hasError,
        getError,
        submitForm
      };
    }
  };
  </script>
  
  <style>
  /* You can add custom styles here if needed */
  </style>