<template>
  <div class="wsddjl">
    <section id="index-scroll" ref="wrapper">
        <ul>
          <li v-for="job in jobs" class="job" @click="jlxq(job)">
            <div class="left">
              <img :src="job.uHead" alt="">
              <div class="CVCount" v-if="job.status === 0"></div>
              <div class="info">
                <span class="userName">{{job.userName}}</span>
                <span class="jobName">应聘职位：{{job.jobName}}</span>
              </div>
            </div>
            <span class="time">{{job.createDate.split(' ')[0]}}</span>
          </li>
        </ul>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    mapActions
  }
  from 'vuex'
  export default {
    name: 'wsddjl',
    data () {
      return {
        jobs: ''
      }
    },
    mounted: function () {
      this.CVlist()
    },
    methods: {
      ...mapActions([
        'actionCVCount'
      ]),
      CVlist: function () {
        var _this = this
        axios.get('job/resume/userReceivedCV', {
          params: {
            userId: _this.$store.state.userId
          }
        }).then((res) => {
          var data = res.data.data.userDeliveries
          console.log(res)
          _this.jobs = data
        })
      },
      jlxq: function (job) {
        if (job.status === 0) {
          this.$store.state.CVCount--
        }
        this.$router.push({
          name: 'jlxq',
          params: {
            id: job.id,
            userId: job.userId,
            jobId: job.jobId,
            jobName: job.jobName,
            result: job.result
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wsddjl {
    flex: 1;
    background: #f2f2f2;
    padding-top: 12px;
    display: flex;
    flex-direction: column;
  }

  .job {
    height: 65px;
    background: #fff;
    margin-bottom: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left{
    display: flex;
    height: 100%;
    align-items: center;
    position: relative;
  }

  .left img{
    width: 44px;
    height: 44px;
    border-radius: 100%;
    margin: 0 10px;
  }

  .CVCount{
    width: 9px;
    height: 9px;
    background: red;
    border-radius: 100%;
    position: absolute;
    left: 46px;
    top: 12px;
  }

  .info{
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .userName{
    font-size: 16px;
    margin-top: 14px;
    margin-bottom: 14px;
    height: 16px;
    line-height: 16px;
  }

  .jobName{
    font-size: 13px;
    color: #999;
    height: 13px;
    line-height: 13px;
  }

  .time {
    font-size: 14px;
    color: #949494;
    padding-right: 30px;
    background: url('../assets/u1179.png') no-repeat center right 10px;
    background-size: 8px 14px;
  }
</style>
