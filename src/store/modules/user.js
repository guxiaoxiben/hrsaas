import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken() || ''
}
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    setToken(token)
  },
  REMOVE_TOKEN(state) {
    state.token = ''
    removeToken()
  }
}
const actions = {
  async login(context, payload) {
    const result = await login(payload)
    console.log(result)
    context.commit('SET_TOKEN', result)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
