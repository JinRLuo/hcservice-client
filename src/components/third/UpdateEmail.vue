<template>
  <div class="setEmail">
    <van-nav-bar title="设置邮箱" left-text="返回" right-text="完成" left-arrow @click-left="backPage" @click-right="onUpdate" :fixed=true :placeholder=true />
    <van-form @submit="">
      <van-cell-group title="此邮箱信息只做通知作用，不提供验证功能">
        <van-field v-model="email" label="邮箱" autofocus=true :rules="[{ validator: emailValidator, message: '邮箱格式错误' }]"/>
      </van-cell-group>
    </van-form>
  </div>
</template>

<script>
import {post} from "../../utils/request";

export default {
  name: "UpdateEmail",
  data () {
    return {
      email: this.$store.getters.userInfo.email
    }
  },
  methods: {
    backPage: function () {
      this.$router.back();
    },
    onUpdate: function () {
      if(this.emailValidator(this.email)) {
        post('/api/hc/user/updateEmail',{email: this.email}).then(res => {
          if(res.status == 'success') {
            this.$store.commit('SET_USER_INFO', res.data);
            this.$notify({type: 'success', message: '修改成功！'});
            this.$router.back();
          } else {
            this.$notify({type: 'warning', message: '发生错误！'});
            this.$router.back();
          }
        }).catch(err => {
          this.$notify({type: 'warning', message: '发生错误！'});
          this.$router.back();
        });
      }
    },
    emailValidator (val) {
      return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(val);
    },
  }
}
</script>

<style scoped>
.setEmail {
  background: #F8F5FC;
  min-height: 100vh;
}
</style>
