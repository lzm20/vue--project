import axios from 'axios'
import AppWeixinShareUtil from '@/assets/js/wx-share-util'
export default {
  weixinData ({ commit, state }) {
    /* 获取微信认证地址 */
    const url = '/ajax/app/sap/weixin/obtain/userbase'
    axios.get(url).then((response) => {
      const _url = decodeURIComponent(response.data.authurl)
      window.location.href = _url
    })
  },
  async getAttendRecord ({ commit, state }) {
    /* 获取用户参与记录及分享被点击的次数 */
    const urlKey = '/ajax/app/sap/hana/cloud/getAttendRecord'
    const q = `?openid=${state.openid}`
    const url = `${urlKey}${q}`
    let errorResponse
    const response = await axios.get(url).catch(() => errorResponse)
    console.log(response)
    if (response.data.status === 200) {
      /* 判断是否答过题 */
      const isactive = response.data.data.isactive
      if (isactive) {
        commit({
          type: 'setAttr',
          key: 'CurrentComponent',
          value: 'PageInvite'
        })
      } else {
        commit({
          type: 'setAttr',
          key: 'CurrentComponent',
          value: 'PageHome'
        })
      }
      commit({
        type: 'setAttr',
        key: 'isAnswer',
        value: isactive
      })
      commit({
        type: 'setAttr',
        key: 'isLoading',
        value: false
      })
      /* 获取自己的id */
      const selfid = response.data.data.self_id
      commit({
        type: 'setAttr',
        key: 'self_id',
        value: selfid
      })
      const count = response.data.data.count
      commit({
        type: 'setAttr',
        key: 'count',
        value: count
      })
    }
  },
  getWxShare ({ commit, state }) {
    /* 获取微信分享信息 */
    const url = '/ajax/app/sap/hana/cloud/getWxShare'
    axios.get(url).then((response) => {
      const shareData = response.data.data
      commit({
        type: 'setAttr',
        key: 'initWxShare',
        value: shareData
      })
    })
  },
  getQuestions ({ commit, state }) {
    /* 获取五道题 */
    const url = '/ajax/app/sap/hana/cloud/getQuestions'
    axios.get(url).then((response) => {
      // console.log(response)
      if (response.data.status === 200) {
        const question = response.data.data
        for (const val in question) {
          const v1 = question[val]
          for (const val2 in v1.options){
            const v3 = v1.options[val2]
            v1.options[val2] = {val: v3, isChecked: false}
          }
        }
        commit({
          type: 'setAttr',
          key: 'initQuestion',
          value: question
        })
      }
    })
  },
  async setUserInfo({ commit, state }, obj) {
    /* 保存用户姓名及员工号 */
    const urlKey = '/ajax/app/sap/hana/cloud/setUserInfo'
    const _openid = sessionStorage.getItem('openid')
    const q = `?openid=${_openid}&employee_code=${state.employee_code}&title=${state.userName}`
    const url = `${urlKey}${q}`
    let errorResponse
    let that = obj
    const response = await axios.get(url).catch(() => errorResponse)
    if (response.data.status === 200) {
      that.$store.commit({
        type: 'setAttr',
        key: 'CurrentComponent',
        value: 'PageAnswer'
      })
      /* 保存用户id */
      const userid = response.data.data.id
      sessionStorage.setItem('userid', userid)
    }
  },
  async setUserAns({ commit, state }, obj){
    /* 保存问题答案及parentid */
    const urlKeyAns = '/ajax/app/sap/hana/cloud/setUserAns'
    const _id = sessionStorage.getItem('userid')
    const _parentid = sessionStorage.getItem('parentid')
    const _answer = JSON.stringify(state.allAnswer)
    let ans
    let them = obj
    if (_parentid === null) {
      ans = `?id=${_id}&answers=${_answer}`
    } else {
      ans = `?id=${_id}&parentid=${_parentid}&answers=${_answer}`
    }
    const url = `${urlKeyAns}${ans}`
    let errorResponse
    const response = await axios.get(url).catch(() => errorResponse)
    if (response.data.status === 200) {
      them.$store.commit({
        type: 'setAttr',
        key: 'CurrentComponent',
        value: 'PageInvite'
      })
      let newShareUrl
      newShareUrl = window.location.origin + '/static/sap/hana/?parentid=' + _id
      /* 修改分享地址 */
      const newShareData = {
        title: state.initWxShare.title,
        desc: state.initWxShare.desc,
        link: newShareUrl,
        imgUrl: state.initWxShare.imgUrl,
        visiting_url: window.location.href
      }
      console.log('setupWeixinShareOnly', '第一次')
      AppWeixinShareUtil.setupWeixinShareOnly(newShareData)
    }
  }
}
