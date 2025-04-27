<template>
  <v-navigation-drawer app permanent>
    <div class="logo-container">
      <v-img position="left" :src=companyLogo alt="Логотип" max-height="40" class="my-4" @click="$router.push('/')" />
    </div>
    <v-list density="compact">
      <template v-for="item in filteredMenu" :key="item.title">
        <v-list-group v-if="item.children" :value="item.title" :prepend-icon="item.icon">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="item.title"></v-list-item>
          </template>

          <v-list-item v-for="child in item.children" :key="child.title" :prepend-icon="child.icon" :to="child.route" active-class="active-submenu-item">
            <v-list-item-title>{{ child.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-item v-else :prepend-icon="item.icon" :to="item.route" active-class="active-menu-item">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
    <template v-slot:append>
      <div class="user-block">
        <v-divider class="mb-2"></v-divider>

        <v-list-item v-if="authStore.isAuthenticated" @click="$router.push('/profile')">
          <template v-slot:prepend>
            <v-avatar size="36" color="primary">
              <v-img v-if="authStore.user?.avatar" :src="authStore.user.avatar" />
              <v-icon v-else>mdi-account-circle</v-icon>
            </v-avatar>
          </template>

          <v-list-item-title>
            {{ authStore.user?.name || 'Профиль' }}
          </v-list-item-title>

          <template v-slot:append>
            <v-btn variant="text" icon="mdi-logout" @click.stop="logout" />
          </template>
        </v-list-item>

        <v-btn v-else block color="primary" prepend-icon="mdi-login" @click="$router.push('/login')" class="mb-2">
          Войти
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/store/modules/auth'
import companyLogo from '@/assets/logo-green.svg'
import { menuItems } from '@/config/menu'

const authStore = useAuthStore()

const filteredMenu = computed(() => {
  return menuItems.filter(item => {
    if (!item.permission) return true
    return authStore.hasPermission(item.permission)
  })
})

const logout = async () => {
  try {
    await authStore.logout()
  } catch (error) {
    console.error('Ошибка при выходе:', error)
  }
}
</script>

<style scoped>
.active-menu-item {
  background-color: rgba(25, 118, 210, 0.15);
  color: rgb(25, 118, 210);
}

.active-submenu-item {
  background-color: rgba(25, 118, 210, 0.08);
  color: rgb(25, 118, 210);
}

.v-list-item--active {
  transition: all 0.3s ease;
}

.logo-container {
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 0 16px;
}

.user-block {
  padding: 8px;
}

.v-avatar {
  margin-right: 12px;
}
</style>
