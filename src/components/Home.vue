<template>
  <div>
    <!-- 顶部栏 -->
    <van-nav-bar title="西山龙胤" :fixed=true :placeholder=true />

      <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="4000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image"/>
      </van-swipe-item>
    </van-swipe>

    <!-- 功能按钮 -->
    <div class="buttonsTag">小区服务</div>
    <van-grid :column-num="4" :square=true class="buttonsList liveService">
      <van-grid-item v-for="(sb, index) in serviceButton" :key="index" :icon="sb.icon" :text="sb.name" :to="sb.url" />
    </van-grid>
    <div class="buttonsTag">生活缴费</div>
    <van-grid :column-num="4" :square=true class="buttonsList livePayment">
      <van-grid-item v-for="(pb, index) in paymentButton" :key="index" icon="photo-o" :text="pb.name" :to="pb.url">
        <van-icon class="iconfont" class-prefix="icon" slot="icon" :name="pb.icon" size=".7rem" ></van-icon>
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
          icon: 'location-o',
          url: ''
        },
        {
          name: '小区公告',
          icon: 'newspaper-o',
          url: '/notice'
        },
        {
          name: '访客预约',
          icon: 'user-o',
          url: '/visitor'
        },
        {
          name: '设备报修',
          icon: 'setting-o',
          url: '/repair'
        },
        {
          name: '服务投诉',
          icon: 'comment-o',
          url: '/complaint'
        }
      ],
      paymentButton: [
        {
          name: '停车费缴纳',
          icon: 'cheliang',
          url: '/carInfo'
        },
        {
          name: '物业费缴纳',
          icon: 'wuyefei',
          url: '/serviceCost'
        }
      ],
      images: [
        'https://hcservice-image-1256980503.cos.ap-guangzhou.myqcloud.com/swipe/swipe1.png',
        'https://hcservice-image-1256980503.cos.ap-guangzhou.myqcloud.com/swipe/swipe2.png',
        'https://hcservice-image-1256980503.cos.ap-guangzhou.myqcloud.com/swipe/swipe3.png',
        'https://hcservice-image-1256980503.cos.ap-guangzhou.myqcloud.com/swipe/swipe4.png',
        'https://hcservice-image-1256980503.cos.ap-guangzhou.myqcloud.com/swipe/swipe5.png'
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
