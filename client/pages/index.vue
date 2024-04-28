<template>
  <div class="flex items-center justify-center h-screen bg-gray-100 dark:bg-notion-dark">
    <div class="text-center">
      <h2 class="mb-4 text-3xl font-semibold">You are being redirected</h2>
      <p>If you are not redirected within 5 seconds, please click here:</p>
      <a :href="'/login'" class="text-blue-500 hover:underline">Login</a>
    </div>
  </div>
</template>

<script>

import { computed } from 'vue'
import {useAuthStore} from '../stores/auth'
import opnformConfig from "~/opnform.config.js";

export default {
  components: {},
  layout: 'default',

  setup() {
    const authStore = useAuthStore()
    defineRouteRules({
      swr: 3600
    })

    return {
      authenticated: computed(() => authStore.check),
      config: opnformConfig,
      runtimeConfig: useRuntimeConfig()
    }
  },

  data: () => ({ }),
  computed: {
    configLinks() {
      return this.config.links
    },
    paidPlansEnabled() {
      return this.runtimeConfig.public.paidPlansEnabled
    },
  },

  mounted() {
    if(this.authenticated){
      this.$router.push('/home')
    } else {
      this.$router.push('/login')
    }
  },

  computed: { }
}
</script>

<style lang="scss" scoped>
</style>
