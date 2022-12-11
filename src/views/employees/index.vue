<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 公共组件 -->
      <page-tools :show-before="true">
        <template v-slot:before>共{{ page.total }}条记录</template>
        <template v-slot:after>
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary" @click="add">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-card v-loading="loading">
        <el-table border :data="list">
          <el-table-column type="index" align="center" label="序号" sortable="" />
          <el-table-column align="center" prop="username" label="姓名" sortable="" />
          <el-table-column align="center" prop="workNumber" label="工号" sortable="" />
          <el-table-column align="center" prop="formOfEmployment" label="聘用形式" sortable="" :formatter="formatEmployment" />
          <el-table-column align="center" prop="departmentName" label="部门" sortable="" />
          <el-table-column align="center" label="入职时间" sortable="">
            <!-- 时间转换 -->
            <template slot-scope="{ row }">{{ row.timeOfEntry | formatDate }}</template>
          </el-table-column>
          <el-table-column align="center" prop="enableState" label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <!-- 开关UI -->
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination layout="prev, pager, next" :total="page.total" :page-size="page.size" :current-page="page.page" @current-change="changePage"> </el-pagination>
        </el-row>
      </el-card>
      <AddDemployee :show-dialog.sync="showDialog"></AddDemployee>
    </div>
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddDemployee from './components/add-employee.vue'
export default {
  components: {
    AddDemployee
  },
  data() {
    return {
      loading: false,
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      showDialog: false
    }
  },
  created() {
    this.getEmployeeList()
  },

  methods: {
    // 分页切换
    changePage(page) {
      // 把得到的页码数重新复制给 页码数
      this.page.page = page
      // 根据新的页码数 重新获取数据
      this.getEmployeeList()
    },
    // 获取员工数据
    async getEmployeeList() {
      this.loading = true
      const { rows, total } = await getEmployeeList(this.page)
      console.log(rows)
      console.log(total)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    // 格式化聘用形式
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find((item) => item.id === +cellValue)
      return obj ? obj.value : '未知'
    },
    // 删除员工
    async delEmployee(id) {
      try {
        await this.$confirm('确定要删除吗？')
        await delEmployee(id)
        this.getEmployeeList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 添加
    add() {
      this.showDialog = true
    }
  }
}
</script>

<style></style>
