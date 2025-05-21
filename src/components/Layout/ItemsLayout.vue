<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => {
  const crumbs = [{ title: 'Items', disabled: false, to: { name: 'item-list' } }]

  if (route.meta.title) {
    crumbs.push({
      title: route.meta.title as string,
      disabled: route.name === 'item-list',
      to: route.path,
    })
  }

  return crumbs
})
</script>

<template>
  <div class="items-layout">
    <v-breadcrumbs :items="breadcrumbs" class="px-4 py-2">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
      <template v-slot:title="{ item }">
        <span :class="{ 'text-grey': item.disabled }">{{ item.title }}</span>
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

<style scoped>
.items-layout {
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
