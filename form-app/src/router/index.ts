import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Thanks from '../views/Thanks.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/thanks',
    name: 'thanks',
    component: Thanks,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
