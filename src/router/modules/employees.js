// 导出员工的路由规则
import Layout from '@/layout'

export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [
    {
      // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      path: '',
      component: () => import('@/views/employees'),
      meta: {
        // 这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        title: '员工管理',
        icon: 'people'
      }
    },
    // 员工详情页
    {
      path: 'detail/:id',
      component: () => import('@/views/employees/detail'),
      hidden: true,
      meta: {
        title: '员工详情'
      }
    },
    {
      path: 'print/:id',
      component: () => import('@/views/employees/print'),
      hidden: true,
      meta: {
        title: '打印',
        icon: 'people'
      }
    }
  ]
}
