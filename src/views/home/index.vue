<template>
  <div class="home">
      <!-- 导航栏 -->
      <van-nav-bar fixed title="首页" />
      <!-- /导航栏 -->

      <!-- 频道列表 -->
      <van-tabs v-model="active">
        <van-tab
          :title="channel.name"
          v-for="channel in channels"
          :key="channel.id">

          <!-- 标签页的内容：频道的文章列表-->
        <van-pull-refresh v-model="channel.pullDownLoading" @refresh="onRefresh">
            <van-list
            v-model="channel.loading"
            :finished="channel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
          <!-- 具体的内容 -->
            <van-cell
              v-for="article in channel.articles"
              :key="article.art_id.toString()"
              :title="article.title"
            >
                <div slot="label">
                  <!-- 文章图片 -->
                  <van-grid :border="false" :column-num="3">
                    <van-grid-item v-for="(img, index) in article.cover.images" :key="index">
                      <!-- vant提供的一个显示图片的组件 -->
                      <van-image height="80" :src="img" Lazy-load />
                    </van-grid-item>
                  </van-grid>
                  <!-- /文章图片 -->
                  <!-- 文章描述信息 -->
                  <div class="article-info">
                    <div class="meta">
                      <span>{{ article.aut_name }}</span>
                      <span>{{ article.comm_count }}评论</span>
                      <!-- 过滤器是函数 使用过滤器就是在调用函数.
                      前面的会作为参数传递给过滤器函数,过滤器函数的返回值
                      过滤器函数的返回值将渲染到这里 -->
                      <span>{{ article.pubdate | relativeTime }}</span>
                    </div>
                  </div>
                  <!-- /文章描述信息 -->
                </div>
            </van-cell>
            <!-- /具体的内容 -->
          </van-list>
        </van-pull-refresh>
          <!-- 标签页的内容 -->
        </van-tab>
        <!-- 面包按钮 -->
        <div slot="nav-right" class="wap-nav" @click="isChannelEditShow=true">
          <van-icon name="wap-nav" size="24" />
        </div>
        <!-- /面包按钮 -->
      </van-tabs>
      <!-- /频道列表 -->

      <!-- 编辑频道 -->
      <van-popup
        v-model="isChannelEditShow"
        position="bottom"
        :style="{ height: '95%' }"
        closeable
        close-icon-position="top-left"
        round
      />
      <!-- /编辑频道 -->
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0, // 控制当前激活的标签页
      channels: [], // 频道列表
      isChannelEditShow: false
    }
  },
  computed: {
    currentChannel () {
      return this.channels[this.active]
    }
  },

  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels() // 获取所有频道列表

      // 为每一个频道初始化一个成员articles，用来存放频道的文章列表
      data.data.channels.forEach(channel => {
        channel.articles = []// 频道的文章列表
        channel.loading = false// 频道的上拉加载更多的loading状态
        channel.finished = false// 频道的加载结束状态
        channel.timestamp = null// 用于获取下一页数据的时间戳(页码)
        channel.pullDownLoading = false // 频道的下拉刷新loading状态
      })
      this.channels = data.data.channels // 将获取到的频道列表赋给data中的数据
    },

    // 上拉加载更多处理函数
    async onLoad () {
      // 1、请求加载文章列表
      const currentChannel = this.currentChannel
      const { data } = await getArticles({
        channelId: currentChannel.id,
        // 第一页数据传递当前最新时间戳
        // 下一页数据传递上一页返回结果中的pre_timestamp
        timestamp: currentChannel.timestamp || Date.now(),
        withTop: 1
      })
      // 因为要多次使用到result和pre_timestamp 为了方便把他结构赋值出来
      const { pre_timestamp: preTimestamp, results } = data.data
      // 2、将得到的文章列表添加到当前频道的articles中
      currentChannel.articles.push(...results)
      // 把数组中的元素一个一个展开  然后添加到数组中  因为results也是一个数组
      // 3、本次onLoad数据加载完毕，将loading设置为false
      currentChannel.loading = false
      // 4、判断数据是否已全部加载完毕
      if (!preTimestamp) {
        currentChannel.finished = true
      } else {
        // 还有数据。将本次得到的preTimestamp存储到当前频道，用于加载下一页数据
        currentChannel.timestamp = preTimestamp
      }
    },

    // 下拉刷新处理函数
    async onRefresh () {
      // 1 请求获取文章列表
      const currentChannel = this.currentChannel
      const { data } = await getArticles({
        channelId: currentChannel.id,
        timestamp: Date.now(),
        withTop: 1
      })
      console.log(data)
      // 2 将请求到的数据添加到articles数据中(添加到顶部)
      currentChannel.articles.unshift(...data.data.results)
      // 3 关闭当前频道下拉刷新的loading状态
      currentChannel.pullDownLoading = false

      // 4.提示用户刷新成功
      this.$toast('刷新成功')
    }

    // onLoad () {
    //   // 异步更新数据
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       // this.list.push(this.list.length + 1)
    //       // 将数据添加到当前频道·文章列表中
    //       const articles = this.currentChannel.articles
    //       articles.push(articles.length + 1)
    //     }
    //     // 加载状态结束
    //     this.currentChannel.loading = false
    //     // 本次loading加载完毕以后，列表数据也渲染到视图了
    //     // 列表组件会判断当前视图数据够不够一屏
    //     // 如果不够会继续触发调用loading事件，会自动将loading设置为true
    //     // 如果够了则会停止出发

    //     // 数据全部加载完成
    //     if (this.currentChannel.articles.length >= 40) {
    //       this.currentChannel.finished = true
    //       // finished:结束
    //     }
    //   }, 500)
    // }
  }
}
</script>

<style lang="less">
 .home {
   .van-tabs {
     .van-tabs__content {
       margin-bottom: 50px;
       margin-top: 90px;
     }
     .van-tabs__wrap{
       position: fixed;
       top: 46px;
       z-index: 2;
       left: 0;
       right: 0;
     }
   }
      .wap-nav {
      position: sticky;
      right: 0;
      display: flex;
      align-items: center;
      background-color: #fff;
      opacity: 0.8;
    }
 }

 .article-info{
   .meta span {
     margin-right: 10px;
   }

 }
</style>
