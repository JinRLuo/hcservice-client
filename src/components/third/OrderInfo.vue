<template>
  <div class="orderInfoPage">
    <van-nav-bar title="订单信息" left-text="返回" left-arrow @click-left="onClickLeft" :fixed=true :placeholder=true />
    <div class="orderInfoDiv">
        <div>订单金额：{{orderInfo.orderPrice/100.00}}元</div>
        <div>创建时间：{{orderInfo.createTime}}</div>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="info" @click="paymentOrder">支付订单</van-button>
    </div>
  </div>
</template>

<script>
import {post} from "../../utils/request";

export default {
  name: "OrderInfo",
  data() {
    return {
      orderId: '',
      orderInfo: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    paymentOrder() {
      post('/api/hc/user/payOrder', {orderId: this.orderId}).then(res => {
        if (res.status == "success") {
          this.$notify({type: 'success', message: '支付成功！'});
          this.$router.back();
        } else {
          this.$notify({type: 'success', message: res.data.errMsg});
          this.$router.back();
        }
      }).catch(err => {
        this.$notify({type: 'success', message: '网络错误！'});
      })
    }
  },
  created() {
    this.orderId = this.$route.params.orderId;
    post('/api/hc/user/getOrderInfo', {orderId: this.orderId}).then(res => {
      if(res.status == 'success'){
        this.orderInfo = res.data;
      }
    }).catch(err => {

    });
  }
}
</script>

<style scoped>
.orderInfoDiv {
  font-size: 0.35rem;
  padding: .2rem;
  margin: .3rem 0 0 0;
  height: 6em;
  width: 100%;
  background: #ffffff;
}
</style>
