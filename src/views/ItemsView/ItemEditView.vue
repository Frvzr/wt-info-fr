<script setup lang="ts">
import ItemForm from '@/components/ItemsComponents/ItemForm.vue'
import { useItemStore } from '@/store/modules/itemsStore'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import type { ItemUpdate } from '@/types/itemsTypes'

const itemStore = useItemStore()
const route = useRoute()
const router = useRouter()
const isReady = ref(false)

onMounted(async () => {
  try {
    await Promise.all([itemStore.getItem(route.params.id as string)])
    isReady.value = true
  } catch (error) {
    console.error('Error loading data:', error)
  }
})

const handleSubmit = async (formData: ItemUpdate) => {
  try {
    await itemStore.updateItem(route.params.id as string, formData)
    router.push({
      path: `/items/${route.params.id}`,
      query: { refreshed: 'true' },
    })
  } catch (error) {
    console.error('Error updating item:', error)
  }
}
</script>

<template>
  <div>
    <h1 class="text-h4 mb-4">EDIT ITEM</h1>
    <template v-if="isReady">
      <ItemForm
        v-if="itemStore.editedItem"
        :item="itemStore.editedItem"
        isEditing
        @submit="handleSubmit"
      />
      <div v-else class="error">Item not found</div>
    </template>
    <div v-else>Loading...</div>
  </div>
</template>
