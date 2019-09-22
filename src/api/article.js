// 文章相关请求模块
import request from '@/utils/request'
// 获取文章列表
export const getArticles = ({
  // JavaScript Standard Style 代码风格不允许有非驼峰命名法的
//   但是对象的key是不检查的
  channelId,
  timestamp,
  withTop
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelId, // 频道ID
      timestamp, // 时间戳.请求新的推荐数据穿当前的时间戳，请求历史推荐传指定的时间戳
      with_top: withTop// 是否包含指定，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
    }
  })
}
