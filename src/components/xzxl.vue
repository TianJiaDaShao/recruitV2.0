<template>
  <div class="xzxl">
    <ul class="message">
      <li :class="(active === '高中以下') ? 'active' : ''" @click="msgActive($event)">高中以下</li>
      <li :class="(active === '高中') ? 'active' : ''" @click="msgActive($event)">高中</li>
      <li :class="(active === '大专') ? 'active' : ''" @click="msgActive($event)">大专</li>
      <li :class="(active === '大学') ? 'active' : ''" @click="msgActive($event)">大学</li>
      <li :class="(active === '研究生') ? 'active' : ''" @click="msgActive($event)">研究生</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'xzxl',
  data () {
    return {
      active: this.$route.params.education
    }
  },
  methods: {
    msgActive: function (e) {
      if (this.active !== e.target.innerText) {
        this.active = e.target.innerText
      }
      this.$router.push({
        name: 'jbxx',
        params: {
          education: this.active
        }
      })
    }
  }
}
</script>

<style scoped>
  .xzxl {
    flex: 1;
    background: #f2f2f2;
  }

  .message {
    background: #fff;
    padding-left: 20px;
  }

  .message ul{
    display: flex;
    flex-direction: column;
  }

  .message li {
    height: 38px;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #333333;
    text-align: left;
    line-height: 38px;
    border-bottom: 1px solid #f2f2f2;
  }

  .active{
    background: url('../assets/1_u1620.png') no-repeat center right 16px;
    background-size: 20px;
  }
</style>
