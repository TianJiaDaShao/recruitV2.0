<template>
  <div class="company">
    <div class="companyName">
      <label for="">公司名称</label>
      <input type="text" name="" v-model="companyName" placeholder="请输入公司或者品牌名称">
    </div>
    <div class="companyLogo">
      <label for="">上传LOGO</label>
      <div v-if="logoUrl === ''" class="addpic" @click="changePic('logo')"></div>
      <img v-else :src="logoUrl" alt="" class="logoImg">
      <span v-if="logoUrl !== ''" @click="changePic('logo')">更换图片</span>
    </div>
    <div class="companyLogo">
      <label for="">上传宣传图片</label>
      <div v-if="xctpUrl === ''" class="addpic" @click="changePic('xctp')"></div>
      <img v-else :src="xctpUrl" alt="">
      <span v-if="xctpUrl !== ''" @click="changePic('xctp')">更换图片</span>
    </div>
    <div class="companyLogo">
      <label for="">上传宣传二维码</label>
      <div v-if="erwmUrl === ''" class="addpic" @click="changePic('erwm')"></div>
      <img v-else :src="erwmUrl" alt="">
      <span v-if="erwmUrl !== ''" @click="changePic('erwm')">更换图片</span>
    </div>
    <h3>广告宣传语</h3>
    <div class="ad">
      <textarea name="name" placeholder="听说输入广告语,能吸引更多人才哦！" v-model="ad"></textarea>
    </div>
    <div class="submit" @click="update">保存</div>
  </div>
</template>

<script>
  import axios from 'axios'
  import wx from 'weixin-js-sdk'
  export default {
    name: 'company',
    data () {
      return {
        companyName: '',
        logoId: '',
        xctpId: '',
        erwmId: '',
        logoUrl: '',
        xctpUrl: '',
        erwmUrl: '',
        logoReady: true,
        xctpReady: true,
        erwmReady: true,
        ad: '',
        id: null
      }
    },
    mounted: function () {
      this.companyMes()
    },
    methods: {
      companyMes: function () {
        var that = this
        axios.get('job/user/findCompanyByUserId', {
          params: {
            userId: that.$store.state.userId
          }
        }).then((res) => {
          console.log(res)
          var data = res.data.data
          that.companyName = data.name
          that.logoUrl = data.logo
          that.xctpUrl = data.publicity
          that.erwmUrl = data.QRCode
          that.ad = data.info
          that.id = data.id
        })
      },
      changePic: function (data) {
        var that = this
        wx.chooseImage({
          count: 1, // 默认9
          success: (res) => {
            switch (data) {
              case 'logo':
                that.logoReady = false
                that.logoId = res.localIds[0] // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                if (window.__wxjs_is_wkwebview) {
                  wx.getLocalImgData({
                    localId: that.logoId, // 图片的localID
                    success: (res) => {
                      that.logoUrl = res.localData // localData是图片的base64数据，可以用img标签显示
                    }
                  })
                } else {
                  that.logoUrl = that.logoId
                }
                wx.uploadImage({
                  localId: that.logoId, // 需要上传的图片的本地ID，由chooseImage接口获得
                  isShowProgressTips: 1, // 默认为1，显示进度提示
                  success: (res) => {
                    axios.get('job/index/selectImage', {
                      params: {
                        mediaId: res.serverId
                      }
                    }).then((res) => {
                      that.logoUrl = res.data.urlPath
                      that.logoReady = true
                    })
                  }
                })
                break
              case 'xctp':
                that.xctpReady = false
                that.xctpId = res.localIds[0]
                if (window.__wxjs_is_wkwebview) {
                  wx.getLocalImgData({
                    localId: that.xctpId, // 图片的localID
                    success: (res) => {
                      that.xctpUrl = res.localData // localData是图片的base64数据，可以用img标签显示
                    }
                  })
                } else {
                  that.xctpUrl = that.xctpId
                }
                wx.uploadImage({
                  localId: that.xctpId, // 需要上传的图片的本地ID，由chooseImage接口获得
                  isShowProgressTips: 1, // 默认为1，显示进度提示
                  success: (res) => {
                    axios.get('job/index/selectImage', {
                      params: {
                        mediaId: res.serverId
                      }
                    }).then((res) => {
                      that.xctpUrl = res.data.urlPath
                      that.xctpReady = true
                    })
                  }
                })
                break
              case 'erwm':
                that.erwmReady = false
                that.erwmId = res.localIds[0]
                if (window.__wxjs_is_wkwebview) {
                  wx.getLocalImgData({
                    localId: that.erwmId, // 图片的localID
                    success: (res) => {
                      that.erwmUrl = res.localData // localData是图片的base64数据，可以用img标签显示
                    }
                  })
                } else {
                  that.erwmUrl = that.erwmId
                }
                wx.uploadImage({
                  localId: that.erwmId, // 需要上传的图片的本地ID，由chooseImage接口获得
                  isShowProgressTips: 1, // 默认为1，显示进度提示
                  success: (res) => {
                    axios.get('job/index/selectImage', {
                      params: {
                        mediaId: res.serverId
                      }
                    }).then((res) => {
                      that.erwmUrl = res.data.urlPath
                      that.erwmReady = true
                    })
                  }
                })
                break
              default:
            }
          }
        })
      },
      update: function () {
        if (this.logoReady === true && this.xctpReady === true && this.erwmReady === true) {
          var that = this
          axios.get('job/user/saveCompany', {
            params: {
              userId: that.$store.state.userId,
              userName: that.$store.state.userName,
              id: that.id,
              name: that.companyName,
              publicity: that.xctpUrl,
              QRCode: that.erwmUrl,
              info: that.ad,
              logo: that.logoUrl
            }
          }).then((res) => {
            alert('success!')
          })
        } else {
          alert('请稍等,图片正在上传...')
        }
      }
    }
  }
