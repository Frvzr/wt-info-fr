<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useItemStore } from '@/store/modules/itemsStore'
import { useCategoryStore } from '@/store/modules/categoriesStore'
import { useGroupStore } from '@/store/modules/groupsStore'
import { useSourceStore } from '@/store/modules/sourcesStore'
import { useOperationStore } from '@/store/modules/operationsStore'
import { useDepartmentStore } from '@/store/modules/departmentsStore'
import { useRouter } from 'vue-router'
import type { ItemCreate, ItemUpdate } from '@/types/itemsTypes'

const props = defineProps<{
  item?: ItemCreate | ItemUpdate
  isEditing?: boolean
  itemId?: string
}>()

const emit = defineEmits(['submit'])

// Инициализация хранилищ
const itemStore = useItemStore()
const categoryStore = useCategoryStore()
const groupStore = useGroupStore()
const sourceStore = useSourceStore()
const operationStore = useOperationStore()
const departmentStore = useDepartmentStore()
const router = useRouter()

// Состояние формы
const form = ref({
  name: '',
  description: '',
  category_id: null as string | null,
  group_id: null as string | null,
  source_id: null as string | null,
  operation_id: null as string | null,
  department_id: null as string | null,
})

const loading = ref(true)

// Загрузка данных и инициализация формы
const initializeForm = async () => {
  try {
    loading.value = true

    // Загружаем все справочники параллельно
    await Promise.all([
      categoryStore.loadCategories(),
      groupStore.loadGroups(),
      sourceStore.loadSources(),
      operationStore.loadOperations(),
      departmentStore.loadDepartments(),
    ])

    // Заполняем форму данными, если это редактирование
    if (props.isEditing && props.item) {
      form.value = {
        name: props.item.name ?? '',
        description: props.item.description ?? '',
        category_id: props.item.category_id ? String(props.item.category_id) : null,
        group_id: props.item.group_id ? String(props.item.group_id) : null,
        source_id: props.item.source_id ? String(props.item.source_id) : null,
        operation_id: props.item.operation_id ? String(props.item.operation_id) : null,
        department_id: props.item.department_id ? String(props.item.department_id) : null,
      }
    }
  } catch (error) {
    console.error('Error initializing form:', error)
  } finally {
    loading.value = false
  }
}

// Инициализация при монтировании
onMounted(initializeForm)

// Следим за изменением props.item
watch(() => props.item, () => {
  if (props.isEditing && props.item) {
    form.value = {
      ...form.value,
      name: props.item.name ?? '',
      description: props.item.description ?? '',
      category_id: props.item.category_id ? String(props.item.category_id) : null,
      group_id: props.item.group_id ? String(props.item.group_id) : null,
      source_id: props.item.source_id ? String(props.item.source_id) : null,
      operation_id: props.item.operation_id ? String(props.item.operation_id) : null,
      department_id: props.item.department_id ? String(props.item.department_id) : null,
    }
  }
}, { deep: true })

// Обработка отправки формы
const submit = async () => {
  const formData = {
    ...form.value,
    category_id: form.value.category_id || null,
    group_id: form.value.group_id || null,
    source_id: form.value.source_id || null,
    operation_id: form.value.operation_id || null,
    department_id: form.value.department_id || null,
  };

  if (props.isEditing && props.itemId) {
    try {
      await itemStore.updateItem(props.itemId, formData as ItemUpdate);
      router.push({
        name: 'item-details',
        params: { id: props.itemId },
        query: { refreshed: 'true' }
      });
    } catch (error) {
      console.error('Error updating item:', error);
      // Дополнительная обработка ошибки при необходимости
    }
  } else {
    emit('submit', formData as ItemCreate);
  }
}
</script>

<template>
  <v-form @submit.prevent="submit">
    <v-text-field v-model="form.name" label="Name" :rules="[(v) => !!v || 'Name is required']" required :disabled="loading" />

    <v-textarea v-model="form.description" label="Description" rows="2" :disabled="loading" />

    <v-autocomplete v-model="form.category_id" :items="categoryStore.categories" item-title="name" item-value="id" label="Category" :loading="categoryStore.loading || loading" clearable :disabled="categoryStore.loading || loading" />

    <v-autocomplete v-model="form.group_id" :items="groupStore.groups" item-title="name" item-value="id" label="Group" :loading="groupStore.loading || loading" clearable :disabled="groupStore.loading || loading" />

    <v-autocomplete v-model="form.source_id" :items="sourceStore.sources" item-title="name" item-value="id" label="Source" :loading="sourceStore.loading || loading" clearable :disabled="sourceStore.loading || loading" />

    <v-autocomplete v-model="form.operation_id" :items="operationStore.operations" item-title="name" item-value="id" label="Operation" :loading="operationStore.loading || loading" clearable :disabled="operationStore.loading || loading" />

    <v-autocomplete v-model="form.department_id" :items="departmentStore.departments" item-title="name" item-value="id" label="Department" :loading="departmentStore.loading || loading" clearable :disabled="departmentStore.loading || loading" />

    <v-btn type="submit" color="primary" class="mt-4" :loading="loading" :disabled="loading">
      {{ isEditing ? 'Update' : 'Create' }}
    </v-btn>
  </v-form>
</template>
