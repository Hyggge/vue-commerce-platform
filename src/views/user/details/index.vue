<script src="../../../router/routes.js"></script>
<template>
  <d2-container>
     <template v-slot:header>
        <el-row >
          <el-col style="text-align: center">
            <el-avatar style="margin-left: 10px;" :size="150" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
          </el-col>
        </el-row>
         <el-row>
           <el-col style="text-align: center">
             <h2 style="text-align:center">{{auth.username}}</h2>
           </el-col>
         </el-row>
     </template>

    <el-collapse :value="['1', '2']" @change="handleChange">
      <el-collapse-item title="基本信息" name="1">
        <el-descriptions class="margin-top"  :column="2"  border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              用户名
            </template>
            {{userInfo.username}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-service"></i>
              昵称
            </template>
            {{userInfo.nickname}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              居住地
            </template>
            北京市
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              手机号
            </template>
            {{userInfo.phone_no}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-message"></i>
              电子邮箱
            </template>
            {{userInfo.email}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-watch"></i>
              注册时间
            </template>
            {{userInfo.reg_time.slice(0, userInfo.reg_time.indexOf('T'))}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              个性签名
            </template>
            {{userInfo.signature ? userInfo.signature : '暂未设置'}}
          </el-descriptions-item>
        </el-descriptions>
      </el-collapse-item>
      <!--学生认证-->
      <el-collapse-item
        :title="`学生认证(${getStatusInfo(status)})`"
        name="2">
        <!--如果进行了认证-->
        <template v-if="status === 1">
          <el-descriptions class="margin-top"  :column="2"  border>
            <!--学号-->
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                学号
              </template>
              {{lastReqDetails.student_id}}
            </el-descriptions-item>
            <!--学生姓名-->
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                学生姓名
              </template>
              {{lastReqDetails.student_name}}
            </el-descriptions-item>
            <!--学生性别-->
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                学生性别
              </template>
              {{lastReqDetails.gender === 0 ? '男' : '女'}}
            </el-descriptions-item>
            <!--学生入学年份-->
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                入学年份
              </template>
              {{lastReqDetails.attendance_year}}
            </el-descriptions-item>
            <!--学生院系-->
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                学生院系
              </template>
              {{getDepartNameById(lastReqDetails.depart)}}
            </el-descriptions-item>
          </el-descriptions>
        </template>
        <!--如果没有进行认证-->
        <template v-else>
          <el-button type="primary" @click="certificate" v-if="status !== 0">点击这里进行认证</el-button>
          <el-button type="warning" @click="drawer = true">查看历史请求记录</el-button>
        </template>
      </el-collapse-item>
    </el-collapse>

    <el-drawer
      title="历史认证记录"
      :visible.sync="drawer"
      direction="rtl">
      <el-table
        :data="reqList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="req_time"
          label="申请时间"
          align="center"
          width="180">
          <template v-slot="scope">
            {{scope.row.req_time.split('T').join(' ').split('.')[0]}}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="申请状态"
          align="center"
          width="100">
          <template v-slot="scope">
              {{getStatusInfo(scope.row.status)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="details"
          align="center"
          label="详细信息">
          <template v-slot="scope">
              <el-button type="primary" size="mini" @click="getReqDetails(scope.row.id)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>

  </d2-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getDepartNameById } from "@/libs/util.depart";
import api from '@/api'

export default {
  name: 'user-details',
  computed: {
    ...mapState('d2admin/user', {
      auth: 'info'
    })
  },
  data() {
    return {
      drawer: false,
      status: 0,
      userInfo: {},
      certificateInfo: {},
      reqList: [],
      lastReqDetails: {}
    }
  },
  methods: {
    /**
     * 通过院系号码获得院系名称
     */
    getDepartNameById,
    /**
     * 通过status获得具体的认证状态信息
     */
    getStatusInfo(status) {
      return status === -1 ? '未认证' : status === 0 ? '认证中' : status === 1 ? '认证成功' : '认证失败'
    },
    /**
     * 获得用户具体信息
     */
    getUserInfo () {
      api.GET_USER_INFO(this.auth.id)
        .then((res) => {
          console.log(res)
          this.userInfo = res
        })
        .catch((err) => {
          console.log(err)
        })
    },
    /**
     * 获得用户发出的所有请求的列表
     * 以及用户发出的最后一次请求的详细信息
     */
    async getReqList () {
      this.reqList = (await api.GET_USER_CERTIFICATE_REQ_LIST()).auth_reqs
      if (this.reqList.length > 0)
        this.lastReqDetails = await api.GET_USER_CERTIFICATE_REQ_DETAIL(this.reqList[this.reqList.length - 1].id)
      // 认证状态
      if (this.reqList.length === 0) this.status = -1
      else this.status = this.lastReqDetails.status
      console.log(this.status)
    },
    /**
     * 根据请求的ID获得响应请求的详细信息
     */
    async getReqDetails (reqId) {
      const res = await api.GET_USER_CERTIFICATE_REQ_DETAIL(reqId)
      const msg = JSON.stringify(res).slice(1, -1).split(',').join('\n\n')
      this.$alert(msg, '详细信息', {confirmButtonText: '确定'});
    },
    /**
     * 用户发出认证申请
     */
    certificate() {
      this.$router.push({name: 'user-certificate'})
    }
  },
  mounted() {
    this.getUserInfo()
    this.getReqList()
  }
}
</script>

<style scoped>

</style>