</script>

<style scoped>
  .company {
    flex: 1;
    background: #fafafa;
  }

  .companyName label {
    width: 99px;
    height: 14px;
    font-size: 14px;
    text-align: left;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    color: #333333;
    padding-left: 12px;
    border-right: 1px solid #e4e4e4;
    line-height: 14px;
    margin-top: 9px;
  }

  .companyName {
    margin-top: 12px;
    border-top: 1px solid #e4e4e4;
    background: #fff;
    height: 32px;
    display: flex;
  }

  .companyName input{
    flex: 1;
    border: 0;
    padding-left: 16px;
  }

  .companyLogo {
    height: 78px;
    border-top: 1px solid #f5f5f5;
    background: #fff;
    display: flex;
    align-items: center;
  }

  .companyLogo label {
    width: 99px;
    height: 22px;
    font-size: 14px;
    text-align: left;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    color: #333333;
    padding-left: 12px;
    border-right: 1px solid #e4e4e4;
    line-height: 22px;
  }

  .companyLogo .logoImg {
    width: 50px;
    height: 50px;
    border-radius: 100%;
  }

  .companyLogo img{
    margin-left: 22px;
    height: 44px;
  }

  .companyLogo span{
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    color: #999999;
    width: 85px;
    height: 23px;
    text-align: center;
    border: 1px solid #e9e9e9;
    line-height: 23px;
    border-radius: 6px;
    margin-left: 20px;
  }

  #imageFile{
    display: none;
  }

  .addpic{
    background: rgba(242, 242, 242, 1) url('../assets/u1310.png') no-repeat center center;
    width: 63px;
    height: 47px;
    margin-left: 16px;
  }

  h3{
    height: 44px;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    text-align: left;
    color: #333333;
    line-height: 44px;
    border-top: 1px solid #e4e4e4;
    margin: 0;
    padding-left: 12px;
    background: #fff;
  }

  .ad{
    padding: 2px 12px 18px;
    display: flex;
    background: #fff;
  }

  .ad textarea{
    flex: 1;
    height: 105px;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    text-decoration: none;
    text-align: left;
    border-color: rgb(169, 169, 169);
    border-width: 1px;
    border-style: solid;
    padding: 2px;
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
</style>
