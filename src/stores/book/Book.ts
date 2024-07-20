import { defineStore } from 'pinia';
import { mande } from 'mande';
import delay from '@/utils/delay';

export interface BookModel {
  title: string;
  author: string;
}

export interface BookStoreModel {
  isLoading: boolean;
  error: boolean;
  items?: BookModel[];
}

const api = mande('/api/books.json');

const useBookStore = defineStore('book', {
  state: (): BookStoreModel => ({
    isLoading: false,
    error: false,
    items: undefined,
  }),
  actions: {
    async fetch() {
      try {
        this.isLoading = true;

        /**
         * @description mocking a slower API response
         */
        await delay(1000);

        this.items = await api.get();
        this.error = false;
        return this.items;
      } catch (error) {
        this.error = true;
        return error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});

export default useBookStore;
