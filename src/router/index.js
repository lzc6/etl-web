import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import CHome from '@/views/CHome'
import BHome from '@/views/BHome'
import AHome from '@/views/AHome'
import ApplicationFrom from '@/views/CList/ApplicationFrom.vue'






Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/chome',
      name: 'chome',
      component: CHome,
      children:[
        {path:'/chome/vacation/applicationfrom',component: ApplicationFrom,name:'ApplicatopmFrom'}
      ]
    },
    {
      path: '/bhome',
      name: 'bhome',
      component: BHome,
    },
    {
      path: '/ahome',
      name: 'ahome',
      component: AHome,
    }
  ]
})
