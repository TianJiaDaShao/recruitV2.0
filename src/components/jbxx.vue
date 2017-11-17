<template>
  <div class="jbxx" ref="wrapper">
    <div>
      <div class="message">
        <div class="head">
          <img :src="userHead" alt="" @click="changePic">
        </div>
        <div class="name">
          <label for=""><span>*</span>姓名</label>
          <input type="text" name="" v-model="name" placeholder="请输入姓名">
        </div>
        <div class="sex">
          <label for=""><span>*</span>性别</label>
          <div>
            <input type="radio" name="sex" value="0" v-model="sex">男
            <input type="radio" name="sex" value="1" v-model="sex">女
          </div>
        </div>
        <div class="name">
          <label for=""><span>*</span>电话号码</label>
          <input type="text" name="" v-model="tel" placeholder="请输入电话号码">
        </div>
        <div class="birth" @click="birthDay">
          <label for=""><span>*</span>出生日期</label>
          <i>{{birthYear}}{{monthString}}{{dayString}}</i>
        </div>
        <div class="education" @click="xzxl">
          <label for="">学历</label>
          <i>{{education}}</i>
        </div>
        <div class="education">
          <label for="">学校</label>
          <input type="text" name="" v-model="school" placeholder="请输入学校名称">
        </div>
        <div class="jzd">
          <label for=""><span>*</span>居住地</label>
          <div class="city">
            <span v-for="city in citys" :id="(activeCity === city.name) ? 'active' : ''" @click="cityActive($event)">{{city.name}}</span>
          </div>
        </div>
        <div class="jzd">
          <label for=""><span>*</span>居留类型</label>
          <div class="requirement">
            <span v-for="requirement in jobRequirements" :id="(activeRequirement === requirement.code) ? 'active' : ''" @click="requirementActive(requirement.code)">{{requirement.code !== '无居留要求' ? requirement.code : '无居留'}}</span>
          </div>
        </div>
        <div class="jzd">
          <label for="">选择您感兴趣的职位</label>
          <div class="jobType" ref="jobTypeSpan">
            <span v-for="type in jobType" @click="typeActive($event)">{{type.code}}</span>
          </div>
        </div>
      </div>
      <div class="submit" @click="update">保存</div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import wx from 'weixin-js-sdk'
  import Vue from 'vue'
  export default {
    name: 'wdjl',
    data () {
      return {
        name: '',
        sex: '',
        tel: '',
        education: '',
        school: '',
        citys: '',
        jobType: '',
        jobRequirements: '',
        activeRequirement: '',
        activeCity: '',
        activeType: [],
        userHead: '',
        headUrl: ''
      }
    },
    computed: {
      ...mapGetters([ // 从store上绑定的getters中载入需要的到此组件中
        'userName',
        'birthYear'
      ]),
      sexString: function () {
        if (this.sex === '0') {
          return '男'
        } else {
          return '女'
        }
      },
      monthString: function () {
        if (this.$store.state.birthMonth === '') {
          return ''
        } else {
          if (this.$store.state.birthMonth < 10) {
            return '-0' + this.$store.state.birthMonth
          } else {
            return '-' + this.$store.state.birthMonth
          }
        }
      },
      dayString: function () {
        if (this.$store.state.birthDay === '') {
          return ''
        } else {
          if (this.$store.state.birthDay < 10) {
            return '-0' + this.$store.state.birthDay
          } else {
            return '-' + this.$store.state.birthDay
          }
        }
      }
    },
    mounted: function () {
      this.jobInfoConfig()
    },
    methods: {
      ...mapActions([ // 从store上绑定的getters中载入需要的到此组件中
        'actionAlertSelect',
        'activeUserHead',
        'actionMobileSelectStatus'
      ]),
      userInfo: function () {
        var _this = this
        axios.get('job/user/getUserInfoByUserId', {
          params: {
            userId: _this.$store.state.userId
          }
        }).then((res) => {
          var user = res.data.user
          _this.userHead = user.head
          _this.name = user.name
          _this.sex = user.sex
          _this.tel = user.tel
          if (user.birthday !== null) {
            _this.$store.state.birthYear = user.birthday.split(',')[0]
            _this.$store.state.birthMonth = user.birthday.split(',')[1]
            _this.$store.state.birthDay = user.birthday.split(',')[2]
          } else {
            _this.$store.state.birthYear = ''
            _this.$store.state.birthMonth = ''
            _this.$store.state.birthDay = ''
          }
          if (this.$route.params.education === false) {
            _this.education = user.education
          } else {
            _this.education = this.$route.params.education
          }
          _this.school = user.school
          _this.activeCity = user.locationName
          _this.activeRequirement = user.stay
          if (user.interested !== null) {
            _this.activeType = user.interested.split(',')
            var childrens = _this.$refs.jobTypeSpan.children
            for (var i = 0; i < childrens.length; i++) {
              for (var j = 0; j < _this.activeType.length; j++) {
                if (childrens[i].innerText === _this.activeType[j]) {
                  childrens[i].id = 'active'
                }
              }
            }
          }
        })
      },
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
          that.jobRequirements = data.jobRequirements
          Vue.nextTick(() => {
            that.userInfo()
            that.wrapper = new BScroll(that.$refs.wrapper, {
              click: true
            })
          })
        })
      },
      cityActive: function (e) {
        if (this.activeCity !== e.target.innerText) {
          this.activeCity = e.target.innerText
        } else {
          this.activeCity = ''
        }
      },
      requirementActive: function (e) {
        if (this.activeRequirement !== e) {
          this.activeRequirement = e
        } else {
          this.activeRequirement = ''
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
      xzxl: function () {
        this.$router.push({
          name: 'xzxl',
          params: {
            education: this.education
          }
        })
      },
      birthDay: function () {
        this.actionMobileSelectStatus(0)
        this.actionAlertSelect()
      },
      update: function () {
        var that = this
        var userBirthday = that.$store.state.birthYear + ',' + that.$store.state.birthMonth + ',' + that.$store.state.birthDay
        var userInterested = this.activeType.join(',')
        axios.get('job/user/updateUser', {
          params: {
            userId: that.$store.state.userId,
            userName: that.name,
            userSex: that.sex,
            tel: that.tel,
            head: that.headUrl || that.userHead,
            userBirthday: userBirthday,
            userEducation: that.education,
            userSchool: that.school,
            userLocationName: that.activeCity,
            userStay: that.activeRequirement,
            userInterested: userInterested
          }
        }).then((res) => {
          that.activeUserHead(that.headUrl || that.userHead)
          this.$router.push({
            name: 'wdjl'
          })
        })
      },
      changePic: function () {
        var that = this
        wx.chooseImage({
          count: 1, // 默认9
          success: (res) => {
            if (window.__wxjs_is_wkwebview) {
              wx.getLocalImgData({
                localId: res.localIds[0], // 图片的localID
                success: (res) => {
                  that.userHead = res.localData // localData是图片的base64数据，可以用img标签显示
                }
              })
            } else {
              that.userHead = res.localIds[0] // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            }
            wx.uploadImage({
              localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: (res) => {
                axios.get('job/index/selectImage', {
                  params: {
                    mediaId: res.serverId
                  }
                }).then((res) => {
                  that.headUrl = res.data.urlPath
                })
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .jbxx {
    flex: 1;
    background: #f2f2f2;
    overflow: hidden;
  }

  .message {
    background: #fff;
    padding-left: 20px;
  }

  .head {
    height: 78px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }

  .head img {
    width: 64px;
    height: 64px;
    border-radius: 100%;
    margin-right: 20px;
  }

  .name,
  .sex,
  .birth,
  .education {
    border-top: 1px solid #f2f2f2;
    height: 35px;
    line-height: 35px;
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
  }

  .name span,
  .sex span,
  .birth span,
  .jzd span {
    color: red;
    padding-right: 6px;
  }

  .name input,
  .education input {
    flex: 1;
    text-align: right;
    border: 0;
    font-size: 14px;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    color: #333333;
  }

  .education {
    padding-left: 14px;
  }

  .birth i,
  .education i {
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

  .jzd {
    border-top: 1px solid #f2f2f2;
    padding-right: 20px;
  }

  .jzd label {
    height: 35px;
    line-height: 35px;
  }

  .city,
  .jobType,
  .requirement {
    display: flex;
    flex-wrap: wrap;
  }

  .city span,
  .jobType span,
  .requirement span {
    background: #fff;
    margin-right: 14px;
    margin-bottom: 10px;
    padding: 0 14px;
    height: 27px;
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
    line-height: 27px;
  }

  #active {
    background-color: rgba(255, 204, 0, 0.317647058823529);
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

  .bottom{
    height: 56px;
  }
</style>
