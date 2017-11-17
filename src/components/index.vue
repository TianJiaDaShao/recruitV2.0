<style scoped>
  .index {
    flex: 1;
    background-color: rgba(242, 242, 242, 1);
    display: flex;
    flex-direction: column;
  }

  #countryList {
    position: fixed;
    z-index: 1000;
    bottom: 0;
    left: 3vw;
    text-align: center;
    margin-bottom: 18px;
  }

  #countryList li {
    width: 94vw;
    height: 35px;
    font-size: 14px;
    color: #1E1E1E;
    line-height: 35px;
    border-bottom: 1px solid rgba(242, 242, 242, 1);
    background: #fff;
  }

  .remove {
    font-size: 13px;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    color: #999999;
    height: 31px;
    line-height: 31px;
    margin-top: 8px;
    background: #fff;
  }

  #index-scroll {
    flex: 1;
    overflow: hidden;
  }

  .banner {
    width: 100%;
  }

  .search {
    display: flex;
    height: 25px;
    position: absolute;
    top: 10px;
  }

  .country {
    font-size: 14px;
    text-align: left;
    color: #FFFFFF;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    display: flex;
  }

  .country img {
    height: 20px;
    padding: 2px 6px;
  }

  .country span {
    background: url('../assets/u15.png') no-repeat center right;
    padding-right: 14px;
    margin-right: 10px;
    line-height: 25px;
  }

  .searchInput {
    background: #fff url('../assets/u12.png') no-repeat 24px center;
    background-size: 20px;
    width: 50vw;
    border-radius: 25px;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    text-decoration: none;
    color: #000000;
    text-align: center;
    line-height: 25px;
  }

  .wordAD {
    height: 30px;
    line-height: 30px;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #333333;
    text-align: center;
  }

  .nav {
    height: 50px;
    display: flex;
    justify-content: center;
  }

  .nav span {
    display: inline-block;
    width: 46vw;
    height: 30px;
    background: #fff;
    line-height: 30px;
    margin-top: 10px;
    box-shadow: none;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #333333;
    text-align: center;
  }

  .nav .active {
    background-color: rgba(255, 204, 0, 0.6);
  }

  .job {
    background-color: rgba(255, 255, 255, 1);
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

<template>

<div class="index">
    <img class="banner" src="../assets/u2.png" alt="">
    <div class="search">
        <div class="country" @click="actionAlert">
            <img v-if="country === 1" src="../assets/Spain.png" alt="">
            <img v-if="country === 2" src="../assets/Portuguesa.png" alt="">
            <img v-if="country === 3" src="../assets/French.png" alt="">
            <img v-if="country === 4" src="../assets/Italy.png" alt="">
            <img v-if="country === 5" src="../assets/England.png" alt="">
            <span>{{countryName}}</span>
        </div>
        <div class="searchInput" @click="search">
            搜索好公司/工作
        </div>
    </div>
    <div class="wordAD" v-if="interested === ''">
        ——为您推荐好职位——
    </div>
    <div class="nav" v-else>
        <span @click="like(0)" :class="!youLike ? 'active' : ''">最新职位</span>
        <span @click="like(1)" :class="youLike ? 'active' : ''">猜你喜欢</span>
    </div>
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
                    <div class="fenxiang" @click="goDetails(job.id)"><img src="../assets/u89.png" alt=""><span>分享</span></div>
                </div>
            </li>
        </ul>
    </section>
    <div id="countryList" v-if="alert">
        <ul>
            <li @click="changeCountry(1)">西班牙</li>
            <li @click="changeCountry(2)">葡萄牙</li>
            <li @click="changeCountry(3)">法国</li>
            <li @click="changeCountry(4)">意大利</li>
            <li @click="changeCountry(5)">英国</li>
        </ul>
        <div class="remove" @click="actionAlert">取消</div>
    </div>
</div>

</template>

<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import {
    mapGetters,
    mapActions
  }
  from 'vuex'
  export default {
    name: 'index',
    data () {
      return {
        youLike: false,
        jobs: ''
      }
    },
    mounted: function () {
      this.jobList()
    },
    watch: {
      countryId: function () {
        this.jobList()
      }
    },
    computed: {
      ...mapGetters([ // 从store上绑定的getters中载入需要的到此组件中
        'alert',
        'country',
        'interested'
      ]),
      countryName: function () {
        switch (this.$store.state.country) {
          case 1:
            return '西班牙'
          case 2:
            return '葡萄牙'
          case 3:
            return '法国'
          case 4:
            return '意大利'
          case 5:
            return '英国'
          default:
        }
      },
      countryId: function () {
        return this.$store.state.country
      }
    },
    methods: {
      ...mapActions([
        'actionCountry',
        'actionAlert',
        'actionCVCount'
      ]),
      search: function () {
        this.$router.push({
          name: 'search'
        })
      },
      jobList: function () {
        var that = this
        axios.get('job/info/searchJobInfo', {
          params: {
            countriesId: that.$store.state.country,
            userId: that.$store.state.userId,
            pageNumber: 1,
            pageSize: 10000
          }
        }).then((res) => {
          var data = res.data.data
          that.actionCVCount(data.CVCount)
          that.jobs = data.map.list
          Vue.nextTick(() => {
            that.wrapper = new BScroll(that.$refs.wrapper, {
              click: true
            })
          })
        })
      },
      changeCountry: function (id) {
        var _this = this
        this.actionCountry(id)
        axios.get('job/user/getUserInfoByUserId', {
          params: {
            userId: _this.$store.state.userId,
            countriesId: _this.$store.state.country
          }
        })
      },
      telNum: (phoneNum) => {
        if (typeof phoneNum !== 'undefined') {
          return 'tel:' + phoneNum
        } else {
          return ''
        }
      },
      collection: function (job, status) {
        var that = this
        axios.get('job/user/saveCollection', {
          params: {
            userId: that.$store.state.userId,
            title: job.title,
            jobId: job.id,
            status: status
          }
        }).then((res) => {
          if (status === 1) {
            job.cId = ''
          } else {
            job.cId = null
          }
        })
      },
      sendCV: function (job) {
        var that = this
        axios.get('job/resume/sendCV', {
          params: {
            userId: that.$store.state.userId,
            jobName: job.title,
            jobId: job.id,
            userName: that.$store.state.userName
          }
        }).then((res) => {
          job.dResult = ''
        })
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
      },
      goDetails: function (jobId) {
        this.$router.push({
          name: 'details',
          params: {
            job: jobId
          }
        })
      },
      like: function (status) {
        if (status === 0) {
          this.jobList()
          this.youLike = false
        } else {
          var that = this
          that.youLike = true
          axios.get('job/info/jobInfoInterested', {
            params: {
              userId: that.$store.state.userId
            }
          }).then((res) => {
            var data = res.data.data.jobInfos
            that.jobs = data
            console.log(data)
            Vue.nextTick(() => {
              that.wrapper = new BScroll(that.$refs.wrapper, {
                click: true
              })
            })
          })
        }
      }
    }
  }
</script>
