<template>
  <div>
    <van-nav-bar title="房产信息" left-text="返回" left-arrow @click-left="onClickLeft" fixed="true" placeholder="true"/>

  </div>
</template>

<script>
export default {
  name: "HouseInfo",
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  },
}
</script>

<style scoped>

</style>
