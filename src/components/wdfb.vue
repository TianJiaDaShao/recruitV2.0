<template>
  <div class="wdfb">
    <h2>我的发布</h2>
    <section id="index-scroll" ref="wrapper">
        <ul>
            <li v-for="job in jobs" class="job">
                <div class="title">
                    <h3>{{job.title}}</h3>
                    <span>{{job.jobSalaryName}}</span>
                </div>
                <div class="biaoqian">
                    <span>{{job.cityName}}</span>
                    <span>{{job.jobTypeName}}</span>
                    <i>{{job.createDate}}</i>
                </div>
                <ul class="caozuo">
                  <li @click="ding(job.id)"><img src="../assets/u2210.png" alt="">顶</li>
                  <li @click="changeJob(job)" v-if="job.status === '0'"><img src="../assets/u2212.png" alt="">关闭</li>
                  <li @click="changeJob(job)" v-else><img src="../assets/u2259_selected.png" alt="">已关闭</li>
                  <li @click="recruit(job.id)"><img src="../assets/u2214.png" alt="">编辑</li>
                </ul>
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
    name: 'wdfb',
    data () {
      return {
        jobs: ''
      }
    },
    mounted: function () {
      this.mylist()
    },
    methods: {
      mylist: function () {
        var _this = this
        axios.get('job/user/myPublish', {
          params: {
            userId: _this.$store.state.userId
          }
        }).then((res) => {
          console.log(res)
          var data = res.data.data.jobList
          _this.jobs = data
          Vue.nextTick(() => {
            _this.wrapper = new BScroll(_this.$refs.wrapper, {
              click: true
            })
          })
        })
      },
      ding: function (jobId) {
        var that = this
        axios.get('job/user/updateUpdateDate', {
          params: {
            jobId: jobId
          }
        }).then((res) => {
          console.log(res)
          that.mylist()
        })
      },
      recruit: function (jobId) {
        this.$router.push({
          name: 'recruit',
          params: {
            jobId: jobId
          }
        })
      },
      changeJob: function (job) {
        axios.get('job/user/changeJob', {
          params: {
            jobId: job.id,
            userStatus: job.status
          }
        }).then((res) => {
          if (job.status === '0') {
            job.status = '1'
          } else {
            job.status = '0'
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wdfb {
    flex: 1;
    background: #f2f2f2;
    display: flex;
    flex-direction: column;
  }

  h2 {
    height: 42px;
    background-color: rgba(255, 255, 255, 1);
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    text-align: center;
    line-height: 42px;
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
    margin-top: 12px;
    border-radius: 5px;
  }

  .title {
    display: flex;
    justify-content: space-between;
    padding: 10px;
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
    padding-bottom: 20px;
    border-bottom: 1px solid #f2f2f2;
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

  .caozuo{
    height: 40px;
    background: #fff;
    display: flex;
    align-items: center;
  }

  .caozuo li{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #333333;
    text-align: center;
    line-height: 24px;
    border-right: 1px solid #f2f2f2;
  }

  .caozuo li:last-child{
    border: 0;
  }

  .caozuo li img{
    width: 22px;
  }
</style>
