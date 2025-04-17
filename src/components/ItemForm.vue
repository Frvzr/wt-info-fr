<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { ItemCreate, ItemUpdate } from '@/types/item';

const props = defineProps<{
  item?: ItemUpdate;
  isEditing?: boolean;
}>();

const emit = defineEmits(['submit']);

const form = ref<ItemCreate | ItemUpdate>({
  name: '',
  description: '',
  category_id: '',
  group_id: '',
  source_id: '',
  operation_id: '',
  department_id: '',
});

// Если редактирование, заполняем форму
onMounted(() => {
  if (props.isEditing && props.item) {
    form.value = {
      name: props.item.name || '',
      description: props.item.description || '',
      category_id: props.item.category_id || '',
      group_id: props.item.group_id || '',
      source_id: props.item.source_id || '',
      operation_id: props.item.operation_id || '',
      department_id: props.item.department_id || '',
    };
  }
});

const submit = () => {
  emit('submit', form.value);
};
</script>

<template>
  <v-form @submit.prevent="submit">
    <v-text-field v-model="form.name" label="Name" required :rules="[v => !!v || 'Name is required']" />

    <v-text-field v-model="form.description" label="Description" />

    <v-text-field v-model="form.category_id" label="Category ID" />

    <v-text-field v-model="form.group_id" label="Group ID" />

    <v-text-field v-model="form.source_id" label="Source ID" />

    <v-text-field v-model="form.operation_id" label="Operation ID" />

    <v-text-field v-model="form.department_id" label="Department ID" />

    <v-btn type="submit" color="primary" class="mt-4">
      {{ isEditing ? 'Update' : 'Create' }}
    </v-btn>
  </v-form>
</template>
