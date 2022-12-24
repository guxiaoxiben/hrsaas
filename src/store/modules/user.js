import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'
const state = {
  token: getToken() || '',
  userInfo: {}
}
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    setToken(token)
  },
  REMOVE_TOKEN(state) {
    state.token = ''
    removeToken()
  },
  SET_USER_TOKEN(state, userInfo) {
    state.userInfo = { ...userInfo }
  },
  REMOVE_USER_INFO(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, payload) {
    const result = await login(payload)
    console.log(result)
    context.commit('SET_TOKEN', result)
    setTimeStamp()
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    const baseInfo = await getUserDetailById(result.userId)
    const baseResult = { ...result, ...baseInfo }
    context.commit('SET_USER_TOKEN', baseResult)
    return baseResult
  },
  // 退出操作
  logout(context) {
    context.commit('REMOVE_TOKEN')
    context.commit('REMOVE_USER_INFO')
    // 重置路由
    resetRouter()
    context.commit('permission/setRoutes', [], { root: true })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
