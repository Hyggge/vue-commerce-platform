<script src="../../../api/modules/certificate.api.js"></script>
<template>
  <d2-container>
    <template v-slot:header>
      <h3>学生认证</h3>
    </template>
    <el-row>
      <el-col :span="12" :offset="4" label-width="80px">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="学号">
            <el-input v-model.trim="form.student_id" @blur="checkDupStudentId"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model.trim="form.student_name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="form.gender" :label="0">男</el-radio>
            <el-radio v-model="form.gender" :label="1">女</el-radio>
          </el-form-item>
          <el-form-item label="入学年份">
            <el-date-picker
              style="width: 100%"
              v-model="form.attendance_year"
              type="year"
              placeholder="选择年">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="院系">
            <el-select v-model="form.depart" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即认证</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import api from '@/api'
import { departList } from '@/libs/util.depart'

export default {
  name: 'user-certificate',
  data () {
    return {
      form: {
        student_id: '',
        student_name: '',
        depart: 1,
        attendance_year: '2022',
        gender: 0,
        image_id: 23
      },
      valid: true,
      options: departList
    }
  },
  methods: {
    onSubmit () {
      // 检查表单项是否为空
      if (this.form.student_id === '' || this.form.student_name == '' ) {
        this.$Message.error('表单项不能为空')
        this.valid = false
      }
      // 检查学号是否重复
      this.checkDupStudentId(this.form.student_id)
      // 发起认证请求
      if (this.valid) {
        api.SUBMIT_USER_CERTIFICATE(this.form)
          .then((res) => {
            this.$Message.success('提交成功！')
            this.$router.push({ path: '/user/details' })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    /**
     * 检查用户输入的学号是否已经被认证过
     */
    checkDupStudentId () {
      api.CHECK_DUP_STUDENT_ID(this.form.student_id)
        .then((res) => {
          if (res.exist === true) {
            this.valid = false
            this.$Message.error('该学号已被认证过')
          } else {
            this.valid = true
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>

</style>
