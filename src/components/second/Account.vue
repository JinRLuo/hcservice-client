<template>
  <div>
    <van-nav-bar title="账号" left-text="返回" left-arrow @click-left="onClickLeft" :fixed=true :placeholder=true />
    <van-cell class="head-cell" title="头像" is-link @click="onUploadImg">
      <template #default>
        <van-image class="head-img" round :src="imageUrl"/>
        <van-uploader style="z-index: -1" preview-size="0" :after-read="afterRead" ref="uploaderImg"/>
      </template>
    </van-cell>
    <van-cell title="昵称" :value="userInfo.userName" is-link to="/updateUserName" />
    <van-cell title="手机号" :value="userInfo.phoneNum" is-link />
    <van-cell title="邮箱" :value="userInfo.email" is-link to="/updateEmail" />
  </div>
</template>

<script>
import {post, postFile} from "../../utils/request";

export default {
  name: "Account",
  data () {
    return {
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onUploadImg() {
      this.$refs.uploaderImg.chooseFile();
    },
    afterRead(file) {
      let fd = new FormData()
      fd.append('image', file.file)
      postFile('/api/hc/user/updateHeadImage', fd).then(res => {
          if(res.status == 'success') {
            this.$store.commit('SET_USER_INFO', res.data);
            this.$notify({type: 'success', message: '头像修改成功！'});
          } else {
            this.$notify({type: 'warning', message: res.data.errMsg});
          }
        }).catch(err => {
          this.$notify({type: 'warning', message: '网络错误！'});
        });
    },
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    },
    imageUrl () {
      let url = 'https://hcservice-image-1256980503.cos.ap-guangzhou.myqcloud.com/' + this.$store.getters.userInfo.pictureUrl;
      return url;
    }
  },
}
</script>

<style scoped>
.head-cell .van-cell__title {
  height: 2rem;
  line-height: 2rem;
}
.head-img {
  height: 2rem;
  width: 2rem;
}
.head-cell .van-cell__right-icon {
  margin: .7rem .05rem .7rem 0.3rem;
}
.file-upload-cell .van-uploader__input-wrapper{
  position: absolute;
  width: 100%;
}
</style>
