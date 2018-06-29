import {
  SET_ATTR,
  INIT_DATA
} from './mutations-type'
export default {
  [SET_ATTR] (state, obj) {
    state[obj.key] = obj.value
  },
  [INIT_DATA] (state, initdata) {
    state.initData.isAnswer = initdata.isattend
    state.initData.openid = initdata.openid
    console.log(JSON.stringify(state.initData))
  }
}
