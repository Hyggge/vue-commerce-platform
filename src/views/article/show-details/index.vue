<template>
  <d2-container>
    <template v-slot:header>
      <div class="title">{{articleDetails.title}}</div>
      <div class="info">
        <span class="author">作者: {{articleDetails.user__nickname}}</span>
        <span class="time">发布时间: {{formatTime(articleDetails.post_time)}}</span>
      </div>
      <div class="btn">
        <el-button class="link" size="mini" type="danger" @click="showCommodityDetails"> 商品传送门 </el-button>
        <el-button class="link" size="mini" type="primary" @click="copyLink"> 复制文章连接 </el-button>
      </div>
    </template>

    <!--文章内容-->
    <mavon-render v-model="articleDetails.content.replace(/\n/g, `<br>`)"></mavon-render>

    <!--用户回复-->
    <el-tabs v-model="curPane" class="reply">
      <el-tab-pane label="用户回复" name="reply">
        <reply :articleId="articleId"></reply>
      </el-tab-pane>
    </el-tabs>
  </d2-container>

</template>

<script>
import api from '@/api'
import util from '@/libs/util'
import reply from '@/components/reply'

export default {
  name: 'show-article-details',
  components: { reply },
  data () {
    return {
      articleId: this.$route.params.id,
      articleDetails: {},
      curPane: 'reply'
    }
  },
  methods: {
    formatTime: util.time.formatTime,
    /**
     * 获得商品详情
     */
    async getArticleDetails () {
      this.articleDetails = await api.GET_ARTICLE_DETAILS(this.articleId)
      console.log(this.articleDetails)
    },
    /**
     * 跳转到商品详情页面
     */
    showCommodityDetails () {
      if (this.articleDetails.commodity === null) {
        this.$Message.error('该文章没有关联商品！')
      } else {
        this.$router.push({ path: `/commodity/show-details/${this.articleDetails.commodity.id}` })
      }
    },
    /**
     * 复制当前商品链接
     */
    async copyLink () {
      await this.$copyText(window.location.href)
      this.$Message.success('已经成功复制到剪切板！')
    }
  },
  mounted () {
    this.getArticleDetails()
  }
}
</script>

<style scoped>

.title {
  text-align: center;
  font-size: 40px;
  color: black;
  font-weight: bold;
}
.info {
  text-align: center;
}

.btn {
  text-align: center;
  margin-top: 10px;
}

.author {
  margin-right: 20px;
}

.time {
  margin-right: 20px;
}

.content {
  color: black;
  font-family: "楷体", "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.reply {
  margin-top: 10px;
}

</style>
