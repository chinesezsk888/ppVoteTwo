import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';    
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.css';
import { apiUrl } from '@/views/config.js'
import axios from 'axios'

Vue.prototype.axios = axios
// axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.config.productionTip = false
Vue.use(ElementUI)
// 给axios设置一个全局的默认的baseURL
axios.defaults.baseURL = apiUrl

console.log(apiUrl);

// 配置axios的请求拦截器
// axios.interceptors.request.use(
//   function(config) {
//     // console.log('此路是我开', config)
//     // config.baseURL = 'http://localhost:8888/api/private/v1/'
//     config.headers.Authorization = localStorage.getItem('token')
//     return config
//   },
//   function(error) {
//     // 对请求错误做些什么
//     return Promise.reject(error)
//   }
// )

// // 配置axios的响应拦截器
// axios.interceptors.response.use(
//   function(res) {
//     // 对响应数据做点什么
//     console.log('拦截到响应了', res)
//     // 直接res中的data进行返回
//     return res.data
//   },
//   function(error) {
//     // 对响应错误做点什么
//     return Promise.reject(error)
//   }
// )
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
