// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "@/assets/font/iconfont.css"
import 'amfe-flexible';
import './utils/request'
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
import { Form } from 'vant';
import { Field } from 'vant';
import { Tab, Tabs } from 'vant';
import { Calendar } from 'vant';
import { Picker } from 'vant';
import { DatetimePicker } from 'vant';
import { Popup } from 'vant';
import { Notify } from 'vant';
import { Uploader } from 'vant';
import { Divider } from 'vant';
import { Popover } from 'vant';
import axios from 'axios'
import store from './store'

Vue.use(Button).use(Col).use(Row).use(NavBar).use(Swipe).use(SwipeItem)
  .use(Tabbar).use(TabbarItem).use(Grid).use(GridItem).use(Lazyload).use(Cell)
  .use(CellGroup).use(VanImage).use(Icon).use(PullRefresh).use(Dialog).use(Toast)
  .use(Form).use(Field).use(Tab).use(Tabs).use(Calendar).use(Picker).use(DatetimePicker).use(Popup).use(axios)
  .use(Notify).use(Uploader).use(Divider).use(Popover);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})
