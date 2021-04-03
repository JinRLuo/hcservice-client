<template>
  <div>
    <img class="logo" src="../image/logo.png"/>
    <van-form @submit="onSubmit">
      <van-field v-model="username" :name="username" label="手机号" placeholder="手机号" :rules="[{ required: true, message: '请填写用户名' }]"/>
      <van-field v-model="password" type="password" :name="password" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]"/>
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
export default {
  name: "Login",
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit: function () {
      this.$router.replace('/home');
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
  font-size: .1rem;
  padding: .2rem 0 .2rem 1rem;
  color: blue;
}
.link-register {
  text-align: right;
  font-size: .1rem;
  padding: .2rem 1rem .2rem 0;
  color: blue;
}
</style>
