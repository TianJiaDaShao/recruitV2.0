// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import BScroll from 'better-scroll'
import {
  mapActions
} from 'vuex'
import './styles/mobileSelect.css'

Vue.config.productionTip = false

Vue.component('mobile-select', {
  template: `<div class="mobileSelect">
  <div class="title">
    <div class="cancel" @click="cancel">取消</div>
    <div class="ensure" @click="ensure">选择</div>
  </div>
  <div class="panel">
    <p class="top"></p>
    <p class="bottom"></p>
    <div class="fixWidth" ref="wrapper">
      <ul>
        <li v-for="item in years">{{item}}</li>
      </ul>
    </div>
    <div class="fixWidth" ref="month">
      <ul>
        <li v-for="item in months">{{item}}</li>
      </ul>
    </div>
    <div class="fixWidth" ref="day" v-if="status === 0">
      <ul>
        <li v-for="item in days">{{item}}</li>
      </ul>
    </div>
  </div>
</div>`,
  props: ['status'],
  data () {
    return {
      activeYear: '2017',
      activeMonth: '1',
      activeDay: '1',
      years: '',
      months: '',
      days: ''
    }
  },
  mounted: function () {
    var years = []
    var myDate = new Date()
    for (let i = myDate.getFullYear(); i > 1600; i--) {
      years.push(i)
    }
    var months = []
    for (let i = 1; i < 13; i++) {
      months.push(i)
    }
    var days = []
    for (let i = 1; i < 32; i++) {
      days.push(i)
    }
    this.years = years
    this.months = months
    this.days = days
    var that = this
    Vue.nextTick(() => {
      that.wrapper = new BScroll(that.$refs.wrapper, {
        click: true,
        snap: true,
        startY: -80
      })
      that.wrapper.on('scrollEnd', () => {
        let pageIndex = that.wrapper.getCurrentPage().pageY
        that.activeYear = that.years[pageIndex]
      })
      that.moon = new BScroll(that.$refs.month, {
        click: true,
        snap: true
      })
      that.moon.on('scrollEnd', (pos) => {
        let pageIndex = that.moon.getCurrentPage().pageY
        that.activeMonth = that.months[pageIndex]
      })
      if (that.status === 0) {
        that.day = new BScroll(that.$refs.day, {
          click: true,
          snap: true
        })
        that.day.on('scrollEnd', (pos) => {
          let pageIndex = that.day.getCurrentPage().pageY
          that.activeDay = that.days[pageIndex]
        })
      }
    })
  },
  methods: {
    ...mapActions([ // 从store上绑定的getters中载入需要的到此组件中
      'actionActiveYear',
      'actionActiveMonth',
      'actionBirthYear',
      'actionBirthMonth',
      'actionBirthDay',
      'actionEndYear',
      'actionEndMonth'
    ]),
    cancel: function () {
      this.$store.state.alertSelect = false
    },
    ensure: function () {
      switch (this.status) {
        case 0:
          this.actionBirthYear(this.activeYear)
          this.actionBirthMonth(this.activeMonth)
          this.actionBirthDay(this.activeMonth)
          break
        case 1:
          this.actionActiveYear(this.activeYear)
          this.actionActiveMonth(this.activeMonth)
          break
        case 2:
          this.actionEndYear(this.activeYear)
          this.actionEndMonth(this.activeMonth)
          break
        default:
      }
      this.$store.state.alertSelect = false
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
