<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账号设置">
            <el-form :model="formData" label-width="120px" style="margin-left: 120px; margin-top: 30px">
              <el-form-item label="姓名">
                <el-input v-model="formData.name" style="width: 300px"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="formData.password" style="width: 300px" type="password"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-button type="primary">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情"></el-tab-pane>
          <el-tab-pane label="岗位信息"></el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '王大锤',
        password: '1212121'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
