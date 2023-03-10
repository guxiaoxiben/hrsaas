// 导出员工的路由规则
import Layout from '@/layout'

export default {
  path: '/permission',
  name: 'permissions',
  component: Layout,
  children: [
    {
      // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      path: '',
      component: () => import('@/views/permission'),
      name: 'permissions',
      meta: {
        // 这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        title: '权限管理',
        icon: 'lock'
      }
    }
  ]
}
