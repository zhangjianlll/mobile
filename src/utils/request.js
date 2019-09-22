// 请求模块：
//   封装了axios
import axios from 'axios'
import JSONbig from 'json-bigint'
// 2、引入容器模块
import store from '@/store' // 在非组件模块中访问Vuex容器，谁用谁直接加载
// 创建axios实例
// axios.create的作用是克隆一个axios的实例 它的作用和axios的作用是一样的
// 加入一个应用中有多个不同的后台接口路径
// http://api.a.com
// http://api.b.com
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 配置处理后端返回的数据中包含超出JavaScript 安全证书范围问题
request.defaults.transformResponse = [function (data) {
  // 假如data不是标准的json格式的字符串
  try {
    // data数据可能不是标准的接送格式字符串，否则会导致JSONbig.parse(data)转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    return data
  }
}]
// 配置axios
// 请求拦截器
// 相应拦截器

// 添加一个请求拦截器
// Add a request interceptor
// 1、使用拦截器统一添加token
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 统一在请求头中添加token、名字、数据
  // 3、添加token
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 添加一个相应拦截器
// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

// 导出请求对象
export default request
