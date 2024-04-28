<template>
  <div class="w-full">
      <div class="flex justify-center mt-5 md:mt-5">
        <router-link :to="{ name: user ? 'home' : 'index' }" class="flex-shrink-0 font-semibold flex items-center">
          <img src="/img/logo.png" alt="notion tools logo" class="w-10 h-10">
          <span class="ml-2 text-xl text-black dark:text-white">
            Manchester Chemist
          </span>
        </router-link>
      </div>
      <br>
      <p class="text-sm text-gray-600 dark:text-gray-400 text-center w-full">
        © Copyright {{ currYear }}. All Rights Reserved
      </p>
    </div>
</template>

<script>
import { computed } from 'vue'
import opnformConfig from "~/opnform.config.js";

export default {
  setup () {
    const authStore = useAuthStore()
    return {
      user : computed(() => authStore.user),
      opnformConfig
    }
  },

  data: () => ({
    currYear: new Date().getFullYear(),
  }),

}
</script>
