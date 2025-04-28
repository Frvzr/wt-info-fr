<script setup lang="ts">
import ItemTable from '@/components/ItemsComponents/ItemTable.vue'
import { useItemStore } from '@/store/modules/itemsStore'

const itemStore = useItemStore()
</script>

<template>
  <div>
    <v-row class="mb-4">
      <v-col cols="12">
        <v-btn
          to="/items/create"
          class="me-2"
          prepend-icon="mdi-plus"
          rounded="lg"
          text="Create"
          border
        ></v-btn>
      </v-col>
    </v-row>

    <v-alert v-if="itemStore.error" type="error" class="mb-4">
      {{ itemStore.error }}
    </v-alert>

    <ItemTable />
  </div>
</template>
