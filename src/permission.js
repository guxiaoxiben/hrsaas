import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const whilteList = ['/login', '/404']
router.beforeEach((to, form, next) => {
  // 开启进度条
  NProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whilteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done()
})
router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})
