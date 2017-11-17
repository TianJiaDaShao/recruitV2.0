<template>
  <div class="gzjl">
    <div class="add" @click="addgzjl"><span>+</span><i>添加工作经验</i></div>
    <ul>
      <li v-for="jobWork in jobWorks" @click="editgzjl(jobWork.id)">
        <div class="day">
          {{jobWork.startDate.split(',')[1] < 10 ? jobWork.startDate.split(',').join('/0') : jobWork.startDate.split(',').join('/')}}-{{jobWork.endDate.split(',')[1] < 10 ? jobWork.endDate.split(',').join('/0') : jobWork.endDate.split(',').join('/')}}
        </div>
        <div class="company">
          {{jobWork.jobName}}/{{jobWork.companyName}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'gzjl',
    data () {
      return {
        jobWorks: ''
      }
    },
    mounted: function () {
      this.jobWorkInfo()
    },
    methods: {
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
      addgzjl: function () {
        this.$router.push({
          name: 'addgzjl',
          params: {
            jobWorkId: 'false'
          }
        })
      },
      editgzjl: function (jobWorkId) {
        this.$router.push({
          name: 'addgzjl',
          params: {
            jobWorkId: jobWorkId
          }
        })
      }
    }
  }
</script>

<style scoped>
  .gzjl {
    flex: 1;
    background: #f2f2f2;
  }

  li{
    margin-top: 8px;
    padding-left: 12px;
    background: #fff url('../assets/u1179.png') no-repeat center right 10px;
    background-size: 10px 17px;
  }

  .add {
    height: 42px;
    background: #fff;
    border-bottom: 1px solid #d7d7d7;
    display: flex;
    justify-content: center;
  }

  .add span {
    font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
    font-weight: 650;
    font-style: normal;
    font-size: 28px;
    text-align: center;
  }

  .add i {
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    line-height: 46px;
  }

  .day{
    font-size: 13px;
    color: #999999;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    height: 28px;
    line-height: 28px;
  }

  .company{
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    color: #000000;
    font-size: 14px;
    height: 35px;
    line-height: 35px;
  }
</style>
