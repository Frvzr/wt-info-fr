<template>
  <div v-if="itemStore.loading">Loading...</div>
  <div v-else-if="itemStore.error" class="error">{{ itemStore.error }}</div>
  <v-card v-else-if="itemStore.currentItem">
    <v-card-title>{{ itemStore.currentItem.name }}</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item>
          <v-list-item-title>Description</v-list-item-title>
          <v-list-item-subtitle>{{
            itemStore.currentItem.description || 'N/A'
            }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Category</v-list-item-title>
          <v-list-item-subtitle>{{ itemStore.currentItem.category || 'N/A' }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Group</v-list-item-title>
          <v-list-item-subtitle>{{ itemStore.currentItem.group || 'N/A' }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Source</v-list-item-title>
          <v-list-item-subtitle>{{ itemStore.currentItem.source || 'N/A' }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Operation</v-list-item-title>
          <v-list-item-subtitle>{{
            itemStore.currentItem.operation || 'N/A'
            }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Department</v-list-item-title>
          <v-list-item-subtitle>{{
            itemStore.currentItem.department || 'N/A'
            }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn :to="`/items/${itemStore.currentItem.id}/edit`" color="warning">Edit</v-btn>
      <v-btn to="/items" color="primary">Back to List</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useItemStore } from '@/store/modules/itemsStore'
import { useRoute } from 'vue-router'

const itemStore = useItemStore()
const route = useRoute()

onMounted(() => {
  itemStore.getItemInfoById(route.params.id as string)
})
</script>
<style></style>
