<!--
 * @Author: yangss
 * @Position: 
 * @Date: 2023-05-29 18:17:08
 * @LastEditors: yangss
 * @LastEditTime: 2023-06-06 18:13:37
 * @FilePath: \electron-wechaty\src\webapps\views\AboutView.vue
-->
<template>
  <div class="about-page">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item style="float:right;height: 45px;">
        <template slot="title">
          <div @click="stopStart" style="margin-top: -8px;">
            <img src="../../../public/icons/icon.png" style="border-radius: 50%;margin-right: 8px;" width="36" height="36" alt="">
            <span>退出</span>
          </div>
        </template>
      </el-menu-item>
    </el-menu>
    <div class="chat-box">
      <pre v-if="messageString">{{messageString}}</pre>
      <div v-else style="text-align:center;margin-top: 10%;opacity: 0.8;">暂无数据</div>
    </div>
  </div>
</template>
<script>
// import { cloneDeep } from 'lodash'
// import { getUserAvatar } from "../../services/common/common.js"
export default {
  components: {},
  data() {
    return {
      messageString: '',
      userImgStr: ''
    }
  },
  created() {
    // getUserAvatar().then(res => {
    //   console.log(res)
    //   this.userImgStr = res
    // })
  },
  mounted() {
    this.getMessage()
    this.getChatMessage()
  },
  methods: {
    getMessage () {
      window.electronAPI.sendMessage((_event, value) => {
        if (value && value.type) {
          this.$message[value.type](value.msg || value.message)
        } else {
          this.$message.success(value)
        }
      })
    },
    getChatMessage() {
      window.electronAPI.sendChatMessage((_event, value) => {
        this.messageString = this.messageString ? `${this.messageString}\n${value}` : value
      })
    },
    stopStart() {
      window.electronAPI.stopBot()
      this.$router.push('/home')
    }
  },
  watch: {
    messageString: {
      handler(val) {
        if (val && val.length > 5000) {
          this.messageString = this.messageString.slice(2000)
        }
      }
    }
  }
}
</script>
<style scoped>
.el-menu-demo {
  position: fixed;
  top: 0px;
  width: 100%;
}
.chat-box {
  width: 100%;
  padding: 16px;
}
</style>