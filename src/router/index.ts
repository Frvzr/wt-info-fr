import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import ItemsView from '@/views/ItemsView.vue'
import ItemView from '@/views/ItemView.vue'
import ServiceView from '@/views/ServiceView.vue'
import AssetsView from '@/views/AssetsView.vue'
import ItemDetailView from '@/views/ItemDetailView.vue'
import ItemCreateView from '@/views/ItemCreateView.vue'
import ItemEditView from '@/views/ItemEditView.vue'
import RedressKitConsistView from '@/views/RedressKitsConsistView.vue'


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/items',
    name: 'items',
    component: ItemView,
  },
  {
    path: '/items/create',
    name: 'create-item',
    component: ItemCreateView,
  },
  {
    path: '/items/:id',
    name: 'item-detail',
    component: ItemDetailView,
    props: true,
  },
  {
    path: '/items/:id/edit',
    name: 'edit-item',
    component: ItemEditView,
    props: true,
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
  {
    path: '/redress-kits',
    name: 'redress-kits',
    component: RedressKitConsistView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
