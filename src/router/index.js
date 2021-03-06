import Vue from 'vue'
import Router from 'vue-router'
import IndexWrap from '@/components/IndexWrap'
import home from '@/components/Home'
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
  // ???????????? ?????????token ????????? ???token?????????
  if (to.path == '/register' || to.path ==  '/login' || to.path == '/loginByOtp' || to.path == '/home' || to.path == '/me') {
    next(); // ????????????
  } else {
    let token = store.getters.token;
    if (token) {
      next() // ??????
    } else {
      Notify({type: 'warning', message: '???????????????'});
      next('/loginByOtp'); // ??????????????????
    }
  }
})

export default router
