<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/store/modules/auth'
import companyLogo from '@/assets/logo-green.svg'
import { menuItems } from '@/config/menu'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const filteredMenu = computed(() => {
  return menuItems.filter((item) => {
    return !item.permission || authStore.hasPermission(item.permission)
  })
})

const navigateToHome = () => router.push('/')
const navigateToProfile = () => router.push('/profile')
const navigateToLogin = () => router.push('/login')

const logout = async () => {
  try {
    await authStore.logout()
    navigateToLogin()
  } catch (error) {
    console.error('Ошибка при выходе:', error)
  }
}
</script>

<template>
  <v-navigation-drawer app permanent :width="290">
    <template #prepend>
      <v-img :src="companyLogo" contain max-height="40" class="my-4 mx-auto" style="cursor: pointer" @click="navigateToHome" />
    </template>

    <v-list density="compact" class="px-2">
      <template v-for="(item, index) in filteredMenu" :key="index">
        <v-list-group v-if="item.children" :value="item.title">
          <template #activator="{ props: activatorProps }">
            <v-list-item v-bind="activatorProps" :title="item.title" :prepend-icon="item.icon" class="pl-2" />
          </template>

          <v-list-item v-for="(child, childIndex) in item.children" :key="childIndex" :prepend-icon="child.icon" :to="child.route" active-class="active-submenu-item" :title="child.title" class="pl-8" />
        </v-list-group>

        <v-list-item v-else :prepend-icon="item.icon" :to="item.route" active-class="active-menu-item" :title="item.title" class="pl-2" />
      </template>
    </v-list>


    <template #append>
      <div class="user-block px-2">
        <v-divider />
        <template v-if="authStore.isAuthenticated">
          <v-list-item @click="navigateToProfile" class="pl-0">
            <template #prepend>
              <v-avatar color="primary" size="32">
                <v-img v-if="authStore.user?.avatar" :src="authStore.user.avatar" />
                <v-icon v-else size="small">mdi-account-circle</v-icon>
              </v-avatar>
            </template>
            <v-list-item-title class="text-caption">
              {{ authStore.user?.name || 'Профиль' }}
            </v-list-item-title>
            <template #append>
              <v-btn variant="text" icon="mdi-logout" size="small" @click.stop="logout" />
            </template>
          </v-list-item>
        </template>
        <v-btn v-else block color="primary" prepend-icon="mdi-login" size="small" @click="navigateToLogin" class="mt-2">
          Войти
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.active-menu-item {
  background-color: rgba(25, 118, 210, 0.15);
  color: rgb(25, 118, 210);
}

.active-submenu-item {
  background-color: rgba(25, 118, 210, 0.08);
  color: rgb(25, 118, 210);
}

.user-block {
  padding-bottom: 8px;
}

:deep(.v-list-item__prepend)>.v-icon {
  margin-inline-end: 12px;
  font-size: 20px;
}

:deep(.v-list-item-title) {
  font-size: 0.8125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:deep(.v-list-group__items) {
  padding-left: 4px;
}
</style>
