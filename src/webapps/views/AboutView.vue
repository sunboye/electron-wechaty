<!--
 * @Author: yangss
 * @Position: 
 * @Date: 2023-05-29 18:17:08
 * @LastEditors: yangss
 * @LastEditTime: 2023-06-12 17:58:52
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
            <img src="../../../public/icons/favicon.png" style="border-radius: 50%;margin-right: 8px;" width="36" height="36" alt="">
            <span>退出</span>
          </div>
        </template>
      </el-menu-item>
    </el-menu>
    <div class="chat-box">
      <div v-if="messageString" style="padding: 16px">
        <pre>{{messageString}}</pre>
      </div>
      <div v-else style="display: flex;margin-top: 15%;opacity: 0.6;justify-content: center;">
        <div>
          <span>可以开始对话了,</span><br/>
          <span>请使用其他微信给当前微信发送消息，暂不支持同一微信使用机器人</span>
          <!-- <span>如果使用当前登录微信，自己和自己对话，则不会唤醒机器人</span><br/>
          <span>如果需要自己和自己对话，唤醒机器人，则需在发送文本前加'chat-'</span><br/>
          <span>例：chat-机器人你好呀</span> -->
        </div>
      </div>
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
      window.electronAPI.updateStartLog((_event, value) => {
        if (value) {
          if (Object.keys(value).includes('success')) {
            if (value.success) {
              this.stopStart()
            } else {
              this.$message.error(value && value.msg ? value.msg : value)
            }
          }
          
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
}
</style>