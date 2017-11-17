<template>
  <div class="details">
    <div class="tishi" v-if="tishi">
      <div class="quan">
        <div class="bg">
          <img src="../assets/u286.png" alt="">
        </div>
      </div>
      <img class="jiantou" src="../assets/u834.png" alt="">
      <span>一键分享朋友圈</span>
    </div>
    <h2>
      职位详情
      <img v-if="job.cId == null" @click="collection(1)" src="../assets/u819.png" alt="">
      <img v-else @click="collection(0)" src="../assets/u819_selected.png" alt="">
    </h2>
    <section id="index-scroll" ref="wrapper">
        <div>
          <div class="title">
              <h3>{{job.title}}</h3>
              <span>{{job.jobSalaryName}}</span>
          </div>
          <div class="biaoqian">
              <span>{{job.cityName}}</span>
              <span>{{job.jobTypeName}}</span>
              <i>{{job.createDate}}</i>
          </div>
          <h4>
            <span>职位要求</span>
          </h4>
          <div v-if="details !== ''" class="yaoqiu">{{details}}</div>
          <audio v-else :src="sound" controls="controls"></audio>
          <h4 v-if="job.companyName !== null && job.companyName !== ''">
            <span>公司介绍</span>
          </h4>
          <div v-if="job.companyName !== null && job.companyName !== ''" class="company">
            <div class="companyInfo">
              <div class="top">
                <img class="logo" :src="job.companyLogo" alt="">
                <div>
                  <p>{{job.companyName}}</p>
                  <p>{{job.companyInfo}}</p>
                </div>
              </div>
              <img class="companyPublicity" :src="job.companyPublicity" alt="">
            </div>
            <img class="fudai" src="../assets/u821.png" alt="" @click="fudai">
          </div>
          <h4>
            <span>联系公司</span>
          </h4>
          <div v-if="job.companyName !== null && job.companyName !== ''" class="lianxi">
            <div class="erwei">
              <img :src="job.companyQRCode" alt="">
              <span>扫描二维码，在线联络</span>
            </div>
            <img class="or" src="../assets/u813.png" alt="">
            <div class="jianli">
              <a :href="telNum">{{job.tel}}</a>
              <span v-if="job.dResult === null" class="toudi">投递简历</span>
              <span v-else class="ytd">已投递</span>
            </div>
          </div>
          <div v-else class="lx">
            <a :href="telNum">{{job.tel}}</a>
            <span v-if="job.dResult === null" class="toudi">投递简历</span>
            <span v-else class="ytd">已投递</span>
          </div>
          <img v-if="job.companyName === null || job.companyName === ''" class="nfudai" src="../assets/u821.png" alt="" @click="fudai">
          <div class="buttom"></div>
        </div>
      </section>
  </div>
</template>

<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import wx from 'weixin-js-sdk'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    name: 'index',
    data () {
      return {
        job: '',
        details: '',
        sound: ''
      }
    },
    computed: {
      ...mapGetters([ // 从store上绑定的getters中载入需要的到此组件中
        'tishi'
      ]),
      telNum: function () {
        return 'tel:' + this.job.tel
      }
    },
    mounted: function () {
      this.actionTishi(true)
      this.jobInfoDetails()
    },
    methods: {
      ...mapActions([ // 从store上绑定的getters中载入需要的到此组件中
        'actionTishi'
      ]),
      jobInfoDetails: function () {
        var that = this
        axios.get('job/info/jobInfoDetails', {
          params: {
            userId: that.$store.state.userId,
            jobId: that.$route.params.job
          }
        }).then((res) => {
          that.job = res.data.data
          if (that.job.details !== '' && that.job.details !== null) {
            if (that.job.details.slice(-4) !== '.mp3') {
              that.details = that.job.details
            } else {
              that.sound = that.job.details
            }
          } else {
            that.details = '要求面谈'
          }
          Vue.nextTick(() => {
            that.wrapper = new BScroll(that.$refs.wrapper, {
              click: true
            })
            wx.onMenuShareTimeline({
              title: '【招聘】' + that.job.title, // 分享标题
              link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: that.job.companyLogo || 'http://ofot6413t.bkt.clouddn.com/3f04c2bf513091dc34ee46f01e8eee43.jpg' // 分享图标
            })
            wx.onMenuShareAppMessage({
              title: '【招聘】' + that.job.title, // 分享标题
              link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: that.job.companyLogo || 'http://ofot6413t.bkt.clouddn.com/3f04c2bf513091dc34ee46f01e8eee43.jpg' // 分享图标
            })
          })
          that.actionTishi(false)
        })
      },
      collection: function (status) {
        var that = this
        axios.get('job/user/saveCollection', {
          params: {
            userId: that.$store.state.userId,
            title: that.$route.params.title,
            jobId: that.$route.params.jobId,
            status: status
          }
        }).then((res) => {
          if (status === 1) {
            that.cId = ''
          } else {
            that.cId = null
          }
        })
      },
      fudai: function () {
        this.$router.push({
          name: 'fudai'
        })
      }
    }
  }
</script>

