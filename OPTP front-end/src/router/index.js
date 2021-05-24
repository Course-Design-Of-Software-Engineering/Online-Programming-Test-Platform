import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
//import About from '../views/About.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'
import intervieweeHome from '../views/intervieweeHome.vue'
import historyInterview from '../views/historyInterview.vue'
import personalInfo from '../views/personalInfo.vue'
import accountSetting from '../views/accountSetting.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/intervieweeHome',
    name: 'intervieweeHome',
    component: intervieweeHome
  },
  {
    path: '/historyInterview',
    name: 'historyInterview',
    component: historyInterview
  },
  {
    path: '/personalInfo',
    name: 'personalInfo',
    component: personalInfo
  },
  {
    path: '/accountSetting',
    name: 'accountSetting',
    component: accountSetting
  },
  { //路由重定向
    path: '*',
    name: 'any',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

//导出
export default router
