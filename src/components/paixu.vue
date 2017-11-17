<template>
  <div class="paixu">
    <ul class="nav">
      <li @click="alertCity">
        <span :class="selectCity">{{activeCity}}</span>
        <img v-show="!cityChoice" src="../assets/u681.png" alt="">
        <img v-show="cityChoice" src="../assets/u681_selected.png" alt="">
      </li>
      <li @click="alertType">
        <span :class="selectType">{{activeType}}</span>
        <img v-show="!typeChoice" src="../assets/u681.png" alt="">
        <img v-show="typeChoice" src="../assets/u681_selected.png" alt="">
      </li>
      <li><span>最新发布</span></li>
    </ul>
    <ul class="cityNav" v-show="cityChoice">
      <li @click="changeCity($event)" v-for="city in citys">{{city.name}}</li>
    </ul>
    <ul class="typeNav" v-show="typeChoice">
      <li v-for="type in jobType" @click="changeTpye($event)">{{type.code}}</li>
    </ul>
    <section id="index-scroll" ref="wrapper">
        <ul>
            <li v-for="job in jobs" class="job">
                <div class="title">
                    <h2>{{job.title}}</h2>
                    <span>{{job.jobSalaryName}}</span>
                </div>
                <div class="biaoqian">
                    <span>{{job.cityName}}</span>
                    <span>{{job.jobTypeName}}</span>
                    <i>{{job.createDate}}</i>
                </div>
                <div class="detail">
                  <span v-if="sound(job.details)">{{job.details}}</span>
                  <audio v-else :src="job.details" controls="controls"></audio>
                </div>
                <div class="company" v-if="job.companyName !== null && job.companyName !== ''">
                  <img :src="job.companyLogo" alt="">
                  <span>{{job.companyName}}</span>
                </div>
                <div class="caozuo">
                    <div class="shoucang" v-if="job.cId == null" @click="collection(job, 1)"><img src="../assets/u70.png" alt=""><span>收藏</span></div>
                    <div class="qxsc" v-else @click="collection(job, 0)"><img src="../assets/u70_selected.png" alt=""><span>已收藏</span></div>
                    <div class="jianli" v-if="job.dResult === null" @click="sendCV(job)"><img src="../assets/u76.png" alt=""><span>投递简历</span></div>
                    <div class="ytd" v-else><img src="../assets/u76_selected.png" alt=""><span>已投递</span></div>
                    <div class="tel"><img src="../assets/u82.png" alt=""><a :href="telNum(job.tel)">{{job.tel}}</a></div>
                    <div class="fenxiang" @click="goDetails(job)"><img src="../assets/u89.png" alt=""><span>分享</span></div>
                </div>
            </li>
        </ul>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import {
    mapActions
  }
  from 'vuex'
  export default {
    name: 'paixu',
    data () {
      return {
        citys: '',
        jobType: '',
        activeCity: '',
        activeType: '',
        jobs: '',
        cityChoice: false,
        typeChoice: false
      }
    },
    mounted: function () {
      this.activeCity = this.$route.params.city
      this.activeType = this.$route.params.type
      this.jobInfoConfig()
    },
    computed: {
      selectCity: function () {
        if (this.cityChoice === true) {
          return 'active'
        }
      },
      selectType: function () {
        if (this.typeChoice === true) {
          return 'active'
        }
      }
    },
    methods: {
      ...mapActions([
        'actionAlert'
      ]),
      jobInfoConfig: function () {
        var that = this
        axios.get('job/info/jobInfoConfig', {
          params: {
            countriesId: that.$store.state.country
          }
        }).then((res) => {
          var data = res.data.data
          that.citys = data.cityList
          that.jobType = data.jobType
          that.jobList()
        })
      },
      jobList: function () {
        var that = this
        axios.get('job/info/searchJobInfo', {
          params: {
            countriesId: that.$store.state.country,
            userId: that.$store.state.userId,
            cityName: that.activeCity,
            jobType: that.activeType,
            pageNumber: 1,
            pageSize: 10000
          }
        }).then((res) => {
          var data = res.data.data.map.list
          that.jobs = data
          console.log(res)
          Vue.nextTick(() => {
            that.wrapper = new BScroll(that.$refs.wrapper, {
              click: true
            })
          })
        })
      },
      telNum: function (phoneNum) {
        if (typeof phoneNum !== 'undefined') {
          return 'tel:' + phoneNum
        } else {
          return ''
        }
      },
      alertCity: function () {
        this.cityChoice = !this.cityChoice
        this.actionAlert()
      },
      changeCity: function (e) {
        this.activeCity = e.target.innerText
        this.jobList()
        this.alertCity()
      },
      alertType: function () {
        this.typeChoice = !this.typeChoice
        this.actionAlert()
      },
      changeTpye: function (e) {
        this.activeType = e.target.innerText
        this.jobList()
        this.alertType()
      },
      sound: function (details) {
        if (details !== '' && details !== null) {
          if (details.slice(-4) !== '.mp3') {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      }
    }
  }
</script>

<style scoped>
  .paixu {
    flex: 1;
    background: #fafafa;
    display: flex;
    flex-direction: column;
  }

  .nav {
    display: flex;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #333333;
    text-align: center;
    border-bottom: 1px solid #e4e4e4;
    background: #fff;
    position: relative;
    z-index: 1000;
  }

  .nav li {
    height: 32px;
    line-height: 32px;
    flex: 1;
    border-right: 1px solid #e4e4e4;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav img{
    width: 18px;
    height: 18px;
  }

  .nav li:last-child{
    border: 0;
  }

  .cityNav,.typeNav {
    position: absolute;
    z-index: 1000;
    background: #fff;
    top:33px;
    width: 100%;
    text-align: center;
  }

  .cityNav li,.typeNav li{
    height: 32px;
    border-bottom: 1px solid #e4e4e4;
    font-size: 14px;
    color: #1E1E1E;
    line-height: 32px;
  }

  .active{
    color: rgb(255, 204, 0);
  }

  #index-scroll {
    flex: 1;
    overflow: hidden;
    padding-top: 12px;
  }

  .job {
    background: #fff;
    width: 96vw;
    margin: 0 auto;
    margin-bottom: 16px;
    border-radius: 5px;
  }

  .title {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }

  .title h2 {
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
    margin-bottom: 8px;
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

  .detail{
    padding: 0 10px;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #000000;
    line-height: 22px;
  }

  .company{
    display: flex;
  }

  .company img{
    width: 46px;
    height: 46px;
    padding: 4px 10px;
  }

  .company span{
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    color: #363636;
    font-size: 14px;
    text-align: left;
    line-height: 54px;
    height: 54px;
  }

  .caozuo {
    display: flex;
    padding: 6px 0;
    background: #fff8dc;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #333333;
    text-align: center;
  }

  .shoucang,
  .jianli,
  .ytd,
  .tel,
  .fenxiang,
  .qxsc {
    height: 20px;
    line-height: 20px;
    border-right: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .shoucang,
  .qxsc {
    flex: 1;
  }

  .shoucang img,
  .jianli img,
  .ytd img,
  .tel img,
  .fenxiang img,
  .qxsc img {
    width: 20px;
  }

  .shoucang span,
  .jianli span,
  .ytd span,
  .tel a,
  .fenxiang span {
    padding-left: 6px;
  }

  .jianli,.ytd {
    flex: 1.5;
  }

  .tel {
    flex: 2;
  }

  .tel a {
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #333333;
    text-align: center;
    line-height: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .fenxiang {
    flex: 1;
    border: 0;
  }
</style>
