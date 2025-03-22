<template>
  <v-container>
    <v-card>
      <v-card-title>Авторизация</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
          <v-text-field v-model="password" label="Пароль" type="password" required></v-text-field>
          <v-btn type="submit" color="primary">Войти</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/store/modules/auth'
import { useRouter } from 'vue-router'

const email = ref<string>('')
const password = ref<string>('')
const authStore = useAuthStore()
const router = useRouter()

function handleLogin() {
  const success = authStore.login(email.value, password.value)
  if (success) {
    router.push('/items')
  } else {
    alert('Неверный логин или пароль')
  }
}
</script>
