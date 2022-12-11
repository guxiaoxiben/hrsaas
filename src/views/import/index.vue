<template>
  <!-- 公共导入组件 -->
  <upload-excel :on-success="success" />
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  data() {
    return {
      type: this.$route.query.type
    }
  },
  methods: {
    async success({ header, results }) {
      if (this.type === 'user') {
        // 如果是导入员工
        const userRelations = {
          入职日期: 'timeOfEntry',
          手机号: 'mobile',
          姓名: 'username',
          转正日期: 'correctionTime',
          工号: 'workNumber'
        }
        //   定义一个空输入组
        const arr = []
        //   循环一下导入的 文件
        results.forEach((item) => {
          // 定义一个空数组
          const userInfo = {}
          // 取出 导入的 key值 循环一下
          Object.keys(item).forEach((key) => {
            if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
              userInfo[userRelations[key]] = new Date(this.formatDate(item[key], '/'))
              return
            }
            // 把导入的中文key值 转换成 对应的英文
            userInfo[userRelations[key]] = item[key]
          })
          // 往空数组里面添加
          arr.push(userInfo)
        })
        //   调用接口添加
        await importEmployee(arr)
        //   提示
        this.$message.success('导入成功')
        // 返回上一页
        this.$router.back()
      }
    },
    // 日期转换
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style lang="scss" scoped></style>
