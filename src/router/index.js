import Vue from 'vue'
import Router from 'vue-router'
import footer from '@/components/footer'
import index from '@/components/index'
import mine from '@/components/mine'
import search from '@/components/search'
import recruit from '@/components/recruit'
import paixu from '@/components/paixu'
import company from '@/components/company'
import wdjl from '@/components/wdjl'
import jbxx from '@/components/jbxx'
import xzxl from '@/components/xzxl'
import gzjl from '@/components/gzjl'
import addgzjl from '@/components/addgzjl'
import yjfk from '@/components/yjfk'
import wdsc from '@/components/wdsc'
import wdtd from '@/components/wdtd'
import wsddjl from '@/components/wsddjl'
import wdfb from '@/components/wdfb'
import jlxq from '@/components/jlxq'
import details from '@/components/details'
import fudai from '@/components/fudai'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'footer',
      component: footer,
      children: [{
        path: '/',
        name: 'index',
        component: index
      }, {
        path: '/search',
        name: 'search',
        component: search
      }, {
        path: '/mine',
        name: 'mine',
        component: mine
      }, {
        path: '/recruit/:jobId',
        name: 'recruit',
        component: recruit
      }, {
        path: '/paixu/:city/:type',
        name: 'paixu',
        component: paixu
      }, {
        path: '/company',
        name: 'company',
        component: company
      }, {
        path: '/wdjl',
        name: 'wdjl',
        component: wdjl
      }, {
        path: '/jbxx/:education',
        name: 'jbxx',
        component: jbxx
      }, {
        path: '/xzxl/:education',
        name: 'xzxl',
        component: xzxl
      }, {
        path: '/gzjl',
        name: 'gzjl',
        component: gzjl
      }, {
        path: '/addgzjl/:jobWorkId',
        name: 'addgzjl',
        component: addgzjl
      }, {
        path: '/yjfk',
        name: 'yjfk',
        component: yjfk
      }, {
        path: '/wdsc',
        name: 'wdsc',
        component: wdsc
      }, {
        path: '/wdtd',
        name: 'wdtd',
        component: wdtd
      }, {
        path: '/wsddjl',
        name: 'wsddjl',
        component: wsddjl
      }, {
        path: '/wdfb',
        name: 'wdfb',
        component: wdfb
      }, {
        path: '/jlxq/:id/:userId/:jobId/:jobName/:result',
        name: 'jlxq',
        component: jlxq
      }, {
        path: '/details/:job',
        name: 'details',
        component: details
      }, {
        path: '/fudai',
        name: 'fudai',
        component: fudai
      }]
    }
  ]
})
