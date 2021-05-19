<template>
  <div class="addCarInfoPage">
    <van-nav-bar title="添加车辆" left-text="返回" left-arrow @click-left="onClickLeft" :fixed=true :placeholder=true />
    <van-form @submit="onSubmit">
      <van-field name="plateNum" v-model="plateNum" label="车牌号" placeholder="请输入车牌号" :rules="[{ validator: plateNumValidator, message: '车牌号格式错误' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">添加</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {post} from "../../utils/request";

export default {
  name: "AddCarInfo",
  data () {
    return {
      plateNum: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    plateNumValidator(value) {
      return /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(value);
    },
    onSubmit: function (value) {
      post('/api/hc/user/addCarInfo',value).then(res => {
        if (res.status == 'success') {
          this.$notify({type: 'success', message: '添加成功！'});
          this.$router.back();
        } else {
          this.$notify({type: 'warning', message: res.data.errMsg});
        }
      }).catch(err => {
        this.$notify({type: 'warning', message: '网络错误'});
      })
    }
  }
}
</script>

<style scoped>
.addCarInfoPage {
  background: #F8F5FC;
  min-height: 100vh;
}
</style>
