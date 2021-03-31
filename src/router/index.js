import Vue from 'vue'
import Router from 'vue-router'
import IndexWrap from '@/components/IndexWrap'
import home from '@/components/Home'
import payment from '@/components/Payment'
import me from '@/components/Me'
import account from '@/components/second/Account'
import houseInfo from '@/components/second/houseInfo'
import login from '@/components/Login'
import visitor from '@/components/second/Visitor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/',
      name: 'IndexWrap',
      component: IndexWrap,
      children: [
        {
          path: '/home',
          name: home,
          component: home
        },
        {
          path: '/payment',
          name: payment,
          component: payment
        },
        {
          path: '/me',
          name: me,
          component: me
        }
      ]
    },
    {
      path: '/account',
      name: account,
      component: account
    },
    {
      path: '/houseInfo',
      name: houseInfo,
      component: houseInfo
    },
    {
      path: '/login',
      name: login,
      component: login
    },{
      path: '/visitor',
      name: visitor,
      component: visitor
    }
  ]
})
