import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  isLoading: true,
  /* 初始化数据 */
  isAnswer: null,
  openid: null,
  userName: null,
  employee_code: null,
  initQuestion: null,
  initWxShare: null,
  promptText: null, // 提示信息文字
  allAnswer: null,
  CurrentComponent: 'PageHome',
  self_id: null,
  isShareBack: false,
  count: null // 分享被点击的次数,
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
