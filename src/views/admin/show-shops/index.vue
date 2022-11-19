<template>
 <d2-container>
   <template v-slot:header>
     <h3>店铺列表</h3>
   </template>
   <el-table
     :data="tableData"
     style="width: 100%"
     border
     highlight-current-row
     @sort-change="handleSortChange"
   >
     <el-table-column
       prop="id"
       label="ID"
       align="center"
       sortable="custom"
       width="100">
       <template v-slot="scope">
         <div v-if="scope.$index === 0">
           <el-input
             v-model="queryId"
             size="small"
             placeholder="查询id"
             @change="queryShopsById"
           />
         </div>
         <div v-else>{{ (scope.row.id) }}</div>
       </template>
     </el-table-column>
     <el-table-column
       prop="name"
       label="店铺名"
       align="center"
       width="180">
       <template v-slot="scope">
         <div v-if="scope.$index === 0">
           <el-input
             v-model="queryName"
             size="small"
             placeholder="查询店铺"
             @change="queryShopsByName"
           />
         </div>
         <div v-else>{{ (scope.row.name) }}</div>
       </template>
     </el-table-column>
     <el-table-column
       prop="type"
       label="店铺类型"
       align="center"
       width="180">
       <template v-slot="scope">
         <div v-if="scope.$index === 0">
           <el-input
             v-model="queryType"
             size="small"
             placeholder="查询店铺类型"
             @change="queryShopsByType"
           />
         </div>
         <div v-else>{{ (scope.row.type) }}</div>
       </template>
     </el-table-column>
     <el-table-column
       prop="owner"
       label="店铺所有者"
       align="center"
       width="180">
       <template v-slot="scope">
         <div v-if="scope.$index === 0">
           <el-input
             v-model="queryOwner"
             size="small"
             placeholder="查询店铺所有者"
             @change="queryShopsByOwner"
           />
         </div>
         <div v-else>{{ (scope.row.owner) }}</div>
       </template>
     </el-table-column>
     <el-table-column
       prop="reg_time"
       label="注册时间"
       align="center"
       width="200">
       <template v-slot="scope">
         <div v-if="scope.$index === 0">
           <el-date-picker
             v-model="queryRegTime"
             type="date"
             value-format="yyyy-MM-dd"
             @change="queryShopsByRegTime"
             placeholder="选择日期">
           </el-date-picker>
         </div>
         <div v-else>{{ (scope.row.reg_time) }}</div>
       </template>
     </el-table-column>
   </el-table>
   <!--分页栏-->
   <div class="block" style="margin-top: 10px">
     <el-pagination
       hi
       background
       layout="prev, pager, next,jumper, ->, total, slot"
       :total="filterCnt"
       @current-change="handleCurrentChange"
       :current-page="currentPage"
       :page-size="10"
       style="text-align: center">
     </el-pagination>
   </div>
 </d2-container>
</template>

<script>
import api from '@/api'

export default {
  name: 'show-shops',
  data () {
    return {
      queryId: '',
      queryName: '',
      queryType: '',
      queryOwner: '',
      queryRegTime: '',
      // 当前页面
      currentPage: 1,
      // 筛选之后的记录总数
      filterCnt: 0,
      // 筛选器和排序规则，用于构造请求的params
      filter: {},
      order_by: {
        order_by: 'id'
      },
      tableData: [
        {},
        {
          id: 1,
          name: 'name',
          type: '合作店铺',
          owner: '陈正昊',
          reg_time: 'sssss'
        },
      ]
    }
  },
  methods: {
    /**
     * 根据curPage,filter,sort_by构造params，并发送请求
     */
    queryShops () {
      const params = {
        ...this.filter,
        ...this.order_by,
        page: this.currentPage
      }
      api.GET_SHOP_LIST(params)
        .then((data) => {
          console.log(data)
          this.tableData = data.data
          this.tableData.unshift({})
          this.filterCnt = data.filter_count
        }).catch((err) => {
          console.log(err.response.data)
        })
    },
    /**
     * 响应用户对展示页面下标的修改
     * 并重新发送请求
     * @param value
     */
    handleCurrentChange (value) {
      this.currentPage = value
      this.queryShops()
    },
    /**
     * 响应用户对排序规则的修改
     * 并重新发送请求
     * @param value
     */
    handleSortChange (value) {
      if (value.prop === 'id') {
        if (value.order === 'ascending') {
          Object.assign(this.order_by, { order_by: 'id' })
        } else if (value.order === 'descending') {
          Object.assign(this.order_by, { order_by: '-id' })
        } else {
          Object.assign(this.order_by, { order_by: 'id' })
        }
      }
      this.currentPage = 1
      this.queryShops()
    },
    /**
     * 根据用户输入的id进行查询(完全匹配)
     */
    queryShopsById () {
      if (this.queryId !== '') {
        Object.assign(this.filter, { id__exact: this.queryId })
      } else {
        delete this.filter.id__exact
      }
      this.currentPage = 1
      this.queryShops()
    },
    /**
     * 根据用户输入的店铺名进行查询(部分匹配)
     */
    queryShopsByName () {
      if (this.queryName !== '') {
        Object.assign(this.filter, { name__contains: this.queryName })
      } else {
        delete this.filter.name__contains
      }
      this.currentPage = 1
      this.queryShops()
    },
    /**
     * 根据用户输入的店铺类型进行查询(部分匹配)
     */
    queryShopsByType () {
      if (this.queryType !== '') {
        Object.assign(this.filter, { type__exact: this.queryType })
      } else {
        delete this.filter.type__exact
      }
      this.currentPage = 1
      this.queryShops()
    },
    /**
     * 根据用户输入的所有者进行查询(部分匹配)
     */
    queryShopsByOwner () {
      if (this.queryOwner !== '') {
        Object.assign(this.filter, { owner__contains: this.queryEmail })
      } else {
        delete this.filter.owner__contains
      }
      this.currentPage = 1
      this.queryShops()
    },
    /**
     * 根据用户选择的注册时间进行查询(部分匹配)
     */
    queryShopsByRegTime () {
      console.log(this.queryRegTime)
      if (this.queryRegTime !== null && this.queryRegTime !== '') {
        const date = this.queryRegTime.split('-')
        Object.assign(this.filter, { reg_time__year: date[0], reg_time__month: date[1], reg_time__day: date[2] })
      } else {
        delete this.filter.reg_time__year
        delete this.filter.reg_time__month
        delete this.filter.reg_time__day
      }
      this.currentPage = 1
      this.queryShops()
    }
  }
}
</script>

<style scoped>

</style>
