<script setup lang="ts">
import ItemForm from '@/components/ItemForm.vue'
import { useItemStore } from '@/store/modules/items'
import { useRouter } from 'vue-router'

const itemStore = useItemStore()
const router = useRouter()

const handleSubmit = async (item: ItemCreate) => {
  try {
    await itemStore.addItem(item)
    router.push('/items')
  } catch (error) {
    console.error('Error creating item:', error)
  }
}
</script>

<template>
  <div>
    <h1 class="text-h4 mb-4">Create New Item</h1>
    <ItemForm @submit="handleSubmit" />
  </div>
</template>
