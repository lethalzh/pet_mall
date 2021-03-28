import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '@/views/Login/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register/Register.vue')
  },
  {
    path: '/product/:search',
    name: 'product',
    component: () => import('@/views/ProductList/ProductList.vue')
  },
  {
    path: '/details/:pid',
    name: 'details',
    component: () => import('@/views/Details/Details.vue')
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component: () => import('@/views/ShopCart/ShopCart.vue')
  },
  {
    path: '/oderGroup',
    name: 'odergroup',
    component: () => import('../views/oderGroup/oderGroup.vue')
  },
  {
    path: '/myInfo',
    name: 'myinfo',
    component: () => import('../views/MyInfo/MyInfo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
