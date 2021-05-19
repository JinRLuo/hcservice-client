<template>
  <div class="houseInfoPage">
    <van-nav-bar title="房产信息" left-text="返回" right-text="绑定房产" left-arrow @click-left="onClickLeft" @click-right="onAddHouseInfo" :fixed=true :placeholder=true />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
      <div style="min-height: 80vh;">
        <div class="bindInfoTab" v-for="info in bindInfo">
          <div>{{info.buildingNum}}幢{{info.roomNum}}房</div>
          <div>面积：{{info.area}}平方米</div>
          <div>所有人：{{info.name}}</div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import {post} from "../../utils/request";

export default {
  name: "HouseInfo",
  data () {
    return {
      isLoading: false,
      bindInfo: [],
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onAddHouseInfo() {
      this.$router.push('/bindHome');
    },
    onRefresh() {
      post('/api/hc/user/getBindHouse',).then(res => {
        if(res.status == 'success'){
          this.bindInfo = res.data;
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
      }).catch(err => {
        setTimeout(() => {
          this.$toast('网络错误');
          this.isLoading = false;
        }, 1);
      });
    },
  },
  created() {
    post('/api/hc/user/getBindHouse',).then(res => {
      if(res.status == 'success'){
        this.bindInfo = res.data;
      }
    }).catch(err => {

    });
  }
}
</script>

<style scoped>
.houseInfoPage {
  background: #F8F5FC;
  min-height: 100vh;
}
.bindInfoTab {
  font-size: 0.35rem;
  padding: .2rem;
  margin: .3rem 0 0 0;
  height: 6em;
  width: 100%;
  background: #ffffff;
}
</style>
