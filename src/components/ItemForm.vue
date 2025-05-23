<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useItemStore } from '@/store/modules/itemsStore'
import { useCategoryStore } from '@/store/modules/categoriesStore'
import { useGroupStore } from '@/store/modules/groupsStore'
import { useSourceStore } from '@/store/modules/sourcesStore'
import { useOperationStore } from '@/store/modules/operationsStore'
import { useDepartmentStore } from '@/store/modules/departmentsStore'
import type { ItemCreate } from '@/types/itemsTypes'

const props = defineProps<{
  item?: ItemCreate
  isEditing?: boolean
}>()

const emit = defineEmits(['submit'])

// Инициализация хранилищ
const itemStore = useItemStore()
const categoryStore = useCategoryStore()
const groupStore = useGroupStore()
const sourceStore = useSourceStore()
const operationStore = useOperationStore()
const departmentStore = useDepartmentStore()

// Загрузка справочников
onMounted(async () => {
  await Promise.all([
    categoryStore.loadCategories(),
    groupStore.loadGroups(),
    sourceStore.loadSources(),
    operationStore.loadOperations(),
    departmentStore.loadDepartments(),
  ])
})

// Форма
const form = ref({
  name: props.item?.name || '',
  description: props.item?.description || '',
  category_id: props.item?.category_id ? String(props.item.category_id) : null,
  group_id: props.item?.group_id ? String(props.item.group_id) : null,
  source_id: props.item?.source_id ? String(props.item.source_id) : null,
  operation_id: props.item?.operation_id ? String(props.item.operation_id) : null,
  department_id: props.item?.department_id ? String(props.item.department_id) : null,
})
// Автоматическое обновление формы при изменении props.item или загрузке справочников
watchEffect(() => {
  if (props.isEditing && props.item) {
    form.value = {
      name: props.item.name ?? '',
      description: props.item.description ?? '',
      category_id: props.item.category_id ?? null,
      group_id: props.item.group_id ?? null,
      source_id: props.item.source_id ?? null,
      operation_id: props.item.operation_id ?? null,
      department_id: props.item.department_id ?? null,
    }
  }
})

const submit = () => {
  emit('submit', {
    ...form.value,
    // Преобразуем пустые строки в null (если нужно)
    category_id: form.value.category_id || null,
    group_id: form.value.group_id || null,
    source_id: form.value.source_id || null,
    operation_id: form.value.operation_id || null,
    department_id: form.value.department_id || null,
  })
}
</script>

<template>
  <v-form @submit.prevent="submit">
    <v-text-field v-model="form.name" label="Name" :rules="[(v) => !!v || 'Name is required']" required />

    <v-textarea v-model="form.description" label="Description" rows="2" />

    <!-- Выпадающий список для категорий -->
    <v-select v-model="form.category_id" :items="categoryStore.categories" item-title="name" item-value="id" label="Category" :loading="categoryStore.loading" clearable />

    <!-- Выпадающий список для групп -->
    <v-select v-model="form.group_id" :items="groupStore.groups" item-title="name" item-value="id" label="Group" clearable />

    <!-- Выпадающий список для источников -->
    <v-select v-model="form.source_id" :items="sourceStore.sources" item-title="name" item-value="id" label="Source" clearable />

    <!-- Выпадающий список для операций -->
    <v-select v-model="form.operation_id" :items="operationStore.operations" item-title="name" item-value="id" label="Operation" clearable />

    <!-- Выпадающий список для департаментов -->
    <v-select v-model="form.department_id" :items="departmentStore.departments" item-title="name" item-value="id" label="Department" clearable />

    <v-btn type="submit" color="primary" class="mt-4">
      {{ isEditing ? 'Update' : 'Create' }}
    </v-btn>
  </v-form>
</template>
