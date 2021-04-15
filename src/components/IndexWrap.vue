<template>
  <div class="indexWrap">
    <router-view/>
    <van-tabbar v-model="active" route class="footBar" :placeholder=true>
      <van-tabbar-item name="home" to="/home" icon="wap-home-o">社区</van-tabbar-item>
      <van-tabbar-item name="setting" to="/me" icon="friends-o">个人</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
import {post} from "../utils/request";

export default {
  name: 'IndexWrap',
  data () {
    return {
      active: 'home'
    }
  },
  created: function () {
    post('/api/hc/user/getUserInfo',null).then(res => {
      if(res.status == 'success') {
        this.$store.commit('SET_USER_INFO',res.data);
      } else {
        this.$store.commit('CLEAR_USER_INFO');
      }
    }).catch(err => {
      this.$store.commit('CLEAR_USER_INFO');
    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.indexWrap {
  background: #F8F5FC;
  min-height: 100vh;
}
.footBar {
  height: 1.5rem;
}

</style>
