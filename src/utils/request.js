import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use()
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      // 提示错误消息
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 提示错误信息
    Message.error(error.message)
    return Promise.reject(error)
  }
)

export default service
