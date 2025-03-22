<template>
  <v-navigation-drawer app permanent>
    <v-list>
      <!-- Список предметов -->
      <v-list-item prepend-icon="mdi-tools" link href="/service">
        <v-list-item-icon>
          <v-list-item-title>TPC Activity</v-list-item-title>
        </v-list-item-icon>
      </v-list-item>
      <!-- Список предметов -->
      <v-list-item prepend-icon="mdi-list-box" href="/assets">
        <v-list-item-icon>
          <v-list-item-title>Assets</v-list-item-title>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item prepend-icon="mdi-view-list" link href="/items">
        <v-list-item-icon>
          <v-list-item-title>Items</v-list-item-title>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts"></script>

<style scoped>
/* Кастомные стили для боковой панели */
</style>
