<!--
 * @Author: yangss
 * @Position: 
 * @Date: 2023-05-29 18:17:08
 * @LastEditors: yangss
 * @LastEditTime: 2023-06-05 22:12:48
 * @FilePath: \electron-wechaty\src\webapps\views\HomeView.vue
-->
<template>
  <div class="home">
    <!-- inline -->
    <el-form ref="configForm" :model="configForm" :rules="configRules" label-position="left" label-width="100px">
      <el-form-item label="机器人名称" prop="name">
        <el-input v-model="configForm.name" clearable placeholder="机器人名称"></el-input>
      </el-form-item>
      <el-form-item label="协议">
        <el-radio-group v-model="configForm.protocol">
          <el-radio label="wechaty-puppet-wechat">wechaty-puppet-wechat</el-radio>
          <!-- <el-radio label="wechaty-puppet-wechat4u">wechaty-puppet-wechat4u</el-radio> -->
          <el-radio label="wechaty-puppet-padlocal">wechaty-puppet-padlocal</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="configForm.protocol === 'wechaty-puppet-padlocal'" label="token" prop="padToken">
        <el-input v-model="configForm.padToken" clearable placeholder="padlocal协议不是免费协议，需要token"></el-input>
      </el-form-item>
      <el-form-item label="ApiKey" prop="apiKey">
        <el-input v-model="configForm.apiKey" clearable placeholder="openAI的apikey"></el-input>
      </el-form-item>
      <el-form-item label="本地代理" prop="proxy">
        <el-input v-model="configForm.proxy" clearable placeholder="本地代理地址，例：127.0.0.1:8888">
          <template slot="prepend">http://</template>
        </el-input>
      </el-form-item>
      <el-form-item label="提示时间" prop="warnTime">
        <el-input v-model="configForm.warnTime" type="number" :min="1" :max="60" placeholder="几分钟不发消息进行提示用户"></el-input>
      </el-form-item>
      <el-form-item label="清理时间" prop="clearTime">
        <el-input v-model="configForm.clearTime" type="number" :min="1" :max="10" placeholder="提示之后几分钟之后清理聊天记录缓存"></el-input>
      </el-form-item>
      <el-form-item label="功能定制" prop="childs">
        <el-checkbox-group v-model="configForm.childs">
          <el-checkbox v-for="item in childModes" :key="item.keyword" :label="item.keyword" :disabled="item.keyword === 'model-welcome'">{{item.title}}</el-checkbox>
        </el-checkbox-group>
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
import Validate from '../common/validaters.js'

export default {
  components: {},
  data() {
    return {
      isLoading: false,
      configData: {},
      childData: {},
      childModes: [],
      configBase: {
        name: '机器人',
        protocol: 'wechaty-puppet-wechat',
        padToken: '',
        apiKey: '',
        proxy: '',
        warnTime: 10,
        clearTime: 3,
        childs: ['model-welcome']
      },
      configForm: {
        name: '机器人',
        protocol: 'wechaty-puppet-wechat',
        padToken: '',
        apiKey: '',
        proxy: '',
        warnTime: 10,
        clearTime: 3,
        childs: ['model-welcome']
      },
      configRules: {
        name: [Validate.NotNull],
        padToken: [Validate.NotNull],
        apiKey: [Validate.NotNull],
        warnTime: [Validate.NotNull, Validate.integerNum, Validate.MinNum(1), Validate.MaxNum(60)],
        clearTime: [Validate.NotNull, Validate.integerNum, Validate.MinNum(1), Validate.MaxNum(10)],
      }
    }
  },
  created() {
    this.reset()
  },
  methods: {
    reset() {
      Promise.all([window.electronAPI.getBotConfig(), window.electronAPI.getChildModel()]).then(([config, child]) => {
        if (config && Object.keys(config).length) {
          this.configData = cloneDeep(config)
          this.configBase.name = config.puppet.name
          this.configBase.protocol = config.puppet.puppet
          this.configBase.padToken = config.puppet.puppetOptions && config.puppet.puppetOptions.token ? config.puppet.puppetOptions.token : ''
          this.configBase.apiKey = config.openai.apiKey || config.openai.apikey 
          this.configBase.proxy = config.openai.proxy && config.openai.proxy.indexOf('//') ? config.openai.proxy.split('//')[1] : config.openai.proxy || ''
          this.configBase.warnTime = config.bot.warnTime
          this.configBase.clearTime = config.bot.clearTime
        }
        if (child && Object.keys(child).length) {
          console.log(child)
          this.childData = cloneDeep(child)
          const keys = Object.keys(child)
          keys.forEach(k => {
            child[k].keyword = k
            child[k].open && this.configBase.childs.push(k)
            this.childModes.push(child[k])
          })
        }
        this.configForm = cloneDeep(this.configBase)
      })
    },
    startBot() {
      this.isLoading = true
      // setTimeout(() => {
      //   this.isLoading = false
      //   this.$router.push('/about')
      // config
      this.configData.puppet.name = this.configForm.name
      if (this.configForm.protocol === 'wechaty-puppet-padlocal') {
        this.configData.puppet.puppet = this.configForm.protocol
        this.configData.puppet.puppetOptions = {
          token: this.configForm.padToken
        }
      } else {
        this.configData.puppet.puppet = this.configForm.protocol
        this.configData.puppet.puppetOptions = {
          uos: true
        }
      }
      this.configData.openai.apiKey = this.configForm.apiKey
      this.configData.openai.proxy = this.configForm.proxy
      this.configData.bot.warnTime = Number(this.configForm.warnTime)
      this.configData.bot.clearTime = Number(this.configForm.clearTime)
      // child
      const keys = Object.keys(this.childData)
      keys.forEach(k => {
        this.childData[k].open = this.configForm.childs && this.configForm.childs.length && this.configForm.childs.includes(k)
      })
      console.log(this.configData)
      console.log(this.childData)
      Promise.all([window.electronAPI.setBotConfig(this.configData), window.electronAPI.setChildModel(this.childData)]).then(([config, child]) => {
        if (config.success && child.success) {
          window.electronAPI.startBot()
        } else {
          this.$message.error(config.success ? child.msg || config.msg : config.msg || child.msg)
        }
      }).finally(() => {
        this.isLoading = false
      })
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
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.4)
}
.load-con {
  top: calc(49% - 62px);
  width: 100%;
  text-align: center;
  position: absolute;
}
</style>
