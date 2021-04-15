<template>
  <div>
    <img class="logo" src="../image/logo.png"/>
    <van-form @submit="onSubmit">
      <van-field  v-model="phoneNum" label="手机号" placeholder="请输入手机号" :rules="[{ validator: phoneValidator, message: '手机号格式错误' }]" />
      <van-field v-model="password" type="password" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]"/>
      <van-row>
        <van-col span="8" class="link-otpLogin">
          <router-link :to="{path:'/loginByOtp'}">验证码登录</router-link>
        </van-col>
        <van-col span="16" class="link-register">
          <router-link :to="{path:'/register'}">还没有账号？去注册</router-link>
        </van-col>
      </van-row>
      <div >

      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {post} from "../utils/request";

export default {
  name: "Login",
  data () {
    return {
      phoneNum: '',
      password: ''
    }
  },
  methods: {
    phoneValidator(val) {
      return /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(val);
    },
    onSubmit: function () {
      post("/api/hc/user/loginByPwd", {phoneNum: this.phoneNum, password: this.password}).then(res => {
        if (res.status == 'fail') {
          this.$notify({type: 'warning', message: res.data.errMsg });
        } else {
          this.$store.commit('SET_TOKEN', res.data);
          this.$notify({type: 'success', message: '登录成功！'});
          this.$router.replace('/home');
        }
      }).catch(err => {
        this.$notify({type: 'warning', message: '网络错误！'});
      });
    }
  }
}
</script>

<style scoped>
.logo {
  width: 100%;
  padding: 2rem 0 .5rem 0;
}
.link-otpLogin {
  text-align: left;
  font-size: .3rem;
  padding: .2rem 0 .2rem 1rem;
  color: blue;
}
.link-register {
  text-align: right;
  font-size: .3rem;
  padding: .2rem 1rem .2rem 0;
  color: blue;
}
</style>
