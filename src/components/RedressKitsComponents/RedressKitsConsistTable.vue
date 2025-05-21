<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRedressKitStore } from '@/store/modules/redressKitStore'

const searchQuery = ref('')
const groupBy = ref([{ key: 'redress_kit' }, { key: 'revision' }])

const headers = [
  { title: 'Item', value: 'item' },
  { title: 'Description', value: 'desc_item' },
  { title: 'Quantity', value: 'quantity' },
]

const redressKitStore = useRedressKitStore()
const allRedressKits = computed(() => redressKitStore.redressKitConsist || [])
const filteredRedressKits = ref<any[]>([])

// Загрузка данных
const loadData = async () => {
  await redressKitStore.loadRedressKitConsist()
  filterRedressKits()
}

// Фильтрация данных
const filterRedressKits = () => {
  if (!searchQuery.value) {
    filteredRedressKits.value = [...allRedressKits.value]
    return
  }

  const query = searchQuery.value.toLowerCase()
  filteredRedressKits.value = allRedressKits.value.filter((kit) =>
    kit.redress_kit?.toLowerCase().includes(query),
  )
}

// Проверка, является ли строка заголовком ревизии
const isRevisionRow = (item: any) => {
  return item.hasOwnProperty('children') // Vuetify добавляет это свойство для групповых строк
}

// Получение описания redress_kit
const getRedressKitDescription = (redressKit: string) => {
  const kit = allRedressKits.value.find((item) => item.redress_kit === redressKit)
  return kit?.desc_redress_kit || ''
}

onMounted(loadData)
</script>
<template>
  <div>
    <!-- Поиск по redress_kit -->
    <v-text-field
      v-model="searchQuery"
      label="Search Redress Kits"
      prepend-inner-icon="mdi-magnify"
      clearable
      class="mb-4"
      @update:modelValue="filterRedressKits"
    ></v-text-field>

    <!-- Таблица с компактной группировкой -->
    <v-data-table
      :group-by="groupBy"
      :headers="headers"
      :items="filteredRedressKits"
      item-value="item"
      :items-per-page="-1"
      height="calc(100vh - 200px)"
      fixed-header
      class="elevation-1"
    >
      <!-- Группа redress_kit (без отдельной строки) -->
      <template v-slot:group-header="{ item, toggleGroup, isGroupOpen }">
        <tr class="group-header-row">
          <td colspan="100%">
            <div class="d-flex align-center py-2">
              <v-btn
                :icon="isGroupOpen(item) ? 'mdi-chevron-down' : 'mdi-chevron-right'"
                variant="text"
                @click="toggleGroup(item)"
              ></v-btn>
              <span class="font-weight-bold">{{ item.value }}</span>
              <span class="ml-2 text-caption text-medium-emphasis">
                {{ getRedressKitDescription(item.value) }}
              </span>
            </div>
          </td>
        </tr>
      </template>

      <!-- Строки данных с отступом для ревизий -->
      <template v-slot:item="{ item }">
        <tr :class="{ 'revision-row': isRevisionRow(item) }">
          ↳
          <td>
            <span v-if="isRevisionRow(item)" class="revision-indent"></span>
            {{ item.item }}
          </td>
          <td>{{ item.desc_item }}</td>
          <td>{{ item.quantity }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped>
/* Стиль для заголовка группы */
.group-header-row {
  background-color: #f5f5f5 !important;
}

/* Отступ для строк ревизий */
.revision-row td {
  padding-left: 40px !important;
  background-color: #fafafa;
}

.revision-indent {
  margin-right: 8px;
  color: rgba(0, 0, 0, 0.3);
}

/* Подсветка строк */
.v-data-table__tr:hover {
  background-color: rgba(0, 0, 0, 0.02) !important;
}
</style>
