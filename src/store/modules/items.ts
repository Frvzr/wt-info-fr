// import { defineStore } from 'pinia'
// import type { Item } from '@/types/types'
// import { fetchItems, fetchItemWithCategory } from '@/api/items'

// export const useItemsStore = defineStore('items', {
//   state: () => ({
//     items: [] as Item[],
//   }),
//   actions: {
//     async loadItems() {
//       try {
//         this.items = await fetchItems()
//       } catch (error) {
//         console.error('Ошибка при загрузке предметов:', error)
//       }
//     },
//     async loadItemsWithCategory() {
//       try {
//         this.items = await fetchItemWithCategory()
//       } catch (error) {
//         console.error('Ошибка при загрузке предметов:', error)
//       }
//     },
//   },
// })

import { defineStore } from 'pinia';
import {
  fetchItems,
  fetchItemsWithCategories,
  fetchItem,
  createItem,
  updateItem,
  patchItem,
} from '@/api/items';
import type {
  Item,
  ItemWithCategory,
  ItemCreate,
  ItemUpdate,
} from '@/types/items';

export const useItemStore = defineStore('items', {
  state: () => ({
    items: [] as ItemWithCategory[],
    currentItem: null as Item | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async loadItems() {
      this.loading = true;
      this.error = null;
      try {
        // Попробуем получить из локального хранилища
        const cached = localStorage.getItem('items');
        if (cached) {
          this.items = JSON.parse(cached);
        } else {
          this.items = await fetchItemsWithCategories();
          localStorage.setItem('items', JSON.stringify(this.items));
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to load items';
      } finally {
        this.loading = false;
      }
    },

    async getItem(id: string) {
      this.loading = true;
      this.error = null;
      try {
        // Проверяем кеш
        const cachedItem = this.items.find(item => item.id === id);
        if (cachedItem) {
          this.currentItem = cachedItem;
        } else {
          this.currentItem = await fetchItem(id);
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to load item';
      } finally {
        this.loading = false;
      }
    },

    async addItem(item: ItemCreate) {
      this.loading = true;
      this.error = null;
      try {
        const newItem = await createItem(item);
        this.items.push(newItem);
        localStorage.setItem('items', JSON.stringify(this.items));
        return newItem;
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to create item';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async editItem(id: string, item: ItemUpdate) {
      this.loading = true;
      this.error = null;
      try {
        const updatedItem = await updateItem(id, item);
        const index = this.items.findIndex(i => i.id === id);
        if (index !== -1) {
          this.items[index] = { ...this.items[index], ...updatedItem };
        }
        localStorage.setItem('items', JSON.stringify(this.items));
        return updatedItem;
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to update item';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async partialEditItem(id: string, item: Partial<ItemUpdate>) {
      this.loading = true;
      this.error = null;
      try {
        const updatedItem = await patchItem(id, item);
        const index = this.items.findIndex(i => i.id === id);
        if (index !== -1) {
          this.items[index] = { ...this.items[index], ...updatedItem };
        }
        localStorage.setItem('items', JSON.stringify(this.items));
        return updatedItem;
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to patch item';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    clearCurrentItem() {
      this.currentItem = null;
    },

    clearError() {
      this.error = null;
    },
  },

  getters: {
    filteredItems: (state) => (search: string, filters: Record<string, string>) => {
      let result = [...state.items];

      // Общий поиск
      if (search) {
        const searchLower = search.toLowerCase();
        result = result.filter(item =>
          item.name.toLowerCase().includes(searchLower) ||
          (item.description && item.description.toLowerCase().includes(searchLower)) ||
          (item.category && item.category.toLowerCase().includes(searchLower)) ||
          (item.group && item.group.toLowerCase().includes(searchLower)) ||
          (item.source && item.source.toLowerCase().includes(searchLower)) ||
          (item.operation && item.operation.toLowerCase().includes(searchLower)) ||
          (item.department && item.department.toLowerCase().includes(searchLower))
        );
      }

      // Фильтрация по столбцам
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          const valueLower = value.toLowerCase();
          result = result.filter(item => {
            const itemValue = item[key as keyof ItemWithCategory];
            return itemValue && String(itemValue).toLowerCase().includes(valueLower);
          });
        }
      }

      return result;
    },
  },
});
