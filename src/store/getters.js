const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  // token快捷
  token: (state) => state.user.token,
  // 用户名快捷
  name: (state) => state.user.userInfo.username,
  // 用户id快捷
  userId: (state) => state.user.userInfo.userId,
  // 头像快捷
  staffPhoto: (state) => state.user.userInfo.staffPhoto,
  // 公司id快捷
  companyId: (state) => state.user.userInfo.companyId,
  // 导出当前的路由
  routes: (state) => state.permission.routes
}
export default getters
