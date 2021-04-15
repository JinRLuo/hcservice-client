<template>
  <diV class="repairPage">
    <van-nav-bar title="设备报修" left-text="返回" left-arrow @click-left="onClickLeft" :fixed=true :placeholder=true />
    <van-tabs v-model="active">
      <van-tab title="报修">
        <van-form @submit="onSubmit">
          <van-cell-group title="具体描述">
            <van-field readonly clickable name="type" :value="type" label="报修类型" placeholder="点击选择" @click="showTypePicker = true" />
            <van-popup v-model="showTypePicker" position="bottom">
              <van-picker show-toolbar :columns="typeColumns" @confirm="onConfirmType" @cancel="showTypePicker = false"/>
            </van-popup>
            <van-field name="description" v-model="description" rows="2" autosize label="描述" type="textarea" maxlength="100" placeholder="请输入描述" show-word-limit />
            <van-field name="multipartFiles" label="上传图片">
              <template #input>
                <van-uploader v-model="multipartFiles" multiple :max-count="2" style="height: 2.25rem;"/>
              </template>
            </van-field>
          </van-cell-group>
          <div style="margin: 1rem;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="记录">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
          <div style="min-height: 80vh;">
            <div class="repairRecordTab" v-for="record in repairRecords">
              <div>{{record.createTime}}</div>
              <div>类型：{{record.type}}</div>
              <div>描述：{{record.description}}</div>
            </div>
          </div>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </diV>
</template>

<script>
import {post, postFile} from "../../utils/request";

export default {
  name: "Repair",
  data () {
    return {
      isLoading: false,
      active: 0,
      showTypePicker: false,
      typeColumns: ['公共设备','家用电器','管道泄露','其他'],
      type: '',
      description: '',
      multipartFiles: [],
      repairRecords: [],
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onConfirmType(value) {
      this.type = value;
      this.showTypePicker = false;
    },
    onSubmit(values) {
      let fd = new FormData()
      fd.append('type', values.type);
      fd.append('description', values.description);
      for(let i=0; i < this.multipartFiles.length; i++){
        fd.append('multipartFiles', this.multipartFiles[i].file);
      }
      // fd.append('multipartFiles', values.multipartFiles[0]);
      console.log(fd);
      postFile('/api/repairInfo/user/reportRepair',fd).then(res => {
        if(res.status == 'success') {
          this.$notify({type: 'success', message: '报修成功'});
          this.active = 1;
          this.repairRecords = res.data;
        } else {
          this.$notify({type: 'warning', message: res.data.errMsg});
        }
      }).catch(err => {
        this.$notify({type: 'warning', message: '网络错误！'});
      })
    },
    onRefresh() {
      post('/api/repairInfo/user/getRepairRecord').then(res => {
        if(res.status == 'success'){
          this.repairRecords = res.data;
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
          this.$toast('刷新失败');
          this.isLoading = false;
        }, 1);
      });
    }
  }
}
</script>

<style scoped>
.repairPage {
  background: #F8F5FC;
  min-height: 100vh;
}
.repairRecordTab {
  font-size: 0.35rem;
  padding: .2rem;
  margin: .3rem 0 0 0;
  height: 6em;
  width: 100%;
  background: #ffffff;
}
</style>
