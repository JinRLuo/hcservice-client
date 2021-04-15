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
import UpdateUserName from "../components/third/UpdateUserName";
import store from "../store";
import UpdateEmail from "../components/third/UpdateEmail";
import Notice from "../components/second/Notice";
import {Notify} from "vant";
import Repair from "../components/second/Repair";
import Complaint from "../components/second/Complaint";
import BindHome from "../components/third/BindHome";
import CarInfo from "../components/second/CarInfo";
import ServiceCost from "../components/second/ServiceCost";
import AddCarInfo from "../components/third/AddCarInfo";
import OrderInfo from "../components/third/OrderInfo";

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
  },
  {
    path: '/updateUserName',
    name: UpdateUserName,
    component: UpdateUserName
  },
  {
    path: '/updateEmail',
    name: UpdateEmail,
    component: UpdateEmail
  },
  {
    path: '/notice',
    name: Notice,
    component: Notice
  },
  {
    path: '/repair',
    name: Repair,
    component: Repair
  },
  {
    path: '/complaint',
    name: Complaint,
    component: Complaint
  },
  {
    path: '/bindHome',
    name: BindHome,
    component: BindHome
  },
  {
    path: '/carInfo',
    name: CarInfo,
    component: CarInfo
  },
  {
    path: '/serviceCost',
    name: ServiceCost,
    component: ServiceCost
  },
  {
    path: '/addCarInfo',
    name: AddCarInfo,
    component: AddCarInfo
  },
  {
    path: '/orderInfo/:orderId',
    name: OrderInfo,
    component: OrderInfo
  }
]

const router =  new Router({
  routes,
  mode:'history'
})

router.beforeEach(function (to, from, next) {
  // 权限拦截 认为有token 让过去 没token不让过
  if (to.path.startsWith('/account')) {
    let token = store.getters.token;
    if (token) {
      next() // 放过
    } else {
      Notify({type: 'warning', message: '请先登录！'});
      next('/loginByOtp') // 跳转到登录页
    }
  } else {
    next() // 直接放过
  }
})

export default router
