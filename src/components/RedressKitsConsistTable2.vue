<template>
  <div class="redress-kit-page">
    <!-- Шапка с выбором параметров -->
    <v-card class="mb-6">
      <v-card-title>Select Redress Kit</v-card-title>
      <v-card-text>
        <div class="d-flex flex-wrap align-center gap-4">
          <!-- Выбор Redress Kit -->
          <v-autocomplete v-model="selectedKit" :items="availableKits" label="Redress Kit" item-title="redress_kit" item-value="redress_kit" :items-per-page="-1" clearable style="min-width: 300px" @update:modelValue="loadRevisions">
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props" :subtitle="item.raw.desc_redress_kit"></v-list-item>
            </template>
          </v-autocomplete>

          <!-- Выбор Revision -->
          <v-autocomplete v-model="selectedRevision" :items="availableRevisions" label="Revision" :disabled="!selectedKit" clearable style="min-width: 200px" @update:modelValue="loadKitContents"></v-autocomplete>
        </div>
      </v-card-text>
    </v-card>

    <!-- Таблица с элементами -->
    <v-card v-if="kitContents.length > 0">
      <v-card-title>Kit Contents</v-card-title>
      <v-data-table-virtual :headers="headers" :items="kitContents" :items-per-page="10" class="elevation-1">
        <template v-slot:item.quantity="{ item }">
          <span class="font-weight-bold">{{ item.quantity }}</span>
        </template>
      </v-data-table-virtual>
    </v-card>

    <!-- Состояние загрузки -->
    <v-overlay :model-value="loading" class="align-center justify-center" persistent>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRedressKitStore } from '@/store/modules/redressKitStore'

const redressKitStore = useRedressKitStore()
const loading = ref(false)
const selectedKit = ref('')
const selectedRevision = ref('')
const kitContents = ref<any[]>([])

// Заголовки таблицы
const headers = [
  { title: 'Item', value: 'item', width: '200px' },
  { title: 'Description', value: 'desc_item' },
  { title: 'Quantity', value: 'quantity', align: 'end', width: '120px' },
]

// Доступные комплекты (уникальные значения)
const availableKits = computed(() => {
  const kits = new Map()
  redressKitStore.redressKitConsist.forEach(item => {
    if (!kits.has(item.redress_kit)) {
      kits.set(item.redress_kit, {
        redress_kit: item.redress_kit,
        desc_redress_kit: item.desc_redress_kit
      })
    }
  })
  return Array.from(kits.values())
})

// Доступные ревизии для выбранного комплекта
const availableRevisions = computed(() => {
  if (!selectedKit.value) return []
  const revisions = new Set()

  redressKitStore.redressKitConsist.forEach(item => {
    if (item.redress_kit === selectedKit.value) {
      revisions.add(item.revision)
    }
  })

  // Сортировка по убыванию (от новых к старым)
  return Array.from(revisions).sort((a, b) => {
    // Для числовых ревизий
    if (!isNaN(a) && !isNaN(b)) {
      return Number(b) - Number(a)
    }
    // Для строковых ревизий (например, "Rev1", "Rev2")
    return b.localeCompare(a)
  })
})

// Загрузка ревизий при выборе комплекта
const loadRevisions = async () => {
  selectedRevision.value = ''
  kitContents.value = []
}

// Загрузка содержимого комплекта
const loadKitContents = async () => {
  if (!selectedKit.value || !selectedRevision.value) {
    kitContents.value = []
    return
  }

  loading.value = true
  try {
    // Фильтруем данные по выбранным параметрам
    kitContents.value = redressKitStore.redressKitConsist.filter(
      item => item.redress_kit === selectedKit.value &&
        item.revision === selectedRevision.value
    )
  } finally {
    loading.value = false
  }
}

// Загрузка данных при монтировании
onMounted(async () => {
  loading.value = true
  try {
    await redressKitStore.loadRedressKitConsist()
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.redress-kit-page {
  padding: 20px;
}

.gap-4 {
  gap: 16px;
}
</style>
