import type { RouteLocationRaw } from 'vue-router'

interface MenuItem {
  title: string
  icon: string
  route: RouteLocationRaw
  children?: MenuItem[]
  permission?: string
}

export const menuItems: MenuItem[] = [
  {
    title: 'TPC Activity',
    icon: 'mdi-tools',
    route: { name: 'service' }
  },
  {
    title: 'Assets Management',
    icon: 'mdi-package-variant',
    route: { name: 'assets' },
    children: [
    {
      title: 'Assets List',
      icon: 'mdi-view-list',
      route: { name: 'assets-list' },
      permission: 'view_assets'
    },
    // {
    //   title: 'Create Asset',
    //   icon: 'mdi-plus-box',
    //   route: { name: 'create-asset' },
    //   permission: 'edit_assets'
    // }
  ]
  },
  {
    title: 'Items Management',
    icon: 'mdi-format-list-bulleted',
    route: { name: 'item-list' },
    permission: 'view_items',
    children: [
      {
        title: 'Item List',
        icon: 'mdi-view-list',
        route: { name: 'item-list' },
        permission: 'view_items'
      },
      {
        title: 'Search Item',
        icon: 'mdi-magnify',
        route: { name: 'item-search' },
        permission: 'view_items'
      },
      {
        title: 'Create Item',
        icon: 'mdi-plus-box',
        route: { name: 'create-item' },
        permission: 'edit_items'
      }
    ]
  },
  {
  title: 'Redress Kits',
  icon: 'mdi-package-variant',
  route: { name: 'redress-kits' },
  permission: 'view_redress_kits' ,
  children: [

  ]
  }
]
