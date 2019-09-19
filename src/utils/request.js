// 请求模块：
//   封装了axios
import axios from 'axios'

// 创建axios实例  
// axios.create的作用是克隆一个axios的实例 它的作用和axios的作用是一样的
// 加入一个应用中有多个不同的后台接口路径
// http://api.a.com
// http://api.b.com
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 配置axios
// 请求拦截器
// 相应拦截器

// 导出请求对象
export default request
