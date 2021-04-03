<template>
  <div>
    <img class="logo" src="../image/logo.png"/>
    <van-form @submit="onSubmit">
      <van-field :error-message="errorMessage.phoneNumError" v-model="loginInfo.phoneNum" label="手机号" placeholder="请输入手机号" :rules="[{ validator: phoneValidator, message: '手机号格式错误' }]" />
      <van-field :error-message="errorMessage.otpCodeError" v-model="loginInfo.otpCode" center clearable label="短信验证码" placeholder="请输入六位短信验证码" :rules="[{ validator: otpValidator, message: '验证码格式错误' }]">
        <template #button>
          <van-button native-type="button" size="small" type="primary" @click="sendOtp">发送验证码</van-button>
        </template>
      </van-field>
      <van-row>
        <van-col span="8" class="link-passwordLogin">
          <router-link :to="{path:'/login'}">使用密码登录</router-link>
        </van-col>
        <van-col span="16" class="link-register">
          <router-link :to="{path:'/register'}">还没有账号？去注册</router-link>
        </van-col>
      </van-row>
      <div>

      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {get, post} from "../utils/request";
import store from "../store";

export default {
  name: "LoginByOtp",
  data () {
    return {
      loginInfo: {
        phoneNum: '',
        otpCode: ''
      },
      errorMessage: {
        phoneNumError: '',
        otpCodeError: ''
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
    onSubmit: function () {
      post("/api/hc/user/login", this.loginInfo).then(res => {
        console.log(res)
        if (res.status == 'fail') {
          this.$notify({type: 'warning', message: res.data.errMsg });
          console.log(this.errorMessage.otpCodeError);
        } else {
          this.$store.commit('SET_TOKEN', res.data);
          console.log(this.$store.getters.token);
          this.$router.replace('/home');
        }
      }).catch(err => {
        console.log("error");
        console.log(err);
      });
      // this.$router.replace('/home');
    },
    sendOtp: function () {
      console.log(this.phoneValidator(this.loginInfo.phoneNum));
      if (this.phoneValidator(this.loginInfo.phoneNum) == false) {
        this.errorMessage.phoneNumError = '手机号格式错误'
      } else {
        post("/api/hc/user/getOtp", {phoneNum: this.loginInfo.phoneNum}).then(res => {
          if (res.status == 'success') {
            this.errorMessage.phoneNumError = '';
            this.$notify({type: 'success', message: '验证码发送成功！'});
          } else {
            this.$notify({type: 'warning', message: res.data.errMsg});
          }
        }).catch(err => {

        })
      }
    }
  },
}
</script>

<style scoped>
.logo {
  width: 100%;
  padding: 2rem 0 .5rem 0;
}
.link-passwordLogin {
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
