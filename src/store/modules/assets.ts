import { defineStore } from 'pinia'
import type { Asset } from '@/types/types'
import { fetchAsset } from '@/api/assetsApi'

export const useAssetStore = defineStore('assets', {
  state: () => ({
    assets: [] as Asset[],
  }),
  actions: {
    async loadAsset() {
      try {
        this.assets = await fetchAsset()
      } catch (error) {
        console.error('Ошибка при загрузке ассетов:', error)
      }
    },
  },
})
