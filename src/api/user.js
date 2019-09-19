// 用户相关请求模块
// 两个好处：
// 1 便于开发和维护
// 2 便用重复使用
// 一个原则
// 仅封装请求操作，不关心其他任何业务逻辑
// 例如操作视图，修改DOM等 更不关心交互
// 封装了请求，以后就不要再在组件中出现任何直接请求了，都需要这样做

import request from '@/utils/request'

export const login = ({
  mobile, code
}) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
