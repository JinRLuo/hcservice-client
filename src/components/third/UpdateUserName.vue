<template>
  <div class="setUserName">
    <van-nav-bar title="设置昵称" left-text="返回" right-text="完成" left-arrow @click-left="backPage" @click-right="onUpdate" :fixed=true :placeholder=true />
    <van-form @submit="">
    <van-cell-group title="长度为6-20,只接受数字、字母和下划线">
      <van-field v-model="userName" label="昵称" maxlength="20" autofocus=true :rules="[{ validator: nameValidator, message: '格式错误' }]"/>
    </van-cell-group>
    </van-form>
  </div>
</template>

<script>
import {post} from "../../utils/request";

export default {
  name: "UpdateUserName",
  data () {
    return {
      userName: this.$store.getters.userInfo.userName
    }
  },
  methods: {
    backPage: function () {
      this.$router.back();
    },
    onUpdate: function () {
      if(this.nameValidator(this.userName)) {
        post('/api/hc/user/updateUserName',{userName: this.userName}).then(res => {
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
    nameValidator (val) {
      return /^[\w]{6,20}$/.test(val);
    }
  },
  computed: {

  }
}
</script>

<style scoped>
.setUserName {
  background: #F8F5FC;
  min-height: 100vh;
}
</style>
