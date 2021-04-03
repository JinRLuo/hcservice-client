<template>
  <div>
    <van-nav-bar title="我" :fixed=true :placeholder=true class="topBar"/>
    <van-row type="flex" justify="space-between" class="accountFlex" @click="toAccount">
      <van-col span="4" class="leftFlex">
        <van-image class="head-img" round
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
      </van-col>
      <van-col span="13" class="midFlex">
        <span>{{username}}</span>
      </van-col>
      <van-col span="1" class="rightFlex">
        <van-icon name="arrow" color="#D3B39F" size="0.5rem"/>
      </van-col>
    </van-row>
    <van-cell title="房产信息" is-link to="/houseInfo" class="houseInfo"/>
    <van-cell title="退出登录" is-link to="index" @click="logout" class="exit"/>
  </div>
</template>

<script>
export default {
  name: "me",
  data() {
    return {
      username: 'test0001'
    }
  },
  methods: {
    logout: function () {
      this.$dialog.confirm({
        title: '退出登录',
        message: '你真的要退出当前账号吗？',
      })
        .then(() => {
          this.$router.replace('/login');
        })
        .catch(() => {
          this.$router.back();
        });
    },
    toAccount: function () {
      this.$router.push('/account');
    }
  }
}
</script>

<style scoped>
.topBar{
  font-family: Microsoft YaHei;
  height: 1.2rem;
}
.head-img {
  height: 2rem;
  width: 2rem;
}
.accountFlex {
  margin: 0.5rem 0 0 0;
  height: 2.5rem;
  background: #ffffff;
}
.leftFlex {
  margin: 0.25rem 0.5rem;
}
.midFlex {
  line-height: 2.5rem;
  font-size: .5rem;
}
.rightFlex {
  margin: 0.7rem 0.5rem 0.7rem 0.2rem;
}
.houseInfo {
  margin: .5rem 0 0 0;
}
.exit {
  margin: .1rem 0 0 0;
}
</style>
