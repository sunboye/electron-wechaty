<!--
 * @Author: yangss
 * @Position: 
 * @Date: 2023-05-29 18:17:08
 * @LastEditors: yangss
 * @LastEditTime: 2023-05-30 16:59:32
 * @FilePath: \electron-wechaty\src\views\HomeView.vue
-->
<template>
  <div class="home">
    <!-- inline -->
    <el-form ref="configForm" :model="configForm" label-position="left" label-width="100px">
      <el-form-item label="机器人名称">
        <el-input v-model="configForm.name" clearable placeholder="机器人名称"></el-input>
      </el-form-item>
      <el-form-item label="协议">
        <el-radio-group v-model="configForm.protocol">
          <el-radio :label="0">wechaty-puppet-wechat</el-radio>
          <el-radio :label="1">wechaty-puppet-padlocal</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="configForm.protocol === 1" label="pad协议token">
        <el-input v-model="configForm.padToken" clearable placeholder="该协议不是免费协议，需要token"></el-input>
      </el-form-item>
      <el-form-item label="ApiKey">
        <el-input v-model="configForm.apiKey" clearable placeholder="openAI的apikey"></el-input>
      </el-form-item>
      <el-form-item label="本地代理">
        <el-input v-model="configForm.proxy" clearable placeholder="本地代理地址，例：127.0.0.1:8888">
          <template slot="prepend">http://</template>
        </el-input>
      </el-form-item>
      <el-form-item label="提示时间">
        <el-input v-model="configForm.warnTime" type="number" :min="1" placeholder="几分钟不发消息进行提示用户"></el-input>
      </el-form-item>
      <el-form-item label="清理时间">
        <el-input v-model="configForm.clearTime" type="number" :min="1" placeholder="提示之后几分钟之后清理聊天记录"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row class="btn-row">
          <el-button @click="reset">重置</el-button>
          <el-button class="btn-primary" type="primary" @click="startBot">启动机器人</el-button>
        </el-row>
      </el-form-item>  
    </el-form>
    <div v-if="isLoading" class="load-box">
      <div class="load-con">
        <i class="el-icon-loading" style="font-size: 62px;color:#409EFF;"></i>
        <p class="el-loading-text" style="padding-left: 8px;font-size: 22px;">机器人启动中...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
export default {
  components: {},
  data() {
    return {
      isLoading: false,
      configBase: {
        name: '机器人',
        protocol: 0,
        padToken: '',
        apiKey: '',
        proxy: '',
        warnTime: 10,
        clearTime: 3
      },
      configForm: {
        name: '',
        protocol: 0,
        padToken: '',
        apiKey: '',
        proxy: '',
        warnTime: 10,
        clearTime: 3
      }
    }
  },
  created() {
    this.reset()
  },
  methods: {
    reset() {
      this.configForm = cloneDeep(this.configBase)
    },
    startBot() {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.$router.push('/about')
      }, 6000)
    }
  }
}
</script>
<style scoped>
.btn-row {
  float: right;
}
.load-box {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  overflow: auto;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.4)
}
.load-con {
  top: calc(49% - 62px);
  width: 100%;
  text-align: center;
  position: absolute;
}
</style>
