import request from '@/utils/request'

/**
 * 登录接口
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息接口
 */
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/**
 * 根据id获取头像接口
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
