<template>
  <div class="wdsc">
    <h2>我的收藏</h2>
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
                <div class="caozuo">
                    <div class="shoucang" v-if="job.cId === null" @click="collection(job, 1)"><img src="../assets/u70.png" alt=""><span>收藏</span></div>
                    <div class="qxsc" v-else @click="collection(job, 0)"><img src="../assets/u70_selected.png" alt=""><span>已收藏</span></div>
                    <div class="jianli"><img src="../assets/u76.png" alt=""><span>投递简历</span></div>
                    <div class="tel"><img src="../assets/u82.png" alt=""><a :href="telNum(job.tel)">{{job.tel}}</a></div>
                    <div class="fenxiang"><img src="../assets/u89.png" alt=""><span>分享</span></div>
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
    name: 'index',
    data () {
      return {
        jobs: ''
      }
    },
    mounted: function () {
      this.jobList()
    },
    methods: {
      jobList: function () {
        var that = this
        axios.get('job/user/myCollection', {
          params: {
            userId: that.$store.state.userId
          }
        }).then((res) => {
          var data = res.data.data
          that.jobs = data
          Vue.nextTick(() => {
            that.wrapper = new BScroll(that.$refs.wrapper, {
              click: true
            })
          })
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wdsc {
    flex: 1;
    background: #f2f2f2;
    display: flex;
    flex-direction: column;
  }

  h2 {
    height: 42px;
    line-height: 42px;
    text-align: center;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #333333;
    background: #fff;
    margin: 0;
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
  .tel img,
  .fenxiang img,
  .qxsc img {
    width: 20px;
  }

  .shoucang span,
  .jianli span,
  .tel a,
  .fenxiang span {
    padding-left: 6px;
  }

  .jianli {
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
