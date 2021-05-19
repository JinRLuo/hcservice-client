<template>
  <div class="visitInfo">
    <van-nav-bar title="访客预约" left-text="返回" left-arrow @click-left="onClickLeft" :fixed=true :placeholder=true />
    <van-tabs v-model="active">
      <van-tab title="访客信息">
        <van-form @submit="onSubmit">

            <!-- 日期 -->
            <van-field readonly clickable name="calendar" :value="date" label="来访日期*" placeholder="点击选择日期" @click="showCalendar = true"/>
            <van-calendar v-model="showCalendar" @confirm="onConfirm" />
            <!-- 时间 -->
            <van-field readonly clickable name="datetimePicker" :value="time" label="来访时间*" placeholder="点击选择时间" @click="showTimePicker = true"/>
            <van-popup v-model="showTimePicker" position="bottom">
              <van-datetime-picker type="time" @confirm="onSelectConfirm" @cancel="showTimePicker = false" :filter="filter"/>
            </van-popup>
            <!-- 地点 -->
            <van-field readonly clickable name="picker" :value="address" label="访问地点*" placeholder="点击选择地点" @click="showAddressPicker = true"/>
            <van-popup v-model="showAddressPicker" position="bottom">
              <van-picker show-toolbar :columns="addressArray" @confirm="onAddressConfirm" @cancel="showAddressPicker = false"/>
            </van-popup>

            <van-field v-model="visitingReason" label="来访事由*" placeholder="请输入来访事由" />
            <van-field v-model="visitorName" label="访客姓名*" placeholder="如多位只需要填一个" />
            <van-field v-model="phoneNum" label="联系方式*" placeholder="请输入访客手机号" />
            <!-- 来访人数 -->
            <van-field readonly clickable name="picker" :value="peopleCount" label="来访人数*" placeholder="点击选择人数" @click="showNumPicker = true"/>
            <van-popup v-model="showNumPicker" position="bottom">
              <van-picker show-toolbar :columns="PeopleNumArray" @confirm="onNumConfirm" @cancel="showNumPicker = false"/>
            </van-popup>
           <van-field v-model="remark" label="备注" placeholder="请输入备注信息" />
            <div style="margin: 1rem;">
              <van-button round block type="info" native-type="submit">预约</van-button>
            </div>
        </van-form>
      </van-tab>
      <van-tab title="预约记录">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
          <div style="min-height: 80vh;">
            <div class="visitRecordTab" v-for="record in visitRecords">
              <div>{{record.visitTime}}</div>
              <hr>
              <div>{{record.visitorName}}   {{record.phoneNum}}</div>
              <div>{{record.peopleCount}}人    {{record.buildingNum}}幢{{record.roomNum}}房</div>
            </div>
          </div>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {post} from "../../utils/request";
import dayjs from "dayjs";

export default {
  name: "Visitor",
  data () {
    return {
      isLoading: false,
      active: 0,
      date: '',
      showCalendar: false,
      time: '',
      showTimePicker: false,
      visitingReason: '',
      visitorName: '',
      phoneNum: '',
      remark: '',
      peopleCount: '',
      PeopleNumArray: ['1', '2', '3', '4'],
      showNumPicker: false,
      showAddressPicker: false,
      building: '',
      room: '',
      address: '',
      addressArray: [
        {
          text: '1',
          children: [
            { text: '101' }, { text: '201' }
          ],
        },
        {
          text: '2',
          children: [
            { text: '201' }, { text: '301' }
          ],
        },
      ],
      visitRecords: []
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onConfirm(date) {
      console.log(date);
      this.date =  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      console.log(this.date);
      this.showCalendar = false;
    },
    onSelectConfirm(value) {
      this.time = value;
      this.showTimePicker = false;
    },
    filter(type, options) {
      if (type === 'minute') {
        return options.filter((option) => option % 5 === 0);
      }
      return options;
    },
    onNumConfirm(value) {
      this.peopleCount = value;
      this.showNumPicker = false;
    },
    onAddressConfirm(value) {
      let arr = value.toString().split(',');
      this.building = arr[0];
      this.room = arr[1];
      this.address = this.building+"幢"+this.room+"室";
      this.showAddressPicker = false;
    },
    onSubmit: function () {
      let yy = new Date();
      let visitTime = dayjs(this.date+ ' ' + this.time).format('YYYY-MM-DD HH:mm:ss');
      post('/api/hc/user/subscribe',{visitTime: visitTime, buildingNum: this.building, roomNum: this.room, visitingReason: this.visitingReason, visitorName: this.visitorName, phoneNum: this.phoneNum, peopleCount: this.peopleCount, remark: this.remark}).then(res => {
        if(res.status == 'success') {
          this.$notify({type: 'success', message: '预约成功'});
          this.active = 1;
        } else {
          this.$notify({type: 'warning', message: res.data.errMsg});
        }
      }).catch(err => {
        this.$notify({type: 'warning', message: '网络错误！'});
      });
    },
    onRefresh() {
      post('/api/hc/user/getRecord',).then(res => {
        if(res.status == 'success'){
          this.visitRecords = res.data;
        }
      }).catch(err => {

      });
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
  }
}
</script>

<style scoped>
.visitInfo {
  background: #F8F5FC;
  min-height: 100vh;
}
.visitRecordTab {
  font-size: 0.35rem;
  padding: .2rem;
  margin: .3rem 0 0 0;
  height: 6em;
  width: 100%;
  background: #ffffff;
}
</style>
