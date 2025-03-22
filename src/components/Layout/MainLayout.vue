<template>
  <VApp>
    <!-- Верхняя панель -->
    <Header />

    <!-- Боковая панель -->
    <Sidebar />

    <!-- Основное содержимое -->
    <VMain>
      <router-view />
    </VMain>

    <!-- Нижняя панель -->
    <Footer />
  </VApp>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
import Footer from './Footer.vue'
import { VApp, VMain } from 'vuetify/components'
</script>

<style scoped>
/* Кастомные стили, если необходимо */
</style>
