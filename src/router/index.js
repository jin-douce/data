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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Screen/index')
  },
  {
    path: '/model',
    name: 'Model',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Models/index')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
