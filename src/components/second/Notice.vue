<template>
  <div class="notify">
    <van-nav-bar title="小区公告" left-text="返回" left-arrow @click-left="backPage" :fixed=true :placeholder=true />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
      <div style="min-height: 80vh;">
        <div class="noticeTab" v-for="notice in notices">
          <div>{{notice.title}}</div>
          <hr>
          <div>{{notice.content}}</div>
          <div>{{notice.adminName}}  {{notice.createDate}}</div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import {post} from "../../utils/request";

export default {
  name: "Notice",
  data () {
    return {
      isLoading: false,
      notices: [],
    }
  },
  methods: {
    backPage: function () {
      this.$router.back();
    },
    onRefresh() {
      post('/api/hc/user/getNotice').then(res => {
        if(res.status == 'success'){
          this.notices = res.data;
          setTimeout(() => {
            this.$toast('刷新成功');
            this.isLoading = false;
          }, 1);
        } else {
          setTimeout(() => {
            this.$toast('刷新失败');
            this.isLoading = false;
          }, 1);
        }
      }).catch(err =>
      {
        setTimeout(() => {
          this.$toast('刷新失败');
          this.isLoading = false;
        }, 1);
      });

    },
  },
  created: function () {
    post('/api/hc/user/getNotice').then(res => {
      if(res.status == 'success'){
        this.notices = res.data;
      }
    });
  }
}
</script>

<style scoped>
.notify {
  background: #F8F5FC;
  min-height: 100vh;
}
.noticeTab {
  font-size: 0.35rem;
  padding: .2rem;
  margin: .3rem 0 0 0;
  height: 6em;
  width: 100%;
  background: #ffffff;
}
</style>
