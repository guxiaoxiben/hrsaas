<template>
  <div>
    <el-upload list-type="picture-card" :limit="1" action="#" :on-preview="preview" :file-list="fileList" :class="{ disabled: fileComputed }">
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片" :visible.sync="showDialog">
      <img :src="imgUrl" style="width: 100%; max-height: 300px; object-fit: contai" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [{ url: 'https://img1.baidu.com/it/u=1856720522,683752130&fm=253&fmt=auto&app=138&f=JPEG?w=529&h=500' }], // 图片地址设置为数组
      showDialog: false, // 控制显示弹层
      imgUrl: ''
    }
  },
  computed: {
    // 设定一个计算属性 判断是否已经上传完了一张
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    }
  }
}
</script>

<style lang="scss">
// 如果disabled 存在 下面选择器就会成立 +号就会消失
// 反之 不存在 下面选择器不会成立 +号就会存在
.disabled .el-upload--picture-card {
  display: none;
}
</style>
