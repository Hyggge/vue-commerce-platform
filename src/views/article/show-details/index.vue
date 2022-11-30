<template>
  <d2-container>
    <template v-slot:header>
      <div class="title">{{articleDetails.title}}</div>
      <div class="info">
        <span class="author">作者: {{articleDetails.user__nickname}}</span>
        <span class="time">发布时间: {{formatTime(articleDetails.post_time)}}</span>
        <el-button class="link" size="mini" type="primary" @click="showCommodityDetails"> 商品传送门 </el-button>
      </div>
    </template>

    <!--文章内容-->
    <div class="content">
      {{articleDetails.content}}
    </div>

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
      this.$router.push({ path: `/commodity/show-details/${this.articleDetails.commodity.id}`})
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
  margin-top: 100px;
}

</style>
