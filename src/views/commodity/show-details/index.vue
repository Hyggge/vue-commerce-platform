<template>
  <d2-container>
    <template v-slot:header>
      <h2>{{commodityDetails.name}}</h2>

    </template>
    <el-row style="padding-top: 10px">
      <el-col :span="9" :offset="1">
        <img :src="commodityDetails.img_url" style="border-radius: 20px; width: 100%">
      </el-col>
      <el-col :span="12" :offset="1" style="margin-top: 15px">
        <!--商品介绍-->
        <h3 style="color: black">
          {{commodityDetails.introduction}}
        </h3>
        <!--商品销售-->
        <h5 style="color: lightslategray">
          已售 {{commodityDetails.sale}}
        </h5>
        <!--价格-->
        <h1 style="color: #ff8226; padding-top: 10px">
          <span style="font-size: 12px">¥</span>
          {{this.curPrice}}
        </h1>
        <!--<hr>-->
        <!--商品余量-->
        <el-row class="term">
          <el-col class="title" :span="3"> 商品余量:</el-col>
          <el-col class="content" :span="20">
            {{commodityDetails.total - commodityDetails.sale}}
          </el-col>
        </el-row>
        <!--交易方式-->
        <el-row class="term">
          <el-col class="title" :span="3"> 交易方式:</el-col>
          <el-col class="content" :span="20">
            <el-tag v-if="commodityDetails.method === 0" type="success" size="mini"><strong>线上交易</strong></el-tag>
            <el-tag v-if="commodityDetails.method === 1" type="primary" size="mini"><strong>线下自取</strong></el-tag>
            <el-tag v-if="commodityDetails.method === 2" type="warning" size="mini"><strong>送货上门</strong></el-tag>
          </el-col>
        </el-row>
        <!--商品状态-->
        <el-row class="term">
          <el-col class="title" :span="3"> 商品状态:</el-col>
          <el-col class="content" :span="20">
            <el-tag v-if="commodityDetails.status === 0" type="primary" size="mini"><strong>未生效</strong></el-tag>
            <el-tag v-if="commodityDetails.status === 1" type="warning" size="mini"><strong>预售中</strong></el-tag>
            <el-tag v-if="commodityDetails.status === 2" type="success" size="mini"><strong>售卖中</strong></el-tag>
            <el-tag v-if="commodityDetails.status === 3" type="info" size="mini"><strong>已下架</strong></el-tag>
          </el-col>
        </el-row>
        <!--商品属性-->
        <el-row class="term" v-for="(param, paramIndex) in commodityDetails.parameters" :key="param.id">
          <el-col class="title" :span="3"> {{param.name}}:</el-col>
          <el-col class="content" :span="20">
            <el-radio-group v-model="selectedOptions[paramIndex]" size="mini">
              <el-radio v-for="option in param.options" :key="option.id"
                        style="margin-right: 10px;"
                        @change="onClick(paramIndex, option.add)"
                        :label="option.id" border>
              {{option.description}}
              </el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-tabs v-model="curPane">
      <el-tab-pane label="用户评论" name="comments">
      <comments></comments>

      </el-tab-pane>

    </el-tabs>
  </d2-container>
</template>

<script>
import api from '@/api'
import comments from '@/components/comments'

export default {
  name: 'show-commodity-details-for-user',
  components: { comments },
  data () {
    return {
      commodityId: '',
      commodityDetails: {},
      selectedOptions: [],
      selectedAdditions: [],
      curPrice: 0,
      curPane: 'comments'
    }
  },
  methods: {
    /**
     * 获得商品的详细信息
     */
    async getCommodityDetails () {
      this.commodityDetails = await api.GET_COMMODITY_DETIALS(this.commodityId)
      this.commodityDetails.parameters.forEach(() => {
        this.selectedOptions.unshift(0)
        this.selectedAdditions.unshift(0)
      })
      this.curPrice = this.calcPrice()
      console.log(this.commodityDetails)
    },
    /**
     * 根据原价格、折扣、参数加成计算总价格
     */
    formatPrice (oriPrice, discount, addition) {
      return (parseFloat(oriPrice) - parseFloat(discount) + parseFloat(addition)).toFixed(2)
    },
    /**
     * 计算实际价格
     */
    calcPrice () {
      let addSum = 0
      this.selectedAdditions.forEach((value, index) => {
        addSum += parseFloat(value)
      })
      return this.formatPrice(this.commodityDetails.price, this.commodityDetails.discount, addSum)
    },
    /**
     * 点击选项时执行
     */
    onClick (paramIndex, addition) {
      this.selectedAdditions[paramIndex] = addition
      this.curPrice = this.calcPrice()
    }
  },
  mounted () {
    this.commodityId = this.$route.params.id
    this.getCommodityDetails()
  }
}
</script>

<style scoped>
  .term {
    padding-top: 15px;
  }

  .title {
    color: lightslategray;
    font-size: 12px;
    font-weight: bold;
    vertical-align: center;
  }

  .content {
    padding-left: 10px;
    font-size: 12px;
  }
</style>
