<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :file-list="fileList"
      :class="{ disabled: fileComputed }"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片" :visible.sync="showDialog">
      <img :src="imgUrl" style="width: 100%; max-height: 300px; object-fit: contai" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5' // 引入腾讯云的包
// 需要实例化
const cos = new COS({
  SecretId: 'AKIDa4ReeTDpFTVLy2ujMoCWkqliS9g1BGDF',
  SecretKey: 'xgKisvnX5UingNxOjz87uWyLakssfCYg'
}) // 实例化的包 已经具有了上传的能力 可以上传到该账号里面的存储桶了

export default {
  data() {
    return {
      fileList: [], // 图片地址设置为数组
      showDialog: false, // 控制显示弹层
      imgUrl: '',
      // 记录的uid
      currentFileUid: ''
    }
  },
  computed: {
    // 设定一个计算属性 判断是否已经上传完了一张
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    // 选择文件
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    // 删除 三个参数 file是要删除的文件 fileList是删除之后的文件 this.fileList是文件详情
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid)
    },
    // 添加
    changeFile(file, fileList) {
      this.fileList = fileList.map((item) => item)
    },
    // 检查文件
    beforeUpload(file) {
      // 文件的类型
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      // 判断是否不满足上面的 不满足 提示一下格式 和 return false
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024
      // 判断一下 文件大小是否大于咱们设置的最大值 大的话 提示一下一下不能超多咱们设置的最大值 并且 return flase
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      // 记录一下当前的uid
      this.currentFileUid = file.uid
      // 上面都满足了[格式|大小]  return true
      return true
    },
    // 上传
    upload(params) {
      // 判断文件是否存在
      if (params.file) {
        cos.putObject(
          {
            Bucket: 'benbenxiong-1315921248', // 存储桶名称
            Region: 'ap-beijing', // 存储桶地域
            Key: params.file.name, // 文件名作为key
            StorageClass: 'STANDARD', // 此类写死
            Body: params.file, // 将本地的文件赋值给腾讯云配置
            // 进度条
            onProgress: (params) => {
              this.percent = params.percent * 100
            }
          },
          (err, data) => {
            // console.log(err, data)
            if (!err && data.statusCode === 200) {
              this.fileList = this.fileList.map((item) => {
                if (item.uid === this.currentFileUid) {
                  // 将本地地址转换成腾讯云上面的地址
                  return { url: 'http://' + data.Location, upload: true }
                }
                return item
              })
            }
            setTimeout(() => {
              this.showPercent = false // 隐藏进度条
              this.percent = 0 // 进度归0
            }, 2000)
          }
        )
      }
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
