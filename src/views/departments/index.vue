<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构 -->
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <TreeTools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!-- 放一个 el-tree -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
          <TreeTools slot-scope="{ data }" :tree-node="data" @del-dept="delDepartments" @addDepts="addDepts" @editDepts="editDepts" />
        </el-tree>
      </el-card>
    </div>
    <AddDept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="addition" @upDepts="upDepts" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept'
import { getDepartments, delDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      // 显示 添加弹窗
      showDialog: false,
      node: null,
      // 组织架构数据
      departs: [
        { name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' }
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    // 获取数据
    async getDepartments() {
      const { companyName, depts } = await getDepartments()
      // console.log(result)
      this.company = { name: companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(depts, '')
    },
    // 删除功能
    delDepartments(id) {
      delDepartments(id)
      this.getDepartments()
      this.$message.success('删除成功')
    },
    // 添加功能
    addDepts(node) {
      this.showDialog = true
      this.node = node
    },
    // 添加 刷新、提示
    addition() {
      // 刷新
      this.getDepartments()
      // 提示
      this.$message.success('添加成功')
    },
    // 编辑部门
    editDepts(node) {
      this.showDialog = true
      this.node = node
      this.$refs.addDept.getDepartDetail(node.id)
    },
    // 编辑 刷新、提示
    upDepts() {
      // 刷新
      this.getDepartments()
      // 提示
      this.$message.success('修改成功')
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
