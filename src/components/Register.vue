<template>
  <div>
    <img class="logo" src="https://hcservice-image-1256980503.cos.ap-guangzhou.myqcloud.com/logo/logo.png"/>
    <van-form @submit="onSubmit">
      <van-field v-model="phoneNum" label="手机号" placeholder="请输入手机号" :rules="[{ validator: phoneValidator, message: '手机号格式错误' }]" :error-message="errorMessage.phoneNumError"/>
      <van-field v-model="otpCode" center clearable label="短信验证码" placeholder="请输入六位短信验证码" :rules="[{ validator: otpValidator, message: '验证码格式错误' }]">
        <template #button>
          <van-button native-type="button" size="small" @click="sendOtp" type="primary">发送验证码</van-button>
        </template>
      </van-field>
      <van-field :error-message="errorMessage.password" v-model="password" type="password" label="设置密码" :rules="[{ validator: pwdValidator, message: '密码强度太低' }]"/>
      <van-field :error-message="errorMessage.passwordRep" v-model="passwordRep" type="password" label="再次输入密码" :rules="[{ validator: pwdRepValidator, message: '两次输入的密码不一样' }]" />
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
import {post} from "../utils/request";

export default {
  name: "Register",
  data () {
    return {
      phoneNum: '',
      otpCode: '',
      password: '',
      passwordRep: '',
      errorMessage: {
        password: '',
        passwordRep: '',
        phoneNumError: ''
      }
    }
  },
  methods: {
    phoneValidator(val) {
      return /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(val);
    },
    otpValidator(val) {
      return /\d{6}/.test(val);
    },
    pwdValidator(val) {
      return val.length >= 8;
    },
    pwdRepValidator(val) {
      return this.password == val;
    },
    onSubmit: function () {
      post("/api/hc/user/register", {phoneNum: this.phoneNum, otpCode: this.otpCode, password: this.password}).then(res => {
        if (res.status == 'success') {
          this.$notify({type: 'success', message: '注册成功！'});
          this.$router.push('/LoginByOtp');
        } else {
          this.$notify({type: 'warning', message: res.data.errMsg});
        }
      }).catch(err => {
        this.$notify({type: 'warning', message: '网络错误！'});
      });
    },
    sendOtp: function () {
      this.errorMessage.phoneNumError = '';
      if (this.phoneValidator(this.phoneNum) == false) {
        this.errorMessage.phoneNumError = '手机号格式错误';
      } else {
        post("/api/hc/user/getOtp", {phoneNum: this.phoneNum}).then(res => {
          if (res.status == 'success') {
            this.errorMessage.phoneNumError = '';
            this.$notify({type: 'success', message: '验证码发送成功！'});
          } else {
            this.$notify({type: 'warning', message: res.data.errMsg});
          }
        }).catch(err => {
          console.log(err);
          this.$notify({type: 'warning', message: '网络错误！'});
        })
      }
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
  font-size: .3rem;
  padding: .2rem 1rem .2rem 0;
  color: blue;
}

</style>
