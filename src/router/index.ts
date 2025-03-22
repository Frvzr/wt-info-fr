import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import ItemsView from '@/views/ItemsView.vue'
import ItemView from '@/views/ItemView.vue'
import ServiceView from '@/views/ServiceView.vue'
import AssetsView from '@/views/AssetsView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/items',
    name: 'items',
    component: ItemsView,
  },
  {
    path: '/items/:id',
    name: 'item',
    component: ItemView,
  },
  {
    path: '/service',
    name: 'service',
    component: ServiceView,
  },
  {
    path: '/assets',
    name: 'assets',
    component: AssetsView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
