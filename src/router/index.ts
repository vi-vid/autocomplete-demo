import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    meta: {
      title: 'Autocomplete Demo | Dashboard'
    },
    component: DashboardView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
