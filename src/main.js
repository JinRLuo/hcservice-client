// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "@/assets/font/iconfont.css"
import 'amfe-flexible';
import { Col, Row } from 'vant';
import { NavBar } from 'vant';
import { Button } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Grid, GridItem } from 'vant';
import { Lazyload } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Image as VanImage } from 'vant'
import { Icon } from 'vant'
import { PullRefresh } from 'vant';
import { Dialog } from 'vant';
import { Toast } from 'vant';

Vue.use(Button).use(Col).use(Row).use(NavBar).use(Swipe).use(SwipeItem)
  .use(Tabbar).use(TabbarItem).use(Grid).use(GridItem).use(Lazyload).use(Cell)
  .use(CellGroup).use(VanImage).use(Icon).use(PullRefresh).use(Dialog).use(Toast);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
