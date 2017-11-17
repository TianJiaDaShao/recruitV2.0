<template>
  <div id="app">
    <router-view/>
    <div id="alert" v-show="alert || alertSelect || loading || tishi">
      <img v-if="loading" src="./assets/loading.gif" alt="">
    </div>
    <div id="switchAlert" v-if="switchCountry">
      <div class="switch">
        <div class="switchTop">
          <span>您当前定位国家【{{lastLocation}}】是否切换至上次浏览国家【{{nowCountry}}】？</span>
        </div>
        <div class="switchButtom">
          <span @click="esc">取消</span>
          <span @click="choiceCountry">切换</span>
        </div>
      </div>
    </div>
    <mobile-select v-if="alertSelect" :status="mobileSelectStatus"></mobile-select>
  </div>
</template>

<script>
  import axios from 'axios'
  import wx from 'weixin-js-sdk'
  // import debug from 'm-debug'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    name: 'app',
    data () {
      return {
        switchCountry: false,
        nowCountry: '',
        lastLocation: ''
      }
    },
    beforeMount: function () {
      axios.defaults.baseURL = this.$store.state.url
      this.isLogin()
      this.initwx()
    },
    computed: {
      ...mapGetters([ // 从store上绑定的getters中载入需要的到此组件中
        'alert',
        'alertSelect',
        'activeYear',
        'activeMonth',
        'loading',
        'tishi',
        'mobileSelectStatus'
      ])
    },
    methods: {
      ...mapActions([ // 从store上绑定的getters中载入需要的到此组件中
        'login', // 我们稍后在src/store/getters.js中创建一个名为index的方法
        'actionCountry',
        'actionAlertSelect',
        'actionLoading',
        'activeUserHead',
        'activeUserName',
        'activeTel',
        'actionInterested'
      ]),
      isLogin: function () {
        if (localStorage._hbossUserId !== undefined) {
          this.login(localStorage._hbossUserId)
          this.userInfo()
        }
        if (this.$store.state.userId === '') {
          if (window.location.href.split('?userId=')[1] === undefined) {
            axios.get('weixin/config/oauth', {
              params: {
                'state': window.location.href + '?userId=okid'
              }
            }).then((res) => {
              window.location.href = res.data.data
            }).catch((err) => {
              console.log(err)
            })
          } else {
            localStorage._hbossUserId = window.location.href.split('?userId=')[1]
            this.login(localStorage._hbossUserId)
            this.userInfo()
          }
        }
      },
      initwx: function () {
        var that = this
        let nowUrl = window.location.href.split('#')[0]
        axios.get('weixin/config/jsConfig', {
          params: {
            url: nowUrl
          }
        }).then((res) => {
          var data = res.data.data
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'chooseImage',
              'uploadImage',
              'startRecord',
              'stopRecord',
              'onVoiceRecordEnd',
              'uploadVoice',
              'getLocalImgData',
              'getLocation'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          wx.ready((res) => {
            that.actionLoading(false)
            wx.getLocation({
              type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function (res) {
                axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                  params: {
                    latlng: res.latitude + ',' + res.longitude,
                    key: 'AIzaSyDofWG3q9axLTVA7rbJka3E6Ahh14NOfos'
                  }
                }).then((res) => {
                  that.nowCountry = res.data.results[res.data.results.length - 1].formatted_address
                  if (that.nowCountry === '西班牙' || that.nowCountry === '葡萄牙' || that.nowCountry === '法国' || that.nowCountry === '意大利' || that.nowCountry === '英国') {
                    that.switchCountry = true
                  }
                })
              }
            })
          })
          wx.error((res) => {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            history.go(0)
          })
        })
      },
      userInfo: function () {
        var _this = this
        axios.get('job/user/getUserInfoByUserId', {
          params: {
            userId: _this.$store.state.userId
          }
        }).then(function (res) {
          var data = res.data.user
          if (res.status === 200) {
            _this.lastLocation = data.lastLocation
            _this.actionCountry(data.lastLocationId)
            _this.activeUserHead(data.head)
            _this.activeUserName(data.name)
            _this.activeTel(data.tel)
            _this.actionInterested(data.interested)
          }
        })
      },
      esc: function () {
        this.switchCountry = false
      },
      choiceCountry: function () {
        var _this = this
        switch (this.lastLocation) {
          case '西班牙':
            this.$store.state.country = 1
            break
          case '葡萄牙':
            this.$store.state.country = 2
            break
          case '法国':
            this.$store.state.country = 3
            break
          case '意大利':
            this.$store.state.country = 4
            break
          case '英国':
            this.$store.state.country = 5
            break
          default:
        }
        this.switchCountry = false
        axios.get('job/user/getUserInfoByUserId', {
          params: {
            userId: _this.$store.state.userId,
            countriesId: _this.$store.state.country
          }
        })
      }
    }
  }
</script>

<style>
  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  ul,
  li {
    margin: 0;
    padding: 0;
    list-style:none;
  }

  img,p {
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  .body {
    background: #f2f2f2;
  }

  #alert {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(36, 36, 36, 1);
    opacity: 0.607843;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #switchAlert {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(36, 36, 36, 0.607843);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #alert img{
    width: 100%;
  }

  .switch {
    width: 300px;
    height: 118px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .switchTop {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .switchTop span{
    width: 90%;
  }

  .switchButtom {
    width: 300px;
    height: 42px;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 15px;
    color: #333333;
    text-align: center;
    display: flex;
    border-top: 1px solid #f2f2f2;
    line-height: 42px;
  }

  .switchButtom span{
    flex: 1;
  }

  .switchButtom span:last-child{
    border-left: 1px solid #f2f2f2;
    color: #ffd633;
  }
</style>
