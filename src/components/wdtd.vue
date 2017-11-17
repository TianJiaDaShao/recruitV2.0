<template>
  <div class="wdtd">
    <ul class="nav">
      <li :id="active === 'all' ? 'active' : ''" @click="change('all')">全部</li>
      <li :id="active === 0 ? 'active' : ''" @click="change(0)">待审核</li>
      <li :id="active === 1 ? 'active' : ''" @click="change(1)">已通过</li>
      <li :id="active === -1 ? 'active' : ''" @click="change(-1)">不合适</li>
    </ul>
    <section id="index-scroll" ref="wrapper">
        <ul>
            <li v-for="job in jobs" v-show="job.dResult == dsh||job.dResult == ytg||job.dResult == bhs" class="job">
                <div class="title">
                    <h2>{{job.title}}</h2>
                    <span>{{job.jobSalaryName}}</span>
                </div>
                <div class="biaoqian">
                    <span>{{job.cityName}}</span>
                    <span>{{job.jobTypeName}}</span>
                    <i>{{job.createDate}}</i>
                </div>
                <div class="status">
                  <div class="company">
                    <img v-if="job.companyName !== null && job.companyName !== ''" :src="job.companyLogo" alt="">
                    <span v-if="job.companyName !== null && job.companyName !== ''">{{job.companyName}}</span>
                  </div>
                  <h6 v-if="job.dResult == 0" class="dsh">待审核</h6>
                  <h6 v-if="job.dResult == 1" class="ytg">已通过</h6>
                  <h6 v-if="job.dResult == -1" class="bhs">不合适</h6>
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
  export default {
    name: 'wdtd',
    data () {
      return {
        jobs: '',
        active: 'all',
        dsh: 0,
        ytg: 1,
        bhs: -1
      }
    },
    mounted: function () {
      this.mySendCVList()
    },
    methods: {
      mySendCVList: function () {
        var that = this
        axios.get('job/resume/mySendCVList', {
          params: {
            userId: that.$store.state.userId
          }
        }).then((res) => {
          console.log(res.data.data.userDeliveries)
          that.jobs = res.data.data.userDeliveries
          Vue.nextTick(() => {
            that.wrapper = new BScroll(that.$refs.wrapper, {
              click: true
            })
          })
        })
      },
      change: function (index) {
        this.active = index
        switch (index) {
          case 'all':
            this.dsh = 0
            this.ytg = 1
            this.bhs = -1
            break
          case 0:
            this.dsh = 0
            this.ytg = null
            this.bhs = null
            break
          case 1:
            this.dsh = null
            this.ytg = 1
            this.bhs = null
            break
          case -1:
            this.dsh = null
            this.ytg = null
            this.bhs = -1
            break
          default:
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wdtd {
    flex: 1;
    background: #f2f2f2;
    display: flex;
    flex-direction: column;
  }

  .nav {
    display: flex;
    justify-content: space-around;
    background: #fff;
  }

  .nav li {
    height: 30px;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #333333;
    text-align: center;
    line-height: 30px;
  }

  #active {
    color: rgb(255, 204, 0);
    border-bottom: 2px solid rgb(255, 204, 0);
  }

  #index-scroll {
    flex: 1;
    overflow: hidden;
  }

  .job {
    background: #fff;
    width: 96vw;
    margin: 0 auto;
    margin-top: 10px;
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

  .status{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }

  .status h6{
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    text-align: right;
    margin: 0;
  }

  .dsh{
    color: #FFCC33;
  }

  .ytg{
    color: #00CC00;
  }

  .bhs{
    color: #FF0000;
  }
</style>
