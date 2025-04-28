import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: string
  name: string
  email: string
  permissions: string[]
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  // Демо-логин для тестирования
  const demoLogin = () => {
    user.value = {
      id: '1',
      name: 'Admin',
      email: 'admin@example.com',
      permissions: ['view_items', 'edit_items'],
    }
    token.value = 'demo-token'
  }

  const logout = () => {
    user.value = null
    token.value = null
  }

  const hasPermission = (permission: string) => {
    return user.value?.permissions.includes(permission) ?? false
  }

  return {
    user,
    token,
    isAuthenticated: computed(() => !!token.value),
    demoLogin,
    logout,
    hasPermission,
  }
})
