<template>
  <d2-container>
    <!--搜索框-->
    <template v-slot:header>
      这是一个搜索框
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
  </d2-container>
</template>

<script>
import api from '@/api'

export default {
  name: 'show-all-commodities',
  data () {
    return {
      commodityList: [],
      keyword: ''
    }
  },
  methods: {
    async getCommodityList (page, data) {
      const res = await api.GET_COMMODITY_LIST_FOR_USER(page, data)
      this.commodityList = res.data
      console.log(res)
    },
    modifyIntroduction (introduction) {
      const ans = String(introduction)
      if (ans.length > 50) {
        return ans.slice(0, 30)
      } else {
        return ans + '      '
      }
    },
    showDetails (commodityId) {
      this.$router.push({ path: `/commodity/show-details/${commodityId}` })
    }
  },
  mounted () {
    this.getCommodityList(1, { keyword: '' })
  }
}
</script>

<style scoped>

</style>
