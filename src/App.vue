<template>
  <div id="app">
    <div class="gridContainer">
      <loading v-if="isLoading"></loading>
      <Wxshare :share-data="backShareData" v-if="backShareData"></Wxshare>
      <div class="contain lockTouchmove">
        <PageHome v-on:setGotoPage="setGotoPage" v-if="!isAnswer&&backShareData&&isShowPageHome"></PageHome>
        <PageInvite :count="countNumber" :selfid="selfid" v-if="isAnswer&&backShareData"></PageInvite>
        <PageCollection v-on:setGotoPage="setGotoPage" v-if="isShowPageCollection"></PageCollection>
        <PageForm v-on:setGotoPage="setGotoPage" v-if="isShowPageForm"></PageForm>
        <PageAnswer :answers="questionsData" v-on:datiEndSetShare="datiEndSetShare" v-on:setGotoPage="setGotoPage" v-if="isShowPageAnswer"></PageAnswer>
      </div>
      <pops @closePops="closePops" :showPopsData="showPopsData" v-if="showPopsData"></pops>
    </div>
    <!-- orF-Qw_gE_VbZ1Zg3-DT9Aldd4Xk   orF-Qw-1GyusMszn0m89j_M2MI2o -->
  </div>
</template>
<script>
import axios from 'axios'
import Loading from './components/Loading'
import Wxshare from './components/Wxshare'
import PageHome from './components/PageHome'
import PageInvite from './components/PageInvite'
import PageCollection from './components/PageCollection'
import PageForm from './components/PageForm'
import PageAnswer from './components/PageAnswer'
import pops from './components/Pops'
export default {
  name: 'app',
  data () {
    return {
      isLoading: true,
      backShareData: false, // 返回微信分享数据
      isAnswer: false,
      selfid: false,
      questionsData: null,
      countNumber: 0,
      isShowPageHome: true,
      isShowPageCollection: false,
      isShowPageForm: false,
      isShowPageAnswer: false,
      showPopsData: null,
      ceshiData: '123123'
    }
  },
  components: {
    Loading,
    Wxshare,
    PageHome,
    PageInvite,
    PageCollection,
    PageForm,
    PageAnswer,
    pops
  },
  methods: {
    closePops () {
      this.showPopsData = null
    },
    weixinData () {
      /* 获取微信认证 */
      const url = '/ajax/app/sap/weixin/obtain/userbase'
      axios.get(url).then((response) => {
        const _url = decodeURIComponent(response.data.authurl)
        window.location.href = _url
      })
    },
    async getAttendRecord () {
      /* 获取是否答题以及分享被点击的次数 */
      const urlKey = '/ajax/app/sap/hana/cloud/getAttendRecord'
      const _openid = sessionStorage.getItem('openid')
      const q = `?openid=${_openid}`
      const url = `${urlKey}${q}`
      const response = await axios.get(url)
      if (response.status === 200) {
        if (response.data.status === 200) {
          console.log('获取是否答题以及分享被点击的次数完毕---------------------------------')
          /* 判断是否答题 */
          this.isAnswer = response.data.data.isactive
          /* 判断返回自己的id   self_id */
          this.selfid = response.data.data.self_id
          /* 获取分享被点击的次数 */
          this.countNumber = response.data.data.count
          /* 获取微信分享信息 */
          this.getWxShare()
        } else {
          this.initBaseMethod.errorPrompt('数据异常', this)
        }
      } else {
        this.initBaseMethod.errorPrompt('网络异常', this)
      }
    },
    getWxShare () {
      /* 获取微信分享信息 */
      const url = '/ajax/app/sap/hana/cloud/getWxShare'
      axios.get(url).then((response) => {
        if (response.data.status === 200) {
          const responseShare = response.data.data
          /* loading 关闭 */
          this.isLoading = false
          /* 判断答过题目 */
          if (this.isAnswer) {
            this.backShareData = {
              title: responseShare.title,
              desc: responseShare.desc,
              imgUrl: responseShare.imgUrl,
              link: responseShare.link + '?parentid=' + this.selfid
            }
          } else {
            this.backShareData = responseShare
          }
        } else {
          this.initBaseMethod.errorPrompt('数据异常', this)
        }
      })
    },
    getQuestions () {
      /* 获取五道题 */
      const url = '/ajax/app/sap/hana/cloud/getQuestions'
      axios.get(url).then((response) => {
        // console.log(response)
        if (response.data.status === 200){
          const question = response.data.data
          for (const val in question) {
            const v1 = question[val]
            for (const val2 in v1.options){
              const v3 = v1.options[val2]
              v1.options[val2] = {val: v3, isChecked: false}
            }
          }
          this.questionsData = question
        } else {
          this.initBaseMethod.errorPrompt('数据异常', this)
        }
      })
    },
    setGotoPage (old, news) {
      if (old === 'Home') {
        this.isShowPageHome = false
      } else if (old === 'Collection') {
        this.isShowPageCollection = false
      } else if (old === 'Form') {
        this.isShowPageForm = false
      }
      if (news === 'Collection') {
        this.isShowPageCollection = true
      } else if (news === 'Form') {
        this.isShowPageForm = true
      } else if (news === 'Answer') {
        this.isShowPageAnswer = true
      }
    },
    datiEndSetShare () {
      const _id = sessionStorage.getItem('userid')
      let newShareUrl
      newShareUrl = window.location.origin + '/static/sap/hana/?parentid=' + _id
      /* 修改分享地址 */
      const newShareData = {
        title: this.backShareData.title,
        desc: this.backShareData.desc,
        link: newShareUrl,
        imgUrl: this.backShareData.imgUrl,
        visiting_url: window.location.href
      }
      /* 重新修改分享信息 */
      this.backShareData = newShareData
      this.isAnswer = true
      this.isShowPageAnswer = false
      console.log('答题完毕以后触发修改分享地址')
    }
  },
  created () {
    /* 获取用户来源parentID */
    const parentid = this.initBaseMethod.getQueryString('parentid')
    if (parentid) {
      sessionStorage.setItem('parentid', parentid)
    }
    /* 获取用户openid */
    const openid = this.initBaseMethod.getQueryString('openid')
    /* 判断是否有openid */
    if (!openid) {
      /* 没有openid执行 微信认证 */
      this.weixinData()
    } else {
      /* 把url地址的opendid存sessionStorage */
      sessionStorage.setItem('openid', openid)
      /* 判断是否已经答题 */
      this.getAttendRecord()
      /* 获取五道题 */
      this.getQuestions()
    }
  }
}
</script>

<style>
  @import './assets/css/reset.css';
  @import './assets/css/common.scss';
</style>
