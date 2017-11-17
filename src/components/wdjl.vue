<template>
  <div class="wdjl">
    <div class="message">
      <h2>
        <span>基本信息</span>
        <i @click="jbxx">编辑</i>
      </h2>
      <div class="user">
        <img :src="userHead" alt="">
        <ul>
          <li><span>{{userName}}</span><span>{{sexString}}</span><span>{{age}}</span></li>
          <li class="locationName">{{locationName}}</li>
          <li class="tel">{{tel}}</li>
          <li>{{stay}}</li>
        </ul>
      </div>
    </div>
    <div class="work">
      <h2>
        <span>工作经历</span>
        <i @click="gzjl">编辑</i>
      </h2>
      <ul v-for="jobWork in jobWorks">
        <li>
          <i></i>
          <span>{{jobWork.startDate.split(',')[1] < 10 ? jobWork.startDate.split(',').join('/0') : jobWork.startDate.split(',').join('/')}}-{{jobWork.endDate.split(',')[1] < 10 ? jobWork.endDate.split(',').join('/0') : jobWork.endDate.split(',').join('/')}}</span>
        </li>
        <li><span class="companyName">{{jobWork.companyName}}</span></li>
        <li><span>{{jobWork.jobName}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import axios from 'axios'
  export default {
    name: 'wdjl',
    data () {
      return {
        sex: '',
        age: '',
        locationName: '',
        tel: '',
        stay: '',
        jobWorks: ''
      }
    },
    computed: {
      ...mapGetters([ // 从store上绑定的getters中载入需要的到此组件中
        'userHead',
        'userName'
      ]),
      sexString: function () {
        if (this.sex === '0') {
          return '男'
        } else {
          return '女'
        }
      }
    },
    mounted: function () {
      this.userInfo()
      this.jobWorkInfo()
    },
    methods: {
      userInfo: function () {
        var _this = this
        axios.get('job/user/getUserInfoByUserId', {
          params: {
            userId: _this.$store.state.userId
          }
        }).then((res) => {
          var user = res.data.user
          var myDate = new Date()
          _this.sex = user.sex
          _this.age = myDate.getFullYear() - user.birthday.split(',')[0] + '岁'
          _this.locationName = user.locationName
          _this.tel = user.tel
          _this.stay = user.stay
        })
      },
      jobWorkInfo: function () {
        var _this = this
        axios.get('job/resume/jobWorkInfo', {
          params: {
            userId: _this.$store.state.userId
          }
        }).then((res) => {
          _this.jobWorks = res.data.data.jobWorks
        })
      },
      jbxx: function () {
        this.$router.push({
          name: 'jbxx',
          params: {
            education: false
          }
        })
      },
      gzjl: function () {
        this.$router.push({
          name: 'gzjl'
        })
      }
    }
  }
</script>

<style scoped>
  .wdjl {
    flex: 1;
    background: #f2f2f2;
    display: flex;
    flex-direction: column;
  }

  .message,
  .work {
    padding-left: 18px;
    margin-top: 10px;
    background: #fff;
  }

  .message h2,
  .work h2 {
    margin: 0;
    margin-bottom: 10px;
    height: 38px;
    border-bottom: 1px solid #f8f8f8;
    display: flex;
    justify-content: space-between;
  }

  .message h2 span {
    margin-top: 0;
    font-size: 14px;
    text-align: left;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    color: #333333;
    background: url('../assets/u1183.png') no-repeat center left;
    background-size: 19px;
    padding-left: 22px;
    line-height: 38px;
  }

  .message h2 i,
  .work h2 i {
    margin-top: 0;
    background: url('../assets/u1361.png') no-repeat center left;
    background-size: 20px;
    font-size: 12px;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    line-height: 38px;
    padding-left: 20px;
    color: #72d5c7;
    margin-right: 20px;
  }

  .work h2 span {
    margin-top: 0;
    font-size: 14px;
    text-align: left;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    color: #333333;
    background: url('../assets/u1389.png') no-repeat center left;
    background-size: 19px;
    padding-left: 22px;
    line-height: 38px;
  }

  .user {
    display: flex;
  }

  .user img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin-right: 12px;
  }

  .user ul {
    flex: 1;
  }

  .user li:first-child {
    font-size: 13px;
    color: #999999;
    text-align: left;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    height: 14px;
    line-height: 14px;
    display: flex;
  }

  .user li:first-child span{
    padding:0 8px;
    border-left: 1px solid #c9c9c9;
  }

  .user li:first-child span:first-child{
    color: #333;
    font-size: 14px;
    padding-left: 0;
    border: 0;
  }

  .locationName{
    font-size: 13px;
    height: 13px;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    color: #333333;
    line-height: 13px;
    margin-top: 12px;
  }

  .tel{
    font-size: 13px;
    color: #999999;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    height: 14px;
    line-height: 14px;
    background: url('../assets/u1377.png') no-repeat center left;
    background-size: 14px;
    padding-left: 24px;
    margin-top: 8px;
  }

  .user li:last-child{
    font-size: 13px;
    color: #999999;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    height: 16px;
    line-height: 16px;
    background: url('../assets/u1381.png') no-repeat center left;
    background-size: 16px;
    margin: 10px 0 18px;
    padding-left: 24px;
  }

  .work ul i{
    width: 10px;
    height: 10px;
    background: #ffcc00;
    border-radius: 100%;
    display: inline-block;
    margin: 3px 6px 0;
  }

  .work li span{
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #666666;
    margin-left: 11px;
    padding-left: 10px;
    border-left: 1px solid #ffcc00;
    height: 13px;
    line-height: 13px;
  }

  .work li{
    display: flex;
  }

  .work li:first-child span{
    font-size: 13px;
    color: #999999;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    margin: 0;
    padding: 0;
    border: 0;
  }

  .companyName {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .work li:last-child span{
    font-size: 13px;
    color: #999999;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    padding-bottom: 25px;
  }
</style>
