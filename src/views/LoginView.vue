<template>
  <v-container class="fill-height">
    <v-card width="400" class="mx-auto">
      <v-card-title class="text-center">Вход в систему</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field v-model="email" label="Email" type="email" required />
          <v-text-field v-model="password" label="Пароль" type="password" required />
          <v-btn type="submit" color="primary" block class="mt-4">
            Войти
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/store/modules/auth'
import { useRouter } from 'vue-router'

const email = ref('admin@example.com')
const password = ref('admin123')
const authStore = useAuthStore()
const router = useRouter()

const login = () => {
  // В реальном приложении здесь будет запрос к API
  if (email.value && password.value) {
    authStore.demoLogin() // Используем демо-авторизацию
    router.push({ name: 'item-list' }) // Перенаправляем после входа
  }
}
</script>
