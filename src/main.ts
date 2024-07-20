import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import '@/assets/scss/index.scss';

router.beforeEach((to) => {
  const { title } = to.meta;
  const defaultTitle = 'Autocomplete Demo';

  document.title = (title || defaultTitle) as string;
});

createApp(App).use(router).use(createPinia()).mount('#app');
