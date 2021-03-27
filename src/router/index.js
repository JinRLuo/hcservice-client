import Vue from 'vue'
import Router from 'vue-router'
import IndexWrap from '@/components/IndexWrap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexWrap',
      component: IndexWrap
    }
  ]
})
