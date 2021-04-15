<template>
  <div class="complaintPage">
    <van-nav-bar title="服务投诉" left-text="返回" left-arrow @click-left="onClickLeft" :fixed=true :placeholder=true />
    <van-form @submit="onSubmit">
      <van-field readonly clickable name="type" :value="type" label="投诉类型" placeholder="点击选择" @click="showTypePicker = true" />
      <van-popup v-model="showTypePicker" position="bottom">
        <van-picker show-toolbar :columns="typeColumns" @confirm="onConfirmType" @cancel="showTypePicker = false"/>
      </van-popup>
      <van-field name="content" v-model="content" rows="2" autosize label="描述" type="textarea" maxlength="100" placeholder="请输入不少于10字的描述" show-word-limit />
      <div style="margin: 1rem;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import {post} from "../../utils/request";

export default {
  name: "Complaint",
  data () {
    return {
      showTypePicker: false,
      typeColumns: ['程序错误','账号问题','行政投诉','功能建议','园区建议'],
      content: '',
      type: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onSubmit(values) {
      post('/api/hc/user/complain', values).then(res => {
        if (res.status == 'success') {
          this.$notify({type: 'success', message: '我们已经成功收到了您的反馈'});
          this.typeColumns = '';
          this.content = '';
        } else {
          this.$notify({type: 'warning', message: res.data.errMsg});
        }
      }).catch(err => {
        this.$notify({type: 'warning', message: '网络错误！'});
      });
    },
    onConfirmType(value) {
      this.type = value;
      this.showTypePicker = false;
    },
  }
}
</script>

<style scoped>
.complaintPage{
  background: #F8F5FC;
  min-height: 100vh;
}
</style>
