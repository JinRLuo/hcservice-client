<template>
  <div>
    <van-nav-bar
      title="账号"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

  </div>
</template>

<script>
export default {
  name: "Account",
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  },
}
</script>

<style scoped>

</style>
