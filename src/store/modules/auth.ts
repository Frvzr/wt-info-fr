import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    login(email: string, password: string): boolean {
      // Простая логика для демонстрации
      if (email === 'admin@example.com' && password === 'password') {
        this.isAuthenticated = true
        return true
      }
      return false
    },
    logout() {
      this.isAuthenticated = false
    },
  },
})
