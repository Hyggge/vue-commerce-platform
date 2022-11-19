<script src="../../../router/routes.js"></script>
<template>
  <d2-container>
    <template v-slot:header>
      <h3>用户列表</h3>
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
              @change="queryUsersById"
            />
          </div>
          <div v-else>{{ (scope.row.id) }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        align="center"
        width="180">
        <template v-slot="scope">
          <div v-if="scope.$index === 0">
            <el-input
              v-model="queryUsername"
              size="small"
              placeholder="查询用户"
              @change="queryUsersByUsername"
            />
          </div>
          <div v-else>{{ (scope.row.username) }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        align="center"
        width="180">
        <template v-slot="scope">
          <div v-if="scope.$index === 0">
            <el-input
              v-model="queryNickname"
              size="small"
              placeholder="查询昵称"
              @change="queryUsersByNickname"
            />
          </div>
          <div v-else>{{ (scope.row.nickname) }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        align="center"
        width="180">
        <template v-slot="scope">
          <div v-if="scope.$index === 0">
            <el-input
              v-model="queryEmail"
              size="small"
              placeholder="查询邮箱"
              @change="queryUsersByEmail"
            />
          </div>
          <div v-else>{{ (scope.row.email) }}</div>
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
              @change="queryUsersByRegTime"
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
  name: 'show-users',
  data () {
    return {
      // 用户输入的查询参数
      queryId: '',
      queryUsername: '',
      queryNickname: '',
      queryEmail: '',
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
      // 服务器返回的数据
      tableData: [{}]
    }
  },
  methods: {
    /**
     * 根据curPage,filter,sort_by构造params，并发送请求
     */
    queryUsers () {
      const params = {
        ...this.filter,
        ...this.order_by,
        page: this.currentPage
      }
      api.GET_USER_LIST(params)
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
      this.queryUsers()
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
      this.queryUsers()
    },
    /**
     * 根据用户输入的id进行查询(完全匹配)
     */
    queryUsersById () {
      if (this.queryId !== '') {
        Object.assign(this.filter, { id__exact: this.queryId })
      } else {
        delete this.filter.id__exact
      }
      this.currentPage = 1
      this.queryUsers()
    },
    /**
     * 根据用户输入的用户名进行查询(部分匹配)
     */
    queryUsersByUsername () {
      if (this.queryUsername !== '') {
        Object.assign(this.filter, { username__contains: this.queryUsername })
      } else {
        delete this.filter.username__contains
      }
      this.currentPage = 1
      this.queryUsers()
    },
    /**
     * 根据用户输入的昵称进行查询(部分匹配)
     */
    queryUsersByNickname () {
      if (this.queryNickname !== '') {
        Object.assign(this.filter, { nickname__contains: this.queryNickname })
      } else {
        delete this.filter.nickname__contains
      }
      this.currentPage = 1
      this.queryUsers()
    },
    /**
     * 根据用户输入的邮箱进行查询(部分匹配)
     */
    queryUsersByEmail () {
      if (this.queryEmail !== '') {
        Object.assign(this.filter, { email__contains: this.queryEmail })
      } else {
        delete this.filter.email__contains
      }
      this.currentPage = 1
      this.queryUsers()
    },
    /**
     * 根据用户选择的注册时间进行查询(部分匹配)
     */
    queryUsersByRegTime () {
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
      this.queryUsers()
    }
  },
  mounted () {
    this.currentPage = 1
    this.queryUsers()
  }
}
</script>

<style scoped>

</style>
