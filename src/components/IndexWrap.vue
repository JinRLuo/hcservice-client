<template>
  <div class="title_div">
    <!-- 两端对齐 -->
    <van-row type="flex" justify="space-between">
      <van-col span="6">
        <img src="../assets/logo-img.png" />
      </van-col>
      <van-col span="6"></van-col>
      <van-col span="6"></van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'IndexWrap',
  data () {
    return {
      msg: '123123123'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
