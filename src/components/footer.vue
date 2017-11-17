<template>
  <div class="footer">
    <router-view/>
    <div class="nav">
      <div class="userHead" @click="mine">
        <img :src="userHead" alt="">
        <div class="CVCount" v-if="CVCount !== 0">{{CVCount}}</div>
      </div>
      <div class="publish" @click="recruit">发招聘</div>
      <div class="jobWanted" @click="jobList">找工作</div>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'footer',
    computed: {
      ...mapGetters([ // 从store上绑定的getters中载入需要的到此组件中
        'userHead',
        'CVCount'
      ])
    },
    methods: {
      mine: function () {
        this.$router.push({
          name: 'mine'
        })
      },
      jobList: function () {
        this.$router.push({
          name: 'index'
        })
      },
      recruit: function () {
        this.$router.push({
          name: 'recruit',
          params: {
            jobId: 'false'
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .footer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .nav {
    height: 51px;
    display: flex;
    border-top: 1px solid rgba(228, 228, 228, 1);
  }

  .userHead {
    flex: 1
  }

  .userHead img{
    display: block;
    width: 35px;
    height: 35px;
    border-radius: 100%;
    margin: 8px auto;
  }

  .publish,
  .jobWanted {
    flex: 3;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    text-align: center;
    line-height: 51px;
    border-left: 1px solid rgba(228, 228, 228, 1);
  }

  .CVCount{
    width: 15px;
    height: 15px;
    background: red;
    border-radius: 100%;
    font-size: 12px;
    color: #FFFFFF;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    text-align: center;
    line-height: 15px;
    position: absolute;
    left: 34px;
    bottom: 34px;
  }
</style>
