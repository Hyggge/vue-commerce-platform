<template>
  <d2-container>
    <template v-slot:header>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="请选择店铺" style="height: 10px">
          <el-select v-model="curShopId" placeholder="请选择">
            <el-option
              v-for="item in shopList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button type="success" style="margin-left: 10px" @click="goToCreateCommodity"> 增加商品 </el-button>
        </el-form-item>
      </el-form>
    </template>
  </d2-container>
</template>

<script>
import api from '@/api'

export default {
  name: 'shop-goods',
  data () {
    return {
      userId: this.$store.state.d2admin.user.info.id,
      shopList: [],
      curShopId: 0,
      curShopDetails: {},
      curCommodityList: []
    }
  },
  methods: {
    async getShopList () {
      const res = await api.GET_USER_SHOP_LIST(this.userId)
      this.shopList = res.owner_shop.concat(res.admin_shop)
    },
    async getShopDetails () {
      const res = await api.GET_SHOP_DETAILS(this.curShopId)
      this.curShopDetails = res
    },
    async getCommodityList () {
      const res = await api.GET_COMMODITY_LIST_FOR_SHOP(this.curShopId, 1, {keyword: '' })
      this.curCommodityList = res.data
      console.log(this.curCommodityList)
    },
    goToCreateCommodity () {
      this.$router.push({
        name: 'commodity-create',
        query: { shopId: this.curShopId }
      })
    }
  },
  watch: {
    curShopId: {
      handler (newVal) {
        this.getShopDetails()
        this.getCommodityList()
      }
    }
  },
  mounted () {
    this.getShopList()
      .then(() => {
        if (this.shopList.length === 0) {
          this.$router.push({ path: '/shop/create' })
          this.$Message.warning('您还没有创建店铺!')
        } else {
          this.curShopId = this.shopList[0].id
          this.getShopDetails()
          this.getCommodityList()
        }
      })
  }
}
</script>

<style scoped>

</style>
