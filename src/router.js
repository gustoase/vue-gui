import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import(/* webpackChunkName: "page" */ '@/page/Welcome')
    },
    {
      path: '/editor/page/:id',
      name: 'editor',
      component: () => import(/* webpackChunkName: "editor" */ '@/components/Container')
    },
    {
      path: '/editor/page/:id',
      name: 'preview',
      component: () => import(/* webpackChunkName: "editor" */ '@/components/Container')
    },
  ]
})
