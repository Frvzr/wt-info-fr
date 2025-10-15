<script setup lang="ts">
import MyRedress from '@/components/RedressSystemComponents/MyRedress.vue'
import StartRedress from '@/components/RedressSystemComponents/StartRedress.vue'
import AssetRedressHistory from '@/components/RedressSystemComponents/AssetRedressHistory.vue'
</script>

<template>
  <v-container class="redress-container" fluid>
    <v-row>
      <v-col cols="12" md="3" class="pr-md-2">
        <v-card elevation="1" class="h-100">
          <MyRedress />
        </v-card>
      </v-col>

      <v-col cols="12" md="6" class="px-md-2">
        <v-card elevation="1" class="start-redress-card h-100">
          <StartRedress />
        </v-card>
      </v-col>

      <v-col cols="12" md="3" class="pl-md-2">
        <v-card elevation="1" class="h-100">
          <AssetRedressHistory />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.redress-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px;
}

.start-redress-card {
  background-color: #f8f9fa;
  border-left: 4px solid #1976d2;
}

.h-100 {
  height: 100%;
}

@media (max-width: 960px) {
  .pr-md-2,
  .pl-md-2,
  .px-md-2 {
    padding: 0 !important;
  }

  .v-col {
    margin-bottom: 16px;
  }
}
</style>
