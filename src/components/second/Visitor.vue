<template>
  <div>
    <van-nav-bar title="访客预约" left-text="返回" left-arrow @click-left="onClickLeft" fixed="true" placeholder="true"/>
    <van-tabs v-model="active">
      <van-tab title="访客信息">
        <van-form @submit="onSubmit">
<!--          <van-cell-group title="带*为必填项">-->
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

            <van-field v-model="reason" label="来访事由*" placeholder="请输入来访事由" />
            <van-field v-model="visitorName" label="访客姓名*" placeholder="如多位只需要填一个" />
            <van-field v-model="visitorPhoneNum" label="联系方式*" placeholder="请输入访客手机号" />
            <!-- 来访人数 -->
            <van-field readonly clickable name="picker" :value="peopleNum" label="来访人数*" placeholder="点击选择人数" @click="showNumPicker = true"/>
            <van-popup v-model="showNumPicker" position="bottom">
              <van-picker show-toolbar :columns="PeopleNumArray" @confirm="onNumConfirm" @cancel="showNumPicker = false"/>
            </van-popup>
           <van-field v-model="visitorPhoneNum" label="备注" placeholder="请输入备注信息" />
            <div style="margin: 1rem;">
              <van-button round block type="info" native-type="submit">预约</van-button>
            </div>
<!--          </van-cell-group>-->
        </van-form>
      </van-tab>

      <van-tab title="预约记录">

      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "Visitor",
  data () {
    return {
      date: '',
      showCalendar: false,
      time: '',
      showTimePicker: false,
      reason: '',
      visitorName: '',
      visitorPhoneNum: '',
      peopleNum: '',
      PeopleNumArray: ['1', '2', '3', '4'],
      showNumPicker: false,
      showAddressPicker: false,
      building: '',
      unit: '',
      room: '',
      address: '',
      addressArray: [
        {
          text: '1',
          children: [
            {
              text: '1',
              children: [{ text: '101' }, { text: '201' }],
            },
            {
              text: '2',
              children: [{ text: '101' }, { text: '201' }],
            },
          ],
        },
        {
          text: '2',
          children: [
            {
              text: '1',
              children: [{ text: '201' }, { text: '301' }],
            },
            {
              text: '2',
              children: [{ text: '101' }, { text: '201' }],
            },
          ],
        },
      ],
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onConfirm(date) {
      this.date = `${date.getMonth() + 1}-${date.getDate()}`;
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
      this.peopleNum = value;
      this.showNumPicker = false;
    },
    onAddressConfirm(value) {
      let arr = value.toString().split(',');
      this.building = arr[0];
      this.unit = arr[1];
      this.room = arr[2];
      this.address = this.building+"幢"+this.unit+"单元"+this.room+"室";
      this.showAddressPicker = false;
    },
  }
}
</script>

<style scoped>

</style>
