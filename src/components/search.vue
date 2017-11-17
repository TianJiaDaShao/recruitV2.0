<template>
  <div class="search">
    <h2>请选择查询内容</h2>
    <h3>所在城市</h3>
    <div class="city">
      <span v-for="city in citys" :id="(activeCity === city.name) ? 'active' : ''" @click="cityActive($event)">{{city.name}}</span>
    </div>
    <h3>工作种类(可多选)</h3>
    <div class="jobType">
      <span v-for="type in jobType" @click="typeActive($event)">{{type.code}}</span>
    </div>
    <div class="btn" @click="search">搜索</div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'search',
    data () {
      return {
        citys: '',
        jobType: '',
        activeCity: '',
        activeType: []
      }
    },
    mounted: function () {
      this.jobInfoConfig()
    },
    methods: {
      jobInfoConfig: function () {
        var that = this
        axios.get('job/info/jobInfoConfig', {
          params: {
            countriesId: that.$store.state.country
          }
        }).then(function (res) {
          var data = res.data.data
          console.log(data)
          that.citys = data.cityList
          that.jobType = data.jobType
        })
      },
      cityActive: function (e) {
        if (this.activeCity !== e.target.innerText) {
          this.activeCity = e.target.innerText
        } else {
          this.activeCity = ''
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
      search: function () {
        var that = this
        var type = this.activeType.join(',')
        this.$router.push({
          name: 'paixu',
          params: {
            city: that.activeCity,
            type: type
          }
        })
      }
    }
  }
</script>

<style scoped>
  .search {
    flex: 1;
    background: #fafafa;
    padding: 10px;
    padding-bottom: 0;
  }

  h2 {
    margin: 0px;
    color: #000000;
    font-size: 14px;
    text-align: left;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
  }

  h3 {
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    color: #666666;
    font-size: 14px;
    text-align: left;
    margin: 0;
    margin-top: 10px;
  }

  .btn {
    width: 96vw;
    height: 38px;
    background: inherit;
    background-color: rgba(255, 204, 0, 0.8);
    border: none;
    border-radius: 20px;
    box-shadow: none;
    font-size: 14px;
    color: #333333;
    text-align: center;
    line-height: 38px;
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    margin-top: 14px;
  }

  .city,
  .jobType {
    padding-top: 10px;
    display: flex;
    flex-wrap: wrap;
  }

  .city span,
  .jobType span {
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

  #active{
    background-color: rgba(255, 204, 0, 0.317647058823529);
  }
</style>
