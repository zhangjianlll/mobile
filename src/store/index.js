import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储token 需要初始化一个数据
    user: getItem('lala')
  },
  mutations: {
    // 3,登录成功，调用mutation将token存储到vuex容器中，为了防止丢失在将他存储到本地
    // 2，添加一个mutation  用来修改state中的数据
    setUser (state, user) {
      state.user = user
      // 4.为了防止页面刷新token值丢失，还需要把他存储到本地仓库
      setItem('lala', state.user)
    }
  },
  actions: {

  }
})