<style scoped>
  .details {
    flex: 1;
    background: #fafafa;
    display: flex;
    flex-direction: column;
  }

  .tishi{
    position: absolute;
    right: 10px;
    top: 0;
    z-index: 10000;
  }

  .quan{
    width: 62px;
    height: 62px;
    background: url('../assets/u828.png');
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bg{
    width: 40px;
    height: 23px;
    background-color: rgba(0, 0, 0, 1);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bg img{
    width: 21px;
    height: 21px;
  }

  .jiantou{
    width: 79px;
    height: 79px;
    transform:rotate(150deg);
    position: absolute;
    right: 45px;
    top: 50px;
  }

  .tishi span{
    font-family: 'DFWaWaSC-W5', 'Wawati SC';
    font-weight: 400;
    font-style: normal;
    font-size: 30px;
    color: rgba(255, 255, 255, 0.8);
    position: absolute;
    width: 211px;
    right: 30px;
    top: 100px;
    transform:rotate(20deg);
  }

  h2{
    height: 42px;
    background-color: rgba(255, 255, 255, 1);
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    margin: 0;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #333333;
    text-align: center;
    line-height: 42px;
    position: relative;
  }

  h2 img{
    height: 28px;
    position: absolute;
    right: 20px;
    top: 7px;
  }

  #index-scroll {
    flex: 1;
    overflow: hidden;
  }

  .title {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: #fff;
  }

  audio{
    padding-left: 10px;
  }

  .title h3 {
    margin: 0;
    font-family: 'PingFangSC-Medium', 'PingFang SC Medium', 'PingFang SC';
    font-weight: 500;
    font-style: normal;
    font-size: 16px;
    color: #333333;
  }

  .title span {
    width: 100px;
    font-family: 'PingFangSC-Medium', 'PingFang SC Medium', 'PingFang SC';
    font-weight: 500;
    font-style: normal;
    color: #FF6600;
    font-size: 14px;
    text-align: right;
  }

  .biaoqian {
    overflow: hidden;
    padding-bottom: 14px;
    background: #fff;
  }

  .biaoqian span {
    float: left;
    margin-left: 10px;
    padding: 2px 4px;
    background: inherit;
    background-color: rgba(255, 204, 0, 0.137254901960784);
    border: none;
    border-radius: 3px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #949494;
    text-align: center;
  }

  .biaoqian i {
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #949494;
    float: right;
    margin-right: 10px;
  }

  h4{
    height: 24px;
    margin: 0;
    display: flex;
    align-items: center;
    padding-left: 10px;
  }

  h4 span{
    padding-left: 4px;
    height: 14px;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    color: #666666;
    font-size: 13px;
    line-height: 14px;
    border-left: 3px solid rgba(255, 204, 0, 1);
  }

  .yaoqiu{
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #000000;
    padding: 12px 0;
    padding-left: 10px;
    background: #fff;
  }

  .company{
    width: 100vw;
    display: flex;
    overflow: hidden;
    background: #fff;
  }

  .companyInfo{
    flex: 1;
  }

  .top{
    display: flex;
    padding: 10px 0 20px;
  }

  .top div p:first-child{
    margin-top: 7px;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 15px;
    color: #363636;
    height: 20px;
    line-height: 20px;
  }

  .top div p:last-child{
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #949494;
    height: 20px;
    line-height: 20px;
  }

  .logo{
    width: 54px;
    height: 54px;
    padding: 0 5px 0 10px;
  }

  .companyPublicity{
    width: 80%;
    margin-left: 20%;
    padding-bottom: 20px;
  }

  .fudai{
    width: 16vw;
    height: 16vw;
    margin-top: 10px;
    margin-right: 10px;
    transform:rotate(-45deg);
  }

  .nfudai{
    width: 16vw;
    height: 16vw;
    margin-top: 30px;
    margin-right: 10px;
    float: right;
    transform:rotate(-45deg);
  }

  .lianxi{
    height: 150px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    padding: 20px 0 30px 10px;
  }

  .erwei{
    display: flex;
    flex-direction: column;
    align-self: center;
  }

  .erwei img{
    width: 132px;
    height: 132px;
  }

  .erwei span{
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    color: #FFCC00;
    height: 18px;
    line-height: 18px;
    font-size: 13px;
  }

  .or{
    width: 54px;
    height: 54px;
  }

  .jianli{
    width: 40vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .jianli a,.jianli span,.lx a,.lx span{
    height: 41px;
    border: 1px solid rgba(255, 204, 0, 1);
    border-radius: 20px;
    text-align: center;
    line-height: 41px;
    font-size: 16px;
    color: #FFCC00;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
  }

  .jianli a,.lx a{
    background: #fff url('../assets/u809.png') no-repeat center left 8px;
    background-size: 17px;
  }

  .toudi{
    background: #fff url('../assets/u815.png')  no-repeat center left 20px;
    background-size: 17px;
  }

  .ytd{
    background: #fff url('../assets/u815_selected.png')  no-repeat center left 20px;
    background-size: 17px;
  }

  .lx{
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
  }

  .lx a,.lx span{
    width: 40vw;
  }

  .buttom{
    height: 30px;
  }
</style>
