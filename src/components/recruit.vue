<template>
  <div class="recruit">
    <div class="myRecruit" @click="wdfb"></div>
    <div class="country">
      <span>国家</span>
      <div  @click="actionAlert">
        <i>{{countryName}}</i>
        <img src="../assets/u1052.png" alt="">
      </div>
    </div>
    <section id="index-scroll" ref="wrapper">
      <div>
        <div class="title">
          <label for="">标题</label>
          <div class="input">
            <input type="text" name="" v-model="title" placeholder="请输入标题">
            <span>*</span>
          </div>
        </div>
        <div class="title">
          <label for="">电话</label>
          <div class="input">
            <input type="text" name="" v-model="tel" placeholder="请输入电话号码">
            <span>*</span>
          </div>
        </div>
        <h2>所在城市</h2>
        <div class="city">
          <span v-for="city in citys" :id="(activeCity === city.name) ? 'active' : ''" @click="cityActive($event)">{{city.name}}</span>
        </div>
        <h2>工作种类(可多选)</h2>
        <div class="jobType" ref="jobTypeSpan">
          <span v-for="type in jobType" @click="typeActive($event)">{{type.code}}</span>
        </div>
        <h2>薪资区间</h2>
        <div class="jobSalary">
          <span v-for="salary in jobSalary" :id="(activeSalary === salary.code) ? 'active' : ''" @click="salaryActive($event)">{{salary.code}}</span>
        </div>
        <div class="detail" v-if="detailStatus">
          <h3>职位描述<span @click="changeDetailStatus">打字输入</span></h3>
          <audio v-if="sound !== ''" :src="sound" controls="controls"></audio>
          <div class="vedio" @touchstart="begin" @touchend="end">
            <span v-if="sound === ''">按住录制语音描述</span>
            <span v-else>按住重新录制</span>
          </div>
        </div>
        <div class="detail" v-else>
          <h3>职位描述<span @click="changeDetailStatus">语音输入</span></h3>
          <textarea name="name" v-model="details" placeholder="请输入职位相关描述"></textarea>
        </div>
        <div class="AD">
          <span>发布时是否加上公司宣传广告：</span>
          <input type="radio" value="加" name="u1072" v-model="ad">加
          <input type="radio" value="不加" name="u1072" v-model="ad">不加
        </div>
        <div class="btn" @click="submit">
          发布职位
        </div>
        <div class="buttom"></div>
      </div>
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
  import wx from 'weixin-js-sdk'
  import {
    mapGetters,
    mapActions
  }
  from 'vuex'
  export default {
    name: 'recruit',
    data () {
      return {
        id: null,
        citys: '',
        jobType: '',
        jobSalary: '',
        activeCity: '',
        activeType: [],
        activeSalary: '',
        sound: '',
        ad: '',
        title: '',
        tel: '',
        details: '',
        detailStatus: true
      }
    },
    computed: {
      ...mapGetters([ // 从store上绑定的getters中载入需要的到此组件中
        'alert',
        'country'
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
      }
    },
    mounted: function () {
      this.jobInfoConfig()
    },
    methods: {
      ...mapActions([
        'actionCountry',
        'actionAlert'
      ]),
      jobInfoConfig: function () {
        var that = this
        axios.get('job/info/jobInfoConfig', {
          params: {
            countriesId: that.$store.state.country
          }
        }).then(function (res) {
          var data = res.data.data
          that.citys = data.cityList
          that.jobType = data.jobType
          that.jobSalary = data.jobSalary
          if (that.$route.params.jobId !== 'false') {
            that.jobDetail()
          }
          Vue.nextTick(() => {
            that.wrapper = new BScroll(that.$refs.wrapper, {
              click: true
            })
          })
        })
      },
      jobDetail: function () {
        var that = this
        axios.get('job/info/jobInfoDetails', {
          params: {
            jobId: that.$route.params.jobId,
            userId: that.$store.state.userId
          }
        }).then(function (res) {
          var data = res.data.data
          console.log(data)
          that.title = data.title
          that.tel = data.tel
          that.activeCity = data.cityName
          that.activeSalary = data.jobSalaryName
          if (data.details.slice(-4) === '.mp3') {
            that.sound = data.details
            that.detailStatus = true
          } else {
            that.details = data.details
            that.detailStatus = false
          }
          if (data.jobTypeName !== null) {
            that.activeType = data.jobTypeName.split(',')
            var childrens = that.$refs.jobTypeSpan.children
            for (var i = 0; i < childrens.length; i++) {
              for (var j = 0; j < that.activeType.length; j++) {
                if (childrens[i].innerText === that.activeType[j]) {
                  childrens[i].id = 'active'
                }
              }
            }
          }
          if (data.companyName !== null) {
            that.ad = '加'
          } else {
            that.ad = '不加'
          }
        })
      },
      cityActive: function (e) {
        if (this.activeCity !== e.target.innerText) {
          this.activeCity = e.target.innerText
        } else {
          this.activeCity = ''
        }
      },
      salaryActive: function (e) {
        if (this.activeSalary !== e.target.innerText) {
          this.activeSalary = e.target.innerText
        } else {
          this.activeSalary = ''
        }
      },
      typeActive: function (e) {
        if (e.target.id === '') {
          e.target.id = 'active'
          this.activeType.push(e.target.innerText)
        } else {
          e.target.id = ''
          var type = []
          for (var i = 0; i < this.activeType.length; i++) {
            if (this.activeType[i] !== e.target.innerText) {
              type.push(this.activeType[i])
            }
          }
          this.activeType = type
        }
      },
      changeDetailStatus: function () {
        this.detailStatus = !this.detailStatus
      },
      begin: function () {
        wx.startRecord()
      },
      end: function () {
        var that = this
        wx.stopRecord({
          success: function (res) {
            wx.uploadVoice({
              localId: res.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function (res) {
                axios.get('job/index/uploadVoice', {
                  params: {
                    mediaId: res.serverId
                  }
                }).then(function (res) {
                  that.sound = res.data.urlPath + '.mp3'
                })
              }
            })
          }
        })
      },
      changeCountry: function (id) {
        this.actionCountry(id)
        this.jobInfoConfig()
      },
      submit: function () {
        var that = this
        var type = this.activeType.join(',')
        let detail
        if (this.detailStatus === true) {
          detail = this.sound
        } else {
          detail = this.details
        }
        if (this.ad === '加') {
          axios.get('job/user/findCompanyByUserId', {
            params: {
              userId: that.$store.state.userId
            }
          }).then((res) => {
            var data = res.data.data
            axios.get('job/info/publishJob', {
              params: {
                id: that.id,
                userId: that.$store.state.userId,
                cityName: that.activeCity,
                companyName: data.name,
                companyLogo: data.logo,
                companyPublicity: data.publicity,
                companyQRCode: data.QRCode,
                companyInfo: data.info,
                jobType: type,
                jobSalary: that.activeSalary,
                title: that.title,
                tel: that.tel,
                details: detail
              }
            }).then(function (res) {
              // alert('success!')
              console.log(res)
              that.$router.push({
                name: 'index'
              })
            })
          })
        } else {
          axios.get('job/info/publishJob', {
            params: {
              id: that.id,
              userId: that.$store.state.userId,
              cityName: that.activeCity,
              jobType: type,
              jobSalary: that.activeSalary,
              title: that.title,
              tel: that.tel,
              details: detail
            }
          }).then(function (res) {
            // alert('success!')
            console.log(res)
            that.$router.push({
              name: 'index'
            })
          })
        }
      },
      wdfb: function () {
        this.$router.push({
          name: 'wdfb'
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .recruit {
    flex: 1;
    background: #fafafa;
    display: flex;
    flex-direction: column;
  }

  #index-scroll {
    flex: 1;
    overflow: hidden;
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

  #active{
    background-color: rgba(255, 204, 0, 0.317647058823529);
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

  .myRecruit{
    background: url('../assets/u1138.png');
    background-size: 53px;
    width: 53px;
    height: 53px;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1;
  }

  .country {
    height: 33px;
    background-color: rgba(255, 204, 0, 0.466666666666667);
    display: flex;
  }

  .country span {
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    text-align: center;
    width: 80px;
    border-right: 1px solid #000;
    height: 17px;
    margin-top: 8px;
    line-height: 17px;
  }

  .country div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 17px;
    margin-top: 8px;
    line-height: 17px;
  }

  .country i {
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #333333;
    text-align: center;
  }

  .country img {
    width: 15px;
    height: 8px;
    padding-left: 15px;
  }

  .title {
    display: flex;
    height: 33px;
    background: #fff;
    margin-top: 10px;
  }

  .title label {
    width: 64px;
    color: #333333;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    text-align: left;
    height: 18px;
    margin-top: 7px;
    padding-left: 16px;
    border-right: 1px solid #eee;
  }

  .input {
    padding-left: 10px;
    flex: 1;
    position: relative;
  }

  .input input {
    height: 33px;
    border: 0;
    width: 100%;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    text-decoration: none;
  }

  .input span {
    position: absolute;
    top: 9px;
    color: #FF0000;
    font-size: 14px;
    right: 20px;
  }

  h2 {
    height: 24px;
    line-height: 24px;
    padding-left: 10px;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #666666;
    margin: 0;
  }

  .city,
  .jobType,
  .jobSalary {
    padding-top: 10px;
    display: flex;
    flex-wrap: wrap;
    background: #fff;
  }

  .city span,
  .jobType span,
  .jobSalary span {
    margin-left: 14px;
    margin-bottom: 10px;
    padding: 0 14px;
    height: 32px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(228, 228, 228, 1);
    border-radius: 20px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    color: #666666;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    text-align: center;
    line-height: 32px;
  }

  .detail {
    background: #fff;
    height: 190px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
  }

  .detail h3 {
    height: 22px;
    padding: 12px 0;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    text-align: left;
    color: #333333;
    line-height: 22px;
    padding-left: 10px;
    margin: 0;
  }

  .detail h3 span {
    height: 22px;
    display: inline-block;
    font-size: 12px;
    color: #ffcc00;
    margin-left: 10px;
    padding-left: 26px;
    background: url('../assets/u1063.png') no-repeat center left;
    background-size: 18px;
  }

  .detail textarea{
    display: block;
    width: 90vw;
    height: 132px;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    text-align: left;
    margin: 0 auto;
  }

  .detail audio{
    width: 90vw;
    margin: 0 auto;
  }

  .vedio {
    margin: 0 auto;
    margin-top: 20px;
    width: 90vw;
    height: 40px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(228, 228, 228, 1);
    border-radius: 5px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    color: #666666;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    text-align: center;
    line-height: 40px;
  }

  .AD{
    height: 33px;
    line-height: 33px;
    padding-left: 10px;
    background: #fff;
    margin-top: 10px;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #333333;
  }

  .AD span{
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    text-align: left;
    color: #333333;
  }

  .AD input{
    margin-left: 20px;
  }

  .btn{
    width: 90vw;
    height: 40px;
    background: inherit;
    background-color: rgba(255, 204, 0, 0.8);
    border: none;
    border-radius: 20px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-size: 16px;
    color: #666666;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    text-align: center;
    line-height: 40px;
    margin: 25px auto 0;
  }

  .buttom{
    height: 70px;
  }
</style>
