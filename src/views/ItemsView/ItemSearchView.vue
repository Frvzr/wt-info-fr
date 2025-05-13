<template>
  <div class="item-search-view">
    <v-container>
      <v-row>
        <v-col cols="12" md="8" offset-md="2">
          <v-text-field v-model="searchQuery" label="Введите название товара (% для поиска по шаблону)" prepend-inner-icon="mdi-magnify" clearable @keyup.enter="searchItem" @click:clear="clearSearch">
            <template v-slot:append>
              <v-btn color="primary" @click="searchItem" :loading="loading">
                Search
              </v-btn>
            </template>
          </v-text-field>
          <v-chip class="ma-2" color="info" variant="outlined">
            Примеры: "%T006%", "%T006", "T006%"
          </v-chip>
        </v-col>
      </v-row>

      <v-row v-if="searchResults.length > 0">
        <v-col cols="12">
          <v-card>
            <v-list>
              <v-list-item v-for="item in searchResults" :key="item.id" :to="getItemDetailRoute(item.id)">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
                <template v-slot:append>
                  <v-icon icon="mdi-chevron-right"></v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-if="errorMessage">
        <v-col cols="12">
          <v-alert type="error">{{ errorMessage }}</v-alert>
        </v-col>
      </v-row>

      <v-row v-if="searchPerformed && searchResults.length === 0">
        <v-col cols="12">
          <v-alert type="info">Ничего не найдено</v-alert>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useItemStore } from '@/store/modules/itemsStore'

const itemStore = useItemStore()
const searchQuery = ref('')
const loading = ref(false)
const errorMessage = ref('')
const searchPerformed = ref(false)

const createSearchPattern = (query: string) => {
  if (query.includes('%')) {
    const pattern = query
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\*|%/g, '.*')
    return new RegExp(`^${pattern}$`, 'i')
  }
  return new RegExp(`^${query}$`, 'i')
}

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []
  const pattern = createSearchPattern(searchQuery.value)
  return itemStore.items.filter(item => pattern.test(item.name))
})

const getItemDetailRoute = (id: string) => {
  return {
    name: 'item-detail',
    params: { id }
  }
}

const searchItem = async () => {
  if (!searchQuery.value.trim()) return

  try {
    loading.value = true
    errorMessage.value = ''
    searchPerformed.value = true

    if (itemStore.items.length === 0) {
      await itemStore.loadItems()
    }
  } catch (error) {
    errorMessage.value = 'Ошибка при поиске: ' + (error as Error).message
  } finally {
    loading.value = false
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  searchPerformed.value = false
}
</script>

<style scoped>
.item-search-view {
  padding: 20px;
}

.v-list-item {
  cursor: pointer;
  transition: background-color 0.3s;
}

.v-list-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.v-list-item__append {
  opacity: 0.5;
  transition: opacity 0.3s;
}

.v-list-item:hover .v-list-item__append {
  opacity: 1;
}
</style>
