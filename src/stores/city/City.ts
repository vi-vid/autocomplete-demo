import { defineStore } from 'pinia';
import { mande } from 'mande';
import delay from '@/utils/delay';

export interface CityModel {
  name: string;
}

export interface CityStoreModel {
  isLoading: boolean;
  error: boolean;
  items?: CityModel[];
}

const api = mande('/api/cities.json');

const useCityStore = defineStore('city', {
  state: (): CityStoreModel => ({
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

export default useCityStore;
