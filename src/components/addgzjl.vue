<template>
  <div class="addgzjl">
    <div class="message">
      <div class="name">
        <label for=""><span>*</span>公司名称</label>
        <input type="text" name="" v-model="companyName" placeholder="请输入公司姓名">
      </div>
      <div class="name">
        <label for=""><span>*</span>职位名称</label>
        <input type="text" name="" v-model="jobName" placeholder="请输入职位名称">
      </div>
    </div>
    <div class="times">
      <div class="time" @click="birthDay(1)">
        <label for=""><span>*</span>入职时间</label>
        <i>{{activeYear}}{{monthString}}</i>
      </div>
      <div class="time" @click="birthDay(2)">
        <label for=""><span>*</span>离职时间</label>
        <i>{{endYear}}{{endMonthString}}</i>
      </div>
    </div>
    <div class="gznr">
      <h4>工作内容</h4>
      <textarea v-model="details"></textarea>
    </div>
    <div v-if="this.jobWorkId === 'false'" class="submit" @click="update('add')">保存</div>
    <ul v-else class="edit">
      <li @click="update('edit')">保存</li>
      <li @click="jobWorkDel">删除</li>
    </ul>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import axios from 'axios'
export default {
  name: 'addgzjl',
  data () {
    return {
      id: '',
      companyName: '',
      jobName: '',
      details: '',
      jobWorkId: ''
    }
  },
  mounted: function () {
    this.jobWorkId = this.$route.params.jobWorkId
    if (this.jobWorkId === 'false') {
      this.actionActiveYear('')
      this.actionActiveMonth('')
      this.actionEndYear('')
      this.actionEndMonth('')
    } else {
      this.getJobWorkById()
    }
  },
  computed: {
    ...mapGetters([ // 从store上绑定的getters中载入需要的到此组件中
      'activeYear',
      'endYear'
    ]),
    monthString: function () {
      if (this.$store.state.activeMonth !== '') {
        if (this.$store.state.activeMonth < 10) {
          return '-0' + this.$store.state.activeMonth
        } else {
          return '-' + this.$store.state.activeMonth
        }
      } else {
        return ''
      }
    },
    endMonthString: function () {
      if (this.$store.state.endMonth !== '') {
        if (this.$store.state.endMonth < 10) {
          return '-0' + this.$store.state.endMonth
        } else {
          return '-' + this.$store.state.endMonth
        }
      } else {
        return ''
      }
    }
  },
  methods: {
    ...mapActions([ // 从store上绑定的getters中载入需要的到此组件中
      'actionAlertSelect',
      'actionMobileSelectStatus',
      'actionYears',
      'actionMonths',
      'actionEndYear',
      'actionEndMonth',
      'actionActiveYear',
      'actionActiveMonth',
      'actionEndYear',
      'actionEndMonth'
    ]),
    update: function (status) {
      let _this = this
      let start = this.$store.state.activeYear + ',' + this.$store.state.activeMonth
      let end = this.$store.state.endYear + ',' + this.$store.state.endMonth
      let url
      if (status === 'add') {
        url = 'job/resume/jobWorkAdd'
      } else {
        url = 'job/resume/jobWorkUpdate'
      }
      axios.get(url, {
        params: {
          jobWorkId: _this.id,
          userId: _this.$store.state.userId,
          companyName: _this.companyName,
          jobName: _this.jobName,
          startDate: start,
          endDate: end,
          details: _this.details
        }
      }).then((res) => {
        console.log(res)
        _this.$router.go(-1)
      })
    },
    birthDay: function (status) {
      this.actionMobileSelectStatus(status)
      this.actionAlertSelect()
    },
    getJobWorkById: function () {
      var that = this
      axios.get('job/resume/getJobWorkById', {
        params: {
          jobWorkId: that.$route.params.jobWorkId
        }
      }).then((res) => {
        let data = res.data.data
        console.log(data)
        that.id = data.id
        that.companyName = data.companyName
        that.jobName = data.jobName
        that.details = data.details
        that.actionActiveYear(data.startDate.split(',')[0])
        that.actionActiveMonth(data.startDate.split(',')[1])
        that.actionEndYear(data.endDate.split(',')[0])
        that.actionEndMonth(data.endDate.split(',')[1])
      })
    },
    jobWorkDel: function () {
      var that = this
      axios.get('job/resume/jobWorkDel', {
        params: {
          jobWorkId: that.$route.params.jobWorkId
        }
      }).then((res) => {
        console.log(res)
        that.$router.go(-1)
      })
    }
  }
}
</script>

<style scoped>
  .addgzjl {
    flex: 1;
    background: #f2f2f2;
  }

  .message {
    background: #fff;
    padding-left: 20px;
    margin-top: 20px;
  }

  .times {
    background: #fff;
    padding-left: 20px;
    margin-top: 14px;
  }

  .name,
  .time {
    border-top: 1px solid #f2f2f2;
    height: 35px;
    line-height: 35px;
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
  }

  .name span,
  .time span {
    color: red;
    padding-right: 6px;
  }

  .name input {
    flex: 1;
    text-align: right;
    border: 0;
  }

  .time i {
    background: url('../assets/u1179.png') no-repeat center right;
    background-size: 7px 12px;
    padding-right: 15px;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    color: #333333;
    text-align: right;
    font-size: 14px;
    line-height: 35px;
  }

  .gznr {
    margin-top: 14px;
    padding: 0 20px;
    background: #fff;
  }

  .gznr h4 {
    margin: 0;
    height: 30px;
    line-height: 30px;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    text-align: left;
    color: #333333;
  }

  .gznr textarea {
    width: 100%;
    color: rgb(153, 153, 153);
    height: 147px;
    background-color: #F2F2F2;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    text-decoration: none;
    text-align: left;
    border: 0;
    margin-bottom: 30px;
  }

  .submit {
    width: 90vw;
    height: 40px;
    background-color: rgba(255, 204, 0, 1);
    border-radius: 20px;
    font-size: 16px;
    color: #666666;
    line-height: 40px;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    text-align: center;
    margin: 26px auto 0;
  }

  .edit{
    display: flex;
    justify-content: space-around;
    margin-top: 28px;
  }

  .edit li:first-child{
    font-size: 14px;
    color: #666666;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    height: 40px;
    line-height: 40px;
    width: 50vw;
    background: rgba(255, 204, 0, 0.776470588235294);
    border-radius: 20px;
    text-align: center;
  }

  .edit li:last-child{
    height: 40px;
    background-color: red;
    border-radius: 20px;
    font-size: 14px;
    color: #FFFFFF;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    text-align: center;
    width: 40vw;
    line-height: 40px;
  }
</style>
