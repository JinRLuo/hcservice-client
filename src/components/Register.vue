<template>
  <div>
    <img class="logo" src="../image/logo.png"/>
    <van-form @submit="onSubmit">
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" :rules="[{ validator: phoneValidator, message: '手机号格式错误' }]" />
      <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入六位短信验证码" :rules="[{ validator: otpValidator, message: '验证码格式错误' }]">
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
      <van-field v-model="password" type="password" label="设置密码" />
      <van-field v-model="passwordRep" type="password" label="再次输入密码" />
      <div class="link-login">
        <router-link :to="{path:'/login'}">已有账号，去登录</router-link>
      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data () {
    return {
      phone: '',
      sms: '',
      password: '',
      passwordRep: ''
    }
  },
  methods: {
    phoneValidator(val) {
      return /^1[0-9]{10}$/.test(val);
    },
    otpValidator(val) {
      return /\d{6}/.test(val);
    },
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
.link-login {
  text-align: right;
  font-size: .1rem;
  padding: .2rem 1rem .2rem 0;
  color: blue;
}

</style>
