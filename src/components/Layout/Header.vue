<template>
  <v-app-bar app>
    <!-- Логотип -->
    <v-img
      position="left"
      src="src/assets/logo-green.svg"
      alt="Логотип"
      max-height="40"
      class="mr-4"
    />
    <!-- Название приложения -->
    <v-toolbar-title></v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- Кнопка выхода -->
    <v-btn text color="primary" @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/modules/auth'

const authStore = useAuthStore()

// Функция для выхода из приложения
function logout() {
  authStore.logout()
  window.location.href = '/' // Возвращаем на страницу авторизации
}
</script>

<style scoped></style>
