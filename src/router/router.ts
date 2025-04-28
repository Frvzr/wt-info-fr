import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import ItemView from '@/views/ItemsView/ItemView.vue'
import AssetsView from '@/views/AssetsView.vue'
import ItemDetailView from '@/views/ItemsView/ItemDetailView.vue'
import ItemCreateView from '@/views/ItemsView/ItemCreateView.vue'
import ItemEditView from '@/views/ItemsView/ItemEditView.vue'
import RedressKitConsistView from '@/views/RedressKitsConsistView.vue'
import RedressKitConsistView2 from '@/views/RedressKitsConsistView2.vue'
import ItemsLayout from '@/components/Layout/ItemsLayout.vue'
import ItemSearchView from '@/views/ItemsView/ItemSearchView.vue'
import AssetsLayout from '@/components/Layout/AssetsLayout.vue'
import RedressKitsLayout from '@/components/Layout/RedressKitsLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { public: true },
  },
  {
    path: '/items',
    name: 'items',
    redirect: '/items/list',
    component: ItemsLayout,
    children: [
      {
        path: 'list',
        name: 'item-list',
        component: ItemView,
        meta: {
          title: 'Item List',
          requiresAuth: true,
          permissions: ['view_items'],
        },
      },
      {
        path: '/item-search',
        name: 'item-search',
        component: ItemSearchView,
        meta: {
          title: 'Search item',
          requiresAuth: true,
          permissions: ['view_items'],
        },
      },
      {
        path: 'create',
        name: 'create-item',
        component: ItemCreateView,
        meta: {
          title: 'Create Item',
          requiresAuth: true,
          permissions: ['view_items'],
        },
      },
      {
        path: ':id',
        name: 'item-detail',
        component: ItemDetailView,
        props: true,
        meta: { title: 'Item Details' },
      },
      {
        path: ':id/edit',
        name: 'edit-item',
        component: ItemEditView,
        props: true,
        meta: { title: 'Edit Item' },
      },
    ],
  },
  {
    path: '/assets',
    name: 'assets',
    component: AssetsLayout,
    meta: { title: 'Assets Management' },
    children: [
      {
        path: 'list',
        name: 'assets-list',
        component: AssetsView,
        meta: { title: 'Assets List' },
      },
      // {
      //   path: '/assets-search',
      //   name: 'assets-search',
      //   component: ItemSearchView,
      //   meta: {
      //     title: 'Search item',
      //     requiresAuth: true,
      //     permissions: ['view_items']
      //   }
      // },
      // {
      //   path: 'create',
      //   name: 'create-item',
      //   component: ItemCreateView,
      //   meta: { title: 'Create Item' }
      // },
      // {
      //   path: ':id',
      //   name: 'item-detail',
      //   component: ItemDetailView,
      //   props: true,
      //   meta: { title: 'Item Details' }
      // },
      // {
      //   path: ':id/edit',
      //   name: 'edit-item',
      //   component: ItemEditView,
      //   props: true,
      //   meta: { title: 'Edit Item' }
      // }
    ],
  },
  {
    path: '/redress-kits',
    name: 'redress-kits',
    component: RedressKitsLayout,
    meta: { title: 'Redress Kits' },
    children: [
      {
        path: 'list-view1',
        name: 'list-view1',
        component: RedressKitConsistView,
        meta: { title: 'Redress Kits List' },
      },
      {
        path: 'list-view2',
        name: 'list-view2',
        component: RedressKitConsistView2,
        meta: { title: 'Redress Kits List' },
      },
    ],
  },
  {
    path: '/redress',
    name: 'redress',
    component: RedressKitsLayout,
    meta: { title: 'Redress System' },
    children: [
      {
        path: 'list',
        name: 'redres-system-list',
        component: RedressKitConsistView,
        meta: { title: 'Redress System List' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
