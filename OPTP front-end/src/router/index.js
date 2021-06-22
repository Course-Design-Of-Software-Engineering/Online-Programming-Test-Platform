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
import historyQuestion from '../views/historyQuestion.vue'
import codingPage from '../views/codingPage.vue'
import questionBank from '../views/questionBank.vue'
import questionDetail from '../views/questionDetail.vue'
import global from '../global.vue'

Vue.use(VueRouter)

// 模拟token
const auth = {
	islogin() {
		// return false
		// return true
		if (global.user == '') {
			return false
		} else {
			return true
		}
	}
}

const routes = [{
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
	{
		path: '/historyQuestion',
		name: 'historyQuestion',
		component: historyQuestion
	},
	{
		path: '/codingPage',
		name: 'codingPage',
		component: codingPage
	},
	{
		path: '/questionBank',
		name: 'questionBank',
		component: questionBank
	},
	{
		path: '/questionDetail',
		name: 'questionDetail',
		component: questionDetail
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

// 全局守卫
router.beforeEach((to, from, next) => {
	if (to.path != '/' && to.path != '/register') {
		if (auth.islogin()) {
			next()
		} else {
			next('/')
		}
	} else {
		next()
	}
})

//导出
export default router

// children: [{
// 	path: '/intervieweeHome',
// 	name: 'intervieweeHome',
// 	component: intervieweeHome
// }, {
// 	path: '/historyInterview',
// 	name: 'historyInterview',
// 	component: historyInterview
// }, {
// 	path: '/personalInfo',
// 	name: 'personalInfo',
// 	component: personalInfo
// }, ]
