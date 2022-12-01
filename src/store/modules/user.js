import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken() || ''
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = ''
    removeToken()
  }
}
const actions = {
  async login(context, payload) {
    const result = await login(payload)
    console.log(result)
    context.commit('setToken', result.data)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
