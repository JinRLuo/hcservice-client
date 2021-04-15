<template>
  <div class="serviceCostPage">
    <van-nav-bar title="物业缴费" left-text="返回" left-arrow @click-left="onClickLeft" :fixed=true :placeholder=true />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
      <div style="min-height: 80vh;">
        <div class="serviceCostTab" v-for="record in serviceCostRecord">
          <van-row>
            <van-col span="18">
              <div>房间号：{{record.buildingNum}}幢{{record.roomNum}}房</div>
              <div>时间：{{record.time}}</div>
              <div>应缴金额：{{record.cost/100}}元</div>
            </van-col>
            <van-col span="6">
              <van-button square type="primary" @click="payServiceCost(record.costId)">缴费</van-button>
            </van-col>
          </van-row>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import {post} from "../../utils/request";

export default {
  name: "ServiceCost",
  data () {
    return {
      isLoading: false,
      serviceCostRecord: [],
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    payServiceCost(costId) {
      post('/api/order/user/createServiceCostChargeOrder',{costId: costId}).then(res => {
        if(res.status == 'success'){
          this.$router.push('/orderInfo/'+res.data);
        } else {
          this.$notify({type: 'warning', message: res.data.errMsg});
        }
      }).catch(err => {
        this.$notify({type: 'warning', message: '网络错误'});
      });
    },
    onRefresh() {
      post('/api/serviceCost/user/getServiceCostRecord').then(res => {
        if(res.status == 'success'){
          this.serviceCostRecord = res.data;
          setTimeout(() => {
            this.$toast('刷新成功');
            this.isLoading = false;
          }, 1);
        } else {
          setTimeout(() => {
            this.$toast('刷新失败');
            this.isLoading = false;
          }, 1);
        }
      }).catch(err =>
      {
        setTimeout(() => {
          this.$toast('刷新失败');
          this.isLoading = false;
        }, 1);
      });
    }
  },
  created() {
    post('/api/serviceCost/user/getServiceCostRecord', {}).then(res => {
      if(res.status == 'success'){
        this.serviceCostRecord = res.data;
      }
    })
  }
}
</script>

<style scoped>
.serviceCostPage {
  background: #F8F5FC;
  min-height: 100vh;
}
.serviceCostTab {
  font-size: 0.35rem;
  padding: .2rem;
  margin: .3rem 0 0 0;
  height: 6em;
  width: 100%;
  background: #ffffff;
}
</style>
