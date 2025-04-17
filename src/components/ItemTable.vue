<script setup lang="ts">
import { ref, computed } from 'vue';
import { useItemStore } from '@/store/modules/items';

const itemStore = useItemStore();

// Загрузка данных
itemStore.loadItems();

// Поиск и фильтры
const search = ref('');
const filters = ref<Record<string, string>>({
  name: '',
  description: '',
  category: '',
  group: '',
  source: '',
  operation: '',
  department: '',
});

// Сортировка
const sortBy = ref([{ key: 'name', order: 'asc' }]);

// Отфильтрованные элементы
const filteredItems = computed(() =>
  itemStore.filteredItems(search.value, filters.value)
);

// Заголовки таблицы
const headers = [
  { title: 'Name', key: 'item' },
  { title: 'Description', key: 'item_description' },
  { title: 'Category', key: 'category' },
  { title: 'Group', key: 'group' },
  { title: 'Source', key: 'source' },
  { title: 'Operation', key: 'operation' },
  { title: 'Department', key: 'department' },
  { title: 'Actions', key: 'actions', sortable: false },
];
</script>

<template>
  <div>
    <!-- Общий поиск -->
    <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details class="mb-4" />

    <!-- Фильтры по столбцам -->
    <v-row class="mb-4">
      <v-col cols="12" sm="6" md="4" lg="2" v-for="header in headers" :key="header.key">
        <v-text-field v-if="header.sortable !== false" v-model="filters[header.key]" :label="`Filter ${header.title}`" variant="outlined" density="compact" hide-details />
      </v-col>
    </v-row>

    <!-- Таблица -->
    <v-data-table :headers="headers" :items="filteredItems" :sort-by="sortBy" :loading="itemStore.loading" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-btn icon="mdi-eye" variant="text" color="info" :to="`/items/${item.id}`" />
        <v-btn icon="mdi-pencil" variant="text" color="warning" :to="`/items/${item.id}/edit`" class="ml-2" />
      </template>
    </v-data-table>
  </div>
</template>
