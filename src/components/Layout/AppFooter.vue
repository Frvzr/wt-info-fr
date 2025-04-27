<template>
  <v-footer app inset color="surface-variant">
    <v-container>
      <v-row justify="space-between" align="center">
        <v-col cols="auto">
          <span class="text-caption text-disabled">
            &copy; {{ new Date().getFullYear() }} Welltec. All rights reserved.
          </span>
        </v-col>

        <v-col cols="auto">
          <div class="d-flex gap-2">
            <v-btn v-for="link in footerLinks" :key="link.text" variant="text" size="small" :to="link.to" class="text-caption">
              {{ link.text }}
            </v-btn>
          </div>
        </v-col>

        <v-col cols="auto">
          <span class="text-caption text-disabled">
            v{{ appVersion }}
          </span>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
const footerLinks = [
  { text: 'Privacy Policy', to: '/privacy' },
  { text: 'Terms of Service', to: '/terms' },
  { text: 'Contact Us', to: '/contact' }
]

const appVersion = __APP_VERSION__
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>
