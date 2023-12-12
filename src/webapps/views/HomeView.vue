<!--
 * @Author: yangss
 * @Position: 
 * @Date: 2023-05-29 18:17:08
 * @LastEditors: yangss
 * @LastEditTime: 2023-06-21 10:42:46
 * @FilePath: \electron-wechaty\src\webapps\views\HomeView.vue
-->
<template>
  <div class="home-page">
    <!-- inline -->
    <el-form ref="configForm" :model="configForm" :rules="configRules" label-position="left" label-width="100px">
      <!-- <el-form-item label="机器人名称" prop="name">
        <el-input v-model="configForm.name" clearable placeholder="机器人名称"></el-input>
      </el-form-item> -->
      <el-form-item label="协议">
        <el-radio-group v-model="configForm.protocol">
          <el-radio label="wechaty-puppet-wechat">wechaty-puppet-wechat</el-radio>
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
      <el-form-item label="model" prop="model">
        <el-input v-model="configForm.model" clearable placeholder="model"></el-input>
      </el-form-item>
      <el-form-item label="maxTokens" prop="maxTokens">
        <el-input v-model="configForm.maxTokens" type="number" :min="500" :max="4097" clearable placeholder="model"></el-input>
      </el-form-item>
      <el-form-item label="提示时间" prop="warnTime">
        <el-input v-model="configForm.warnTime" type="number" :min="1" :max="60" placeholder="几分钟不发消息进行提示用户"></el-input>
      </el-form-item>
      <el-form-item label="清理时间" prop="clearTime">
        <el-input v-model="configForm.clearTime" type="number" :min="1" :max="10" placeholder="提示之后几分钟之后清理聊天记录缓存"></el-input>
      </el-form-item>
      <el-form-item label="基本功能" prop="childs">
        <el-checkbox-group v-model="configForm.childs">
          <el-checkbox v-for="item in childModes" :key="item.keyword" :label="item.keyword" :disabled="item.keyword === 'model-welcome'">{{item.title}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- <el-form-item label="定时任务" prop="childs">
        <el-checkbox-group v-model="configForm.childs">
          <el-checkbox v-for="item in childModes" :key="item.keyword" :label="item.keyword" :disabled="item.keyword === 'model-welcome'">{{item.title}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <el-form-item>
        <el-row class="btn-row">
          <!-- <el-button @click="$router.push('/about')">前进</el-button>
          <el-button @click="stopStart">退出</el-button> -->
          <el-button @click="reset">重置</el-button>
          <el-button class="btn-primary" type="primary" @click="startBot">启动机器人</el-button>
        </el-row>
      </el-form-item>   
    </el-form>
    <div v-if="isLoading" class="load-box">
      <div class="load-con">
        <div style="text-align: center">
          <i class="el-icon-loading" style="font-size: 62px;color:#409EFF;"></i>
        </div>
        <div v-if="qrcodeImageUrl" style="padding: 32px;text-align: center;">
          <div style="position: relative;">
            <img :src="qrcodeImageUrl" width="200" height="200" alt="">
            <div v-if="qrcodeMsg" style="z-index: 1000;width: 200px; height:200px;background-color: rgba(0, 0, 0, 0.9);position: absolute;display: inline-block;margin-left: -200px;">
              <span style="line-height: 200px;color: #ffffff;">{{qrcodeMsg}}</span>
            </div>
            <p class="el-loading-text" style="padding-left: 8px;font-size: 22px;color: #ffffff;">{{qrcodeMsg ? qrcodeMsg : '请使用手机微信扫描二维码'}}</p>
          </div>
        </div>
        <div v-else-if="startLogging" style="padding: 24px">
          <pre class="el-loading-text" style="padding-left: 8px;font-size: 22px;color: #ffffff;">{{startLogging}}</pre>
        </div>
        <p v-else class="el-loading-text" style="padding-left: 8px;font-size: 22px;color: #ffffff;text-align: center;">{{reTimes > 1 ? `重新启动中...(${reTimes})` : '机器人启动中...'}}</p>
      </div>
      <el-row v-if="startLogging || qrcodeImageUrl" style="bottom: 16px;position: absolute;text-align: center;width: 100%">
        <el-button @click="stopStart">停止启动</el-button>
        <!-- <el-button class="btn-primary" type="primary" @click="restartBot">重新启动</el-button> -->
      </el-row>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
// import { ScanStatus } from 'wechaty'
import Validate from '../common/validaters.js'
// import { ipcRenderer } from 'electron'

export default {
  components: {},
  data() {
    return {
      isLoading: false,
      configData: {},
      childData: {},
      childModes: [],
      configBase: {
        name: '',
        protocol: 'wechaty-puppet-wechat',
        padToken: '',
        apiKey: '',
        proxy: '',
        warnTime: 10,
        clearTime: 3,
        model: 'gpt-3.5-turbo',
        maxTokens: 1000,
        childs: ['model-welcome']
      },
      configForm: {
        name: '',
        protocol: 'wechaty-puppet-wechat',
        padToken: '',
        apiKey: '',
        proxy: '',
        warnTime: 10,
        clearTime: 3,
        model: 'gpt-3.5-turbo-16k',
        maxTokens: 2000,
        childs: ['model-welcome']
      },
      configRules: {
        name: [Validate.NotNull],
        padToken: [Validate.NotNull],
        apiKey: [Validate.NotNull],
        warnTime: [Validate.NotNull, Validate.integerNum, Validate.MinNum(1), Validate.MaxNum(60)],
        clearTime: [Validate.NotNull, Validate.integerNum, Validate.MinNum(1), Validate.MaxNum(10)],
      },
      qrcodeMsg: '',
      qrcodeImageUrl: '',
      startLogging: '',
      reTimes: 0,
    }
  },
  created() {
    this.reset()
  },
  methods: {
    reset() {
      this.configData = {}
      this.childData = {}
      this.childModes = []
      Promise.all([window.electronAPI.getBotConfig(), window.electronAPI.getChildModel()]).then(([config, child]) => {
        if (config && Object.keys(config).length) {
          this.configData = cloneDeep(config)
          this.configBase.name = config.puppet.name
          this.configBase.protocol = config.puppet.puppet
          this.configBase.padToken = config.puppet.puppetOptions && config.puppet.puppetOptions.token ? config.puppet.puppetOptions.token : ''
          this.configBase.apiKey = config.openai.apiKey || config.openai.apikey 
          this.configBase.proxy = config.openai.proxy && config.openai.proxy.indexOf('//') > -1 ? config.openai.proxy.split('//')[1] : config.openai.proxy || ''
          this.configBase.warnTime = config.bot.warnTime
          this.configBase.clearTime = config.bot.clearTime
          this.configBase.model = config.chat.model
          this.configBase.maxTokens = config.chat.max_tokens
        }
        if (child && Object.keys(child).length) {
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
      this.$refs.configForm.validate((valid) => {
        if (valid) {
          this.isLoading = true
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
          this.configData.chat.model = this.configForm.model || ''
          this.configData.chat.max_tokens = this.configForm.maxTokens || ''
          this.configData.openai.apiKey = this.configForm.apiKey
          this.configData.openai.proxy = this.configForm.proxy ? `http://${this.configForm.proxy}` : ''
          this.configData.bot.warnTime = Number(this.configForm.warnTime)
          this.configData.bot.clearTime = Number(this.configForm.clearTime)
          // child
          const keys = Object.keys(this.childData)
          keys.forEach(k => {
            this.childData[k].open = this.configForm.childs && this.configForm.childs.length && this.configForm.childs.includes(k)
          })
          Promise.all([window.electronAPI.setBotConfig(this.configData), window.electronAPI.setChildModel(this.childData)]).then(([config, child]) => {
            if (config.success && child.success) {
              window.electronAPI.startBot()
              this.getStartLogging()
            } else {
              this.$message.error(config.success ? child.msg || config.msg : config.msg || child.msg)
            }
          })
        } else {
          this.$message.error('no validate!!')
        }
      });
    },
    resetParams() {
      this.isLoading = false
      this.startLogging = ''
      this.qrcodeMsg = ''
      this.qrcodeImageUrl = ''
    },
    stopStart() {
      this.resetParams()
      window.electronAPI.stopBot()
    },
    restartBot() {
      this.stopStart()
      this.reTimes++
      this.startBot()
    },
    getStartLogging() {
      window.electronAPI.updateStartLog((_event, value) => {
        if (value && typeof value === 'object') {
          if (Object.keys(value).includes('status')) {
            if (value.status === 2 || value.status === 5) {
              this.qrcodeImageUrl = value.qrcode
            } else if (value.status === 3) {
              this.qrcodeMsg = '已扫描，请确认登录'
            } else if (value.status === 4) {
              this.qrcodeImageUrl = ''
              this.qrcodeMsg = '正在登录'
            }
            this.startLogging = this.startLogging ? `${this.startLogging}\n${this.qrcodeMsg}` : this.qrcodeMsg
          } else if (Object.keys(value).includes('success')) {
            this.resetParams()
            if (value.success) {
              this.$message.success(value.msg)
              this.$router.push('/about')
            } else {
              this.$message.error(value.msg)
            }
          }
        } else {
          this.startLogging = this.startLogging ? `${this.startLogging}\n${value}` : value
        }
        console.log(value)
      })
    }
  }
}
</script>
<style scoped>
.home-page {
  padding: 16px;
}
.btn-row {
  float: right;
}
.load-box {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  overflow: auto;
  margin: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8)
}
.load-con {
  top: 0px;
  width: 100%;
  position: absolute;
  max-height: calc(100% - 200px);
}
</style>
