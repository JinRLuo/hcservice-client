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
import Register from '@/components/Register'
import LoginByOtp from "../components/LoginByOtp";

Vue.use(Router)

const routes = [
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
  },
  {
    path: '/visitor',
    name: visitor,
    component: visitor
  },
  {
    path: '/register',
    name: Register,
    component: Register
  },
  {
    path: '/loginByOtp',
    name: LoginByOtp,
    component: LoginByOtp
  }
]

const router =  new Router({
  routes,
  mode:'history'
})

// //设置路由导航拦截：
// router.beforeEach((to,from,next)=>{
//   if(!localStorage.getItem('token') && !localStorage.getItem('id') && to.meta.isToken == true){
//     router.push('/login')
//     Vue.prototype.$toast.fail('请重新登录')
//     return
//   }
//   next()
// })

export default router
