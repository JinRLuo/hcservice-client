<template>
  <div class="carInfoPage">
    <van-nav-bar title="停车缴费" left-text="返回" left-arrow @click-left="onClickLeft" :fixed=true :placeholder=true />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
      <div style="min-height: 80vh;">
        <div class="carInfoTab" :key="index" v-for="(car,index) in carInfos">
          <van-row>
            <van-col span="18">
              <div>{{ car.plateNum }}</div>
              <div v-if="judgeDate(car.endTime)">
                到期时间：{{car.endTime}}
              </div>
              <div v-else>
                已过期
              </div>
            </van-col>
            <van-col span="6">
              <div class="reNewButton">
                <van-popover
                  v-model="showPopover[index]"
                  theme="dark" trigger="click"
                  :actions="actions"
                  placement="left-start"
                  @select="onSelect"
                  @open="open(car.carId)"
                >
                  <template #reference>
                    <van-button type="primary">续费</van-button>
                  </template>
                </van-popover>
              </div>
            </van-col>
          </van-row>
        </div>
        <van-button icon="plus" type="primary" size="large" @click="onAddCar">添加车辆</van-button>
      </div>
    </van-pull-refresh>

  </div>
</template>

<script>
import {post} from "../../utils/request";
import dayjs from "dayjs";

export default {
  name: "CarInfo",
  data () {
    return {
      isLoading: false,
      showPopover: [],
      actions: [{ text: '月卡' }, { text: '半年卡' }, { text: '年卡' }],
      carInfos: [],
      carId: '',
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onAddCar() {
      this.$router.push('/addCarInfo');
    },
    onRefresh() {
      post('/api/car/user/getCarInfo').then(res => {
        if(res.status == 'success'){
          this.carInfos = res.data;
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
    },
    judgeDate(value) {
      let endTime = dayjs(value);
      let now = new Date();
      if(endTime < now){
        return false;
      }else {
        return true;
      }
    },
    onSelect(action,index) {
      post('/api/order/user/createCarChargeOrder', {type: index, itemId: this.carId}).then(res => {
        if(res.status == 'success'){
          this.$router.push('/orderInfo/'+res.data);
        } else {
          this.$notify({type: 'warning', message: res.data.errMsg});
        }
      }).catch(err => {
        this.$notify({type: 'warning', message: '网络错误'});
      })
    },
    open(value){
      this.carId = value;
    }
  },
  created() {
    post('/api/car/user/getCarInfo',).then(res => {
      if(res.status == 'success') {
        this.carInfos = res.data;
      }
    }).catch(err => {

    })
  }
}
</script>

<style scoped>
.carInfoPage {
  background: #F8F5FC;
  min-height: 100vh;
}
.carInfoTab {
  font-size: 0.35rem;
  padding: .2rem;
  margin: .3rem 0 0 0;
  height: 6em;
  width: 100%;
  background: #ffffff;
}
.reNewButton {
  padding: .5rem 0;
}
</style>
