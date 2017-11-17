<template>
  <div class="yjfk">
    <div class="gznr">
      <textarea v-model="jianyi"></textarea>
    </div>
    <h3>可以留下您的电话，意见被采纳或许还有意外惊喜哦！</h3>
    <div class="input">
      <input type="text" name="" value="" placeholder="请输入您的电话号码">
    </div>
    <div class="submit" @click="submit">提交</div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'index',
    data () {
      return {
        jianyi: ''
      }
    },
    methods: {
      submit: function () {
        var that = this
        axios.get('job/user/saveProposal', {
          params: {
            userId: that.$store.state.userId,
            details: that.jianyi,
            userName: that.$store.state.userName
          }
        }).then((res) => {
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped>
  .yjfk {
    flex: 1;
    background: #f2f2f2;
  }

  .gznr {
    margin-top: 10px;
    padding: 10px 20px 0;
    background: #fff;
  }

  .gznr textarea {
    width: 100%;
    color: rgb(153, 153, 153);
    height: 147px;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    text-decoration: none;
    text-align: left;
    margin-bottom: 20px;
  }

  h3 {
    height: 30px;
    line-height: 30px;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    color: #999999;
    padding-left: 20px;
    margin: 0;
  }

  .input {
    height: 33px;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    text-decoration: none;
    color: #000000;
    text-align: left;
    display: flex;
    padding-left: 20px;
    background: #fff;
  }

  .input input {
    flex: 1;
    border: 0;
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
