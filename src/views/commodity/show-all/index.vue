<template>
  <d2-container ref="container">
    <template v-slot:header>
      <!--搜索框-->
      <div style="text-align: center">
        <el-input
          type="text"
          prefix-icon="el-icon-search"
          v-model="filter.keyword"
          placeholder="请输入想过搜索的商品名称"
          style="width: 500px; cursor: pointer"
          @keyup.enter.native="getCommodityList(1, filter )"
        ></el-input>
      </div>
      <!--筛选-->
      <el-form :inline="true" :model="filter" class="demo-form-inline">
        <!--<el-form-item label="最低价格">-->
        <!--  <el-input v-model="filter.min_price" placeholder="请输入"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="最高价格">-->
        <!--  <el-input v-model="filter.max_price" placeholder="请输入"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="商品状态">-->
        <!--  <el-select v-model="filter.status" placeholder="请选择" clearable>-->
        <!--    <el-option label="预售中" :value="1">预售中</el-option>-->
        <!--    <el-option label="售卖中" :value="2">售卖中</el-option>-->
        <!--  </el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="交易方式">-->
        <!--  <el-select v-model="filter.method" placeholder="请选择" clearable>-->
        <!--    <el-option label="线上交易" :value="0">线上交易</el-option>-->
        <!--    <el-option label="线下自取" :value="1">线下自取</el-option>-->
        <!--    <el-option label="送货上门" :value="2">送货上门</el-option>-->
        <!--  </el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="最小销量">-->
        <!--  <el-input v-model="filter.min_sale" placeholder="请输入"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
        <!--  <el-button type="primary" @click="getCommodityList(1, filter)">查询</el-button>-->
        <!--</el-form-item>-->
      </el-form>


    </template>
    <!--商品列表-->
    <el-row :gutter="30">
      <el-col v-for="commodity in commodityList" :key="commodity.id" :span="6" style="margin-bottom: 20px">
        <div @click="showDetails(commodity.id)">
          <el-card style="height: 400px; cursor: pointer">
            <div style="height: 200px">
              <img :src="commodity.img_url" style="width: 100%; height: 100%">
            </div>
            <h4 style="height: 70px; color: grey; margin-top: 10px">
              {{modifyIntroduction(commodity.introduction)}}
            </h4>
            <h2>{{commodity.name}}</h2>
            <h2 style="color: #ff8226">
              {{`¥` + (commodity.price - commodity.discount).toFixed(2)}}
            </h2>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <!--分页栏-->
    <div class="block" style="margin-top: 10px">
      <el-pagination
        hi
        background
        layout="prev, pager, next,jumper, ->, total, slot"
        :total="filterTotalCnt"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="12"
        style="text-align: center">
      </el-pagination>
    </div>

  </d2-container>
</template>

<script>
import api from '@/api'

export default {
  name: 'show-all-commodities',
  data () {
    return {
      // 商品列表
      commodityList: [],
      // 搜索关键词
      filter: {
        keyword: '',
        // min_price: 0,
        // max_price: 9999999
        // status: '',
        // method: '',
        // min_salemin_sale: 0,
        // have_stock: ''
      },
      // 当前页面
      currentPage: 1,
      // 筛选之后的记录总数
      filterTotalCnt: 0
    }
  },
  methods: {
    /**
     * 获得商品列表
     */
    async getCommodityList (page, data) {
      console.log(data)
      const res = await api.GET_COMMODITY_LIST_FOR_USER(page, data)
      this.commodityList = res.data
      this.filterTotalCnt = res.tot_count
      console.log(res)
    },
    /**
     * 修改商品介绍
     */
    modifyIntroduction (introduction) {
      const ans = String(introduction)
      if (ans.length > 50) {
        return ans.slice(0, 30)
      } else {
        return ans + '      '
      }
    },
    /**
     * 展示商品细节
     */
    showDetails (commodityId) {
      this.$router.push({ path: `/commodity/show-details/${commodityId}` })
    },
    /**
     * 响应用户对展示页面下标的修改
     * 并重新发送请求
     */
    async handleCurrentChange (value) {
      this.currentPage = value
      await this.getCommodityList(value, { keyword: '' })
      this.$refs.container.scrollToTop()
    }
  },
  mounted () {
    this.getCommodityList(1, { keyword: '' })
  }
}
</script>

<style scoped>

</style>
