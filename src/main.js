import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'

// 这种加载方式没有携带任何内置的验证规则
// import { extend } from 'vee-validate'

// 如果需要使用其内置的验证规则，则使用这种方式来配置
// import { ValidationProvider, extend } from 'vee-validate/dist/vee-validate.full'

import {
  ValidationProvider,
  extend,
  ValidationObserver
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'// 加载所有的验证规则
import zhCN from 'vee-validate/dist/locale/zh_CN'

// loop over all rules
import {
  Button,
  Cell,
  CellGroup,
  NavBar,
  Field,
  Toast
} from 'vant'
Vue
  .use(Button)
  .use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Field)
  .use(Toast)

for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: zhCN.messages[rule] // add its message
  })
}
// 一个原则：有内置的使用内置的  没有内置的再自定义
extend('phone', {
  validate (value) {
    return /^1\d{10}$/.test(value)
  },
  message: '必须是手机号'
})

// 配置表单验证插件
// Add a rule.
// 自定义添加验证规则
// extend('secret', {
//   validate: value => value === 'example',
//   // 错误消息提示
//   message: 'This is not the magic word'
// })
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
