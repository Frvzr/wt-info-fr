<script setup lang="ts">
import ItemForm from '@/components/ItemsComponents/ItemForm.vue'
import { useItemStore } from '@/store/modules/itemsStore'
import type { ItemCreate } from '@/types/itemsTypes'
import { useRouter } from 'vue-router'

const itemStore = useItemStore()
const router = useRouter()

const handleSubmit = async (formData: ItemCreate) => {
  try {
    await itemStore.createItem(formData)
    router.push('/items')
  } catch (error) {
    console.error('Error creating item:', error)
  }
}
</script>

<template>
  <div>
    <h1 class="text-h4 mb-4">CREATE NEW ITEM</h1>
    <ItemForm @submit="handleSubmit" />
  </div>
</template>
