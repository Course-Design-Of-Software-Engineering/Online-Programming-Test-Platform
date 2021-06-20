import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import codemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
//import Api from './api/index.js';
import global from './global.vue'
Vue.prototype.COMMON = global

Vue.use(codemirror)
Vue.use(ElementUI);
Vue.prototype.$axios = axios
//Vue.prototype.$axios = Api;
Vue.use(VueAxios, axios);

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})

// ---------------start socket---------------------

// import VueSocketIO from 'vue-socket.io'
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://localhost:9000/',
//   vuex: {
//   }
// }))

// //发送信息给服务端
// this.$socket.emit('login',{
//   username: 'username',
//   password: 'password'
// });

// //接收服务端的信息
// this.sockets.subscribe('relogin', (data) => {
//   console.log(data)
// })
// ---------------end socket---------------------
