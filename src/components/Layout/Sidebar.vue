<template>
  <v-navigation-drawer app permanent>
    <v-list>
      <v-list-item prepend-icon="mdi-tools" link href="/service">
        <v-list-item-title>TPC Activity</v-list-item-title>
      </v-list-item>
      <v-list-item prepend-icon="mdi-list-box" href="/assets">
        <v-list-item-title>Assets</v-list-item-title>
      </v-list-item>
      <v-list-item prepend-icon="mdi-view-list" link href="/items">
        <v-list-item-title>Items</v-list-item-title>
      </v-list-item>
      <v-list-item prepend-icon="mdi-view-list" link href="/redress-kits">
        <v-list-item-title>Redress Kits</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts"></script>

<style scoped>
/* Кастомные стили для боковой панели */
</style>
