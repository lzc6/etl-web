import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Baoan from '@/views/lipei/Baoan.vue'
import Jiean from '@/views/lipei/Jiean.vue'
import Songxiu from '@/views/lipei/Songxiu.vue'
import Hesun from '@/views/lipei/Hesun.vue'
import Cheshang from '@/views/xiaoguan/Cheshang.vue'
import Chexianqibao from '@/views/xiaoguan/Chexianqibao.vue'
import Chexianqiandan from '@/views/xiaoguan/Chexianqiandan.vue'
import Chexianjiaochaxiaoshou from '@/views/xiaoguan/Chexianjiaochaxiaoshou.vue'
import Feicheqibao from '@/views/xiaoguan/Feicheqibao.vue'
import Feicheqiandan from '@/views/xiaoguan/Feicheqiandan.vue'
import Feichejiaochaxiaoshou from '@/views/xiaoguan/Feichejiaochaxiaoshou.vue'
import Danzheng from '@/views/bangongshi/Danzheng.vue'
import Fanxiqian from '@/views/bangongshi/Fanxiqian.vue'

import Cheshang1 from '@/views/chexian/Cheshangzhuanyuan1.vue'
import Cheshang2 from '@/views/chexian/Cheshangzhuanyuan2.vue'

import Feiche from '@/views/feichexian/Feiche.vue'






Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path:'/lipei',
      component: Home,
      // name:'lipei',
      children: [
        { path: '/lipei/baoan', component: Baoan, name: 'baoan' },
        { path: '/lipei/jiean', component: Jiean, name: 'jiean' },
        { path: '/lipei/songxiu', component: Songxiu, name: 'songxiu' },
        { path: '/lipei/hesun', component: Hesun, name: 'hesun' },
         ]
    },
    {
      path:'/xiaoguan',
      component: Home,
      // name:'lipei',
      children: [
        { path: '/xiaoguan/cheshang', component: Cheshang, name: 'cheshang' },
        { path: '/xiaoguan/chexianqibao', component: Chexianqibao, name: 'chexianqibao' },
        { path: '/xiaoguan/chexianqiandan', component: Chexianqiandan, name: 'chexianqiandan' },
        { path: '/xiaoguan/chexianjiaochaxiaoshou', component: Chexianjiaochaxiaoshou, name: 'chexianjiaochaxiaoshou' },
        { path: '/xiaoguan/feicheqibao', component: Feicheqibao, name: 'feicheqibao' },
        { path: '/xiaoguan/feicheqiandan', component: Feicheqiandan, name: 'feicheqiandan' },
        { path: '/xiaoguan/feichejiaochaxiaoshou', component: Feichejiaochaxiaoshou, name: 'feichejiaochaxiaoshou' },
         ]
    },
    {
      path:'/bangongshi',
      component: Home,
      // name:'lipei',
      children: [
        { path: '/bangongshi/danzheng', component: Danzheng, name: 'danzheng' },
        { path: '/bangongshi/fanxiqian', component: Fanxiqian, name: 'fanxiqian' },
        
         ]
    },
    {
      path:'/chexian',
      component: Home,
      // name:'lipei',
      children: [
        { path: '/chexian/cheshang1', component: Cheshang1, name: 'cheshang1' },
        { path: '/chexian/cheshang2', component: Cheshang2, name: 'cheshang2' },
         ]
    },
    {
      path:'/feichexian',
      component: Home,
      // name:'lipei',
      children: [
        { path: '/feichexian/feiche', component: Feiche, name: 'feiche' },
         ]
    },

  ]
})
