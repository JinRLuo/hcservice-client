<template>
  <div class="bindHomePage">
    <van-nav-bar title="绑定房产" left-text="返回" left-arrow @click-left="onClickLeft" :fixed=true :placeholder=true />
    <van-form @submit="onSubmit">
      <van-cell-group title="绑定房产后需要管理员审核，审核通过后才会显示在界面中">
        <!-- 户主姓名 -->
        <van-field v-model="name" label="户主姓名" placeholder="请输入户主姓名" />
        <!-- 证件类型 -->
        <van-field readonly clickable name="credentialType" :value="credentialType" label="证件类型" placeholder="点击选择证件类型" @click="showTypePicker = true"/>
        <van-popup v-model="showTypePicker" position="bottom">
          <van-picker show-toolbar :columns="typeArray" @confirm="onTypeConfirm" @cancel="showTypePicker = false"/>
        </van-popup>
        <!-- 证件号 -->
        <van-field v-model="credentialNum" label="证件号" placeholder="请输入证件号" />
        <!-- 手机号 -->
        <van-field v-model="phoneNum" label="手机号" placeholder="请输入手机号" />
        <!-- 房间号 -->
        <van-field readonly clickable name="picker" :value="address" label="房间号" placeholder="点击选择房间号" @click="showAddressPicker = true"/>
        <van-popup v-model="showAddressPicker" position="bottom">
          <van-picker show-toolbar :columns="addressArray" @confirm="onAddressConfirm" @cancel="showAddressPicker = false"/>
        </van-popup>
      </van-cell-group>
      <div style="margin: 1rem;">
        <van-button round block type="info" native-type="submit">绑定</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {post} from "../../utils/request";

export default {
  name: "BindHome",
  data () {
    return {
      showTypePicker: false,
      showAddressPicker: false,
      typeArray: ['身份证', '户口本', '居住证', '签证'],
      addressArray: [
        // 第一列
        {
          values: ['1', '2', '3', '4', '5']
        },
        // 第二列
        {
          values: ['101', '102', '201','202']
        },
      ],
      address: '',
      name: '',
      credentialType: '',
      credentialNum: '',
      buildingNum: '',
      roomNum: '',
      phoneNum: '',
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onTypeConfirm(value) {
      this.credentialType = value;
      this.showTypePicker = false;
    },
    onAddressConfirm(value) {
      let arr = value.toString().split(',');
      this.buildingNum = arr[0];
      this.roomNum = arr[1];
      this.address = this.buildingNum+"幢"+this.roomNum+"室";
      this.showAddressPicker = false;
    },
    onSubmit(values) {
      post('/api/homeOwner/user/bindHomeOwnerInfo',{name: this.name, credentialType: this.credentialType, credentialNum: this.credentialNum, buildingNum: this.buildingNum, roomNum: this.roomNum, phoneNum: this.phoneNum }).then(res => {
        if(res.status == 'success'){
          this.$notify({type: 'success', message: '提交成功，待管理员审核！'});
          this.$router.back();
        } else {
          this.$notify({type: 'warning', message: res.data.errMsg});
        }
      }).catch(err => {
        this.$notify({type: 'warning', message: "网络错误！"});
      });
    },
  },
}
</script>

<style scoped>
.bindHomePage {
  background: #F8F5FC;
  min-height: 100vh;
}
</style>
