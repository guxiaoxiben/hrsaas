import request from '@/utils/request'

// 获取部门列表
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

// 删除组织架构部门
export function delDepartments(id) {
  return request({
    url: ` /company/department/${id}`,
    method: 'DELETE'
  })
}

// 新增部门
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}