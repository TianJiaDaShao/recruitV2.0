<template>
  <div class="mine">
    <div class="message">
      <div class="user">
        <img :src="userHead" alt="">
        <span class="name">{{userName}}</span>
        <span class="tel">{{tel}}</span>
      </div>
    </div>
    <div class="ad" @click="company">
      <div class="adCenter">
        <img src="../assets/mine-ad.png" alt="">
      </div>
    </div>
    <div class="menu1">
      <div class="menu1-left">
        <img @click="wdjl" src="../assets/u1183.png" alt="">
        <img src="../assets/u1189.png" alt="">
      </div>
      <div class="menu1-right">
        <p class="mineJL" @click="wdjl">我的简历</p>
        <p class="mineFB" @click="wdfb">我的发布</p>
      </div>
    </div>
    <div class="menu2" @click="wsddjl">
      <img src="../assets/u1228.png" alt="">
      <div class="CVCount" v-if="CVCount !== 0"></div>
      <span>我收到的简历</span>
    </div>
    <div class="menu3" @click="wdtd">
      <img src="../assets/toudi.png" alt="">
      <span>我的投递</span>
    </div>
    <div class="menu1">
      <div class="menu1-left">
        <img src="../assets/shoucang.png" alt="">
        <img src="../assets/u1181.png" alt="">
      </div>
      <div class="menu1-right">
        <p class="mineJL" @click="wdsc">我的收藏</p>
        <p class="mineFB" @click="yjfk">意见反馈</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'mine',
    computed: {
      ...mapGetters([ // 从store上绑定的getters中载入需要的到此组件中
        'userHead',
        'userName',
        'tel',
        'CVCount'
      ])
    },
    methods: {
      company: function () {
        this.$router.push({
          name: 'company'
        })
      },
      wdjl: function () {
        this.$router.push({
          name: 'wdjl'
        })
      },
      yjfk: function () {
        this.$router.push({
          name: 'yjfk'
        })
      },
      wdsc: function () {
        this.$router.push({
          name: 'wdsc'
        })
      },
      wdtd: function () {
        this.$router.push({
          name: 'wdtd'
        })
      },
      wsddjl: function () {
        this.$router.push({
          name: 'wsddjl'
        })
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
  .mine {
    flex: 1;
    background: #f2f2f2;
  }

  .message {
    height: 153px;
    width: 100%;
    background: #fdd014;
    padding-left: 36px;
  }

  .user {
    height: 64px;
    padding-top: 40px;
  }

  .user img {
    margin-right: 12px;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    border: #fdf35e 2px solid;
  }

  .name {
    position: relative;
    top: -36px;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
  }

  .tel {
    background: url('../assets/mine-tel.png') no-repeat;
    background-size: 20px;
    height: 20px;
    padding-left: 20px;
    position: relative;
    top: -14px;
    left: -36px;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
  }

  .adCenter {
    margin: 10px auto;
    background: #faeab9;
    height: 40px;
    border-radius: 40px;
    width: 96vw;
  }

  .adCenter img {
    height: 36px;
    margin: 2px auto;
    display: block;
    padding-right: 10px;
    background: url('../assets/mine-dbright.png') no-repeat center right;
  }

  .menu1,
  .menu2,
  .menu3 {
    background: #fff;
    display: flex;
  }

  .menu1-left {
    width: 50px;
  }

  .menu1-left img {
    width: 20px;
    margin: 0 auto;
    padding: 10px 0;
    display: block;
  }

  .menu1-right {
    flex: 1;
  }

  .mineJL,
  .mineFB,
  .menu2 span,
  .menu3 span {
    height: 40px;
    font-size: 14px;
    color: #666666;
    font-family: 'ArialMT', 'Arial';
    margin: 0;
    line-height: 40px;
    background: url('../assets/u1179.png') no-repeat center right 16px;
  }

  .mineJL,
  .menu3 {
    border-bottom: 1px solid #f2f2f2;
  }

  .menu2 {
    height: 40px;
    border-top: 1px solid #f2f2f2;
    margin-bottom: 12px;
    position: relative;
  }

  .CVCount{
    width: 9px;
    height: 9px;
    background: red;
    border-radius: 100%;
    position: absolute;
    left: 30px;
    bottom: 22px;
  }

  .menu3 {
    height: 40px;
  }

  .menu2 img,
  .menu3 img {
    width: 22px;
    padding: 10px 14px;
    display: block;
  }

  .menu2 span,
  .menu3 span {
    width: 100%;
  }
</style>
