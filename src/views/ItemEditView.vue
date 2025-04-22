<script setup lang="ts">
import ItemForm from '@/components/ItemForm.vue'
import { useItemStore } from '@/store/modules/itemsStore'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'

const itemStore = useItemStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  itemStore.getItem(route.params.id as string)
})

const handleSubmit = async (formData: any) => {
  try {
    await itemStore.updateItem(route.params.id as string, formData)
    router.push(`/items/${route.params.id}`)
  } catch (error) {
    console.error('Error updating item:', error)
  }
}
</script>

<template>
  <div>
    <h1 class="text-h4 mb-4">Edit Item</h1>
    <ItemForm v-if="itemStore.currentItem" :item="itemStore.currentItem" isEditing @submit="handleSubmit" />
    <div v-else-if="itemStore.loading">Loading...</div>
    <div v-else-if="itemStore.error" class="error">{{ itemStore.error }}</div>
  </div>
</template>
