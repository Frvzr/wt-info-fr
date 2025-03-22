<template>
  <div class="filter-container">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn small v-on="on">Filter</v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-select
            v-model="selectedOperator"
            :items="operatorOptions"
            label="Operator"
            item-title="title"
            item-value="value"
          ></v-select>
          <v-text-field v-model="filterValue" :label="inputLabel" :type="inputType"></v-text-field>
          <v-btn @click="addCondition">Add Condition</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { OperatorType, FilterCondition } from '@/types/types'

interface Props {
  type?: 'text' | 'number' | 'date'
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update-filter', value: FilterCondition[]): void
}>()

const operatorOptions = computed(() => {
  const base = [
    { value: 'contains', text: 'Contains' },
    { value: 'equals', text: 'Equals' },
  ]

  if (props.type === 'number') {
    return [...base, { value: 'gt', text: 'Greater than' }, { value: 'lt', text: 'Less than' }]
  }
  return base
})

const selectedOperator = ref<OperatorType>('contains')
const filterValue = ref<string>('')
const activeConditions = ref<FilterCondition[]>([])

const inputType = computed(() => (props.type === 'number' ? 'number' : 'text'))
const inputLabel = computed(() => (props.type === 'number' ? 'Value (number)' : 'Value'))

function addCondition() {
  if (!filterValue.value) return

  activeConditions.value.push({
    operator: selectedOperator.value,
    value: filterValue.value,
  })

  emit('update-filter', activeConditions.value)
}
</script>
