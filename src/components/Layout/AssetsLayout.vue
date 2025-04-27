<template>
  <div class="assets-layout">
    <v-breadcrumbs :assets="breadcrumbs" class="px-4 py-2">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
      <template v-slot:title="{ asset }">
        <span :class="{ 'text-grey': asset.disabled }">{{ asset.title }}</span>
      </template>
    </v-breadcrumbs>

    <v-divider class="mb-4"></v-divider>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => {
  const crumbs = [
    { title: 'Assets', disabled: false, to: { name: 'assets-list' } }
  ]

  if (route.meta.title) {
    crumbs.push({
      title: route.meta.title as string,
      disabled: route.name === 'assets-list',
      to: route.path
    })
  }

  return crumbs
})
</script>

<style scoped>
.assets-layout {
  padding: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
