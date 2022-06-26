import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/screen'
  },
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('../views/Screen/index')
  },
  {
    path: '/model',
    name: 'Model',
    component: () => import('../views/Models/index')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
