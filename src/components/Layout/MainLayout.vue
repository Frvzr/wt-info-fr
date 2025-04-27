<template>
  <v-app>
    <AppSidebar />

    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <!-- <AppFooter /> -->
  </v-app>
</template>

<script setup lang="ts">
import AppSidebar from '@/components/Layout/AppSidebar.vue'
// import AppFooter from '@/components/Layout/AppFooter.vue'
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
