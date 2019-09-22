import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Tabbar from '@/views/tabbar'
import Home from '@/views/home'
Vue.use(VueRouter)

const router = new VueRouter({

  routes: [
    // {
    //   path: '/',
    //   redirect: '/login'//重定向到登录页面
    // },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'tabbar',
      path: '/',
      component: Tabbar,
      children: [
        {
          name: 'home',
          path: '/',
          component: Home
        }
      ]
    }
  ]
})

export default router
