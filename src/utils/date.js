// 专门处理时间的功能模块
import dayjs from 'dayjs'
import rTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

// 配置使用中文
dayjs.locale('zh-cn')

// 注册使用相对时间插件
dayjs.extend(rTime)

export const relativeTime = dateTime => {
  return dayjs().from(dayjs(dateTime))
}
