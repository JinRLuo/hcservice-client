import axios from 'axios'
import store from '../store'
import { Toast } from 'vant'
import router from "../router";
import qs from 'qs'
// 根据环境不同引入不同api地址
import { BASE_API } from '../../config/index'
// create an axios instance
const service = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
      // loading
      Toast.loading({
        forbidClick: true
      })
    }
    if (store.getters.token) {
      config.headers['token'] = store.getters.token
    };
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const res = response.data
    if(res.status == 'fail' && res.data == 'ACCOUNT_NOT_LOGIN') {
      store.commit('CLEAR_TOKEN');
      store.commit('CLEAR_USER_INFO');
      return Promise.reject(res);
    } else {
      return Promise.resolve(res);
    }

  },
  error => {
    Toast.clear()
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export function get(url, params) {
  return service.get(url, {
    params
  });
}

export function post(url, data) {
  return service.post(url, qs.stringify(data), {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  });
}

export function postFile(url, fd) {
  return service.post(url, fd, {
    headers: {'Content-Type': 'multipart/form-data'}
  });
}

export default service
