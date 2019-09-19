<template>
      <!-- 导航栏 -->
  <div class="login">
    <van-nav-bar title="登录"/>
      <!-- /导航栏 -->
<!-- ValidationProvider是验证插件提供的一个全局组件
     rules="secret"用来配置验证规则
     v-slot="{ errors }用来获取验证相关的结果参数
     errors[0]用来获取验证失败的错误消息
 -->
    <!-- <ValidationProvider rules="required|email" name="手机号" v-slot="{ errors }">
      <input v-model="user.mobile" type="text">
      <span>{{ errors[0] }}</span>
    </ValidationProvider> -->
      <!-- 登录表单 -->
    <!-- ValidationObserver这个组件会渲染成一个form表单
        可以通过ref来调用这个组件的方法：validate来进行js验证
     -->

    <ValidationObserver tag="form" ref="loginForm">
      <!-- 把需要验证的字段使用ValidationProvider包裹起来
      在其上面配置对应的验证规则等信息 -->
      <ValidationProvider tag="div" name="手机号" rules="required|phone" v-slot="{ errors }">
        <van-field
          v-model="user.mobile"
          required
          clearable
          label="手机号"
          placeholder="请输入手机号"
          :error-message="errors[0]"
        />
      </ValidationProvider>
      <ValidationProvider tag="div" name="验证码" rules="required" v-slot="{ errors }">
        <van-field
        v-model="user.code"
        type="password"
        label="验证码"
        placeholder="请输入验证码"
        required
        :error-message="errors[0]"
      />
      </ValidationProvider>
    </ValidationObserver>

      <!-- /登录表单 -->

      <!-- 登录按钮 -->
      <div class="login-wrap">
        <van-button type="info" :loading="isloginloading" @click="onlogin">登录</van-button>
      </div>
      <!-- /登录按钮 -->

  </div>
</template>

<script>
import {login} from '@/api/user'
export default {
  name:'loginIndex',
  data(){
    return {
      user:{
        mobile:'',
        code:''
      },
      isloginloading:false //控制登录按钮的loading状态
    }
  },
  methods: {
   async onlogin () {
    //  获取表单数据
    //  发送请求
    try{
      // 表单验证
     const isValid = await this.$refs.loginForm.validate()
      // 如果验证失败则什么都不做
      if(!isValid){
        return 
      }

      //验证通过提交表单
      this.isloginloading=true
      const{data} = await login(this.user)

    // 成功后将数据打印出来
      console.log(data)
      this.$toast.success('牛逼克拉斯！')
    }catch(err){
      if(err.response&&err.response.status===400){
        this.$toast.fail('失败,手机号或验证码错误！')
      }
    }
    //无论登录成功与否，都要让loading效果停止
      this.isloginloading=false
    }
  }
}
</script>

<style lang="less" scoped>
  .login{
    .login-wrap{
      padding: 20px;
      .van-button{
        width: 100%;
        background-color: orange;
      }
    }
  }
</style>