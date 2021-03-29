<template>
  <div>
    <!-- 顶部栏 -->
    <van-nav-bar title="业主服务系统" fixed="true" placeholder="true" />



      <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="4000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image"/>
      </van-swipe-item>
    </van-swipe>

    <!-- 功能按钮 -->
    <div class="buttonsTag">小区服务</div>
    <van-grid :column-num="4" square="true" class="buttonsList liveService">
      <van-grid-item v-for="(sb, index) in serviceButton" :key="index" :icon="sb.icon" :text="sb.name" />
    </van-grid>
    <div class="buttonsTag">生活缴费</div>
    <van-grid :column-num="4" square="true" class="buttonsList livePayment">
      <van-grid-item v-for="(pb, index) in paymentButton" :key="index" icon="photo-o" :text="pb.name" >
        <van-icon class="iconfont" class-prefix="icon" slot="icon" :name="pb.icon" size=".7rem"></van-icon>
      </van-grid-item>
    </van-grid>


  </div>
</template>

<script>
export default {
  name: "home",
  data () {
    return {
      isLoading: false,
      serviceButton: [
        {
          name: '小区地图',
          icon: 'location-o'
        },
        {
          name: '小区公告',
          icon: 'newspaper-o'
        },
        {
          name: '访客预约',
          icon: 'user-o'
        },
        {
          name: '设备报修',
          icon: 'setting-o'
        },
        {
          name: '服务投诉',
          icon: 'comment-o'
        }
      ],
      paymentButton: [
        {
          name: '电费缴纳',
          icon: 'dianfeijiaofei'
        },
        {
          name: '水费缴纳',
          icon: 'shuifei'
        },
        {
          name: '停车费缴纳',
          icon: 'cheliang'
        },
        {
          name: '物业费缴纳',
          icon: 'wuyefei'
        }
      ],
      images: [
        require('../image/swipe1.png'),
        require('../image/swipe2.png'),
        require('../image/swipe3.png'),
        require('../image/swipe4.png'),
        require('../image/swipe5.png')
      ],
    }
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
  }
}
</script>

<style scoped>
.topBar{
  font-family: Microsoft YaHei;
  height: 1.2rem;
  font-size: .5rem;
  text-align: center;
  line-height: 1.2rem;
  background: #ffffff;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 5.5rem;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe img{
  width: 100%;
  height: 5.5rem;
}
.buttonsTag {
  margin: 0.3rem;
  color: gray;
  font-size: .35rem;
  background: #F8F5FC;
}
</style>
