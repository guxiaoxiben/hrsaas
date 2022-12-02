import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
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
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    context.commit('SET_USER_TOKEN', result)
    return result
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
