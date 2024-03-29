/*
 * @Author: yangss
 * @Position: 
 * @Date: 2023-04-15 10:50:49
 * @LastEditors: yangss
 * @LastEditTime: 2023-06-19 11:02:22
 * @FilePath: \electron-wechaty\src\services\message\message.js
 */
import { FileBox } from 'file-box'
import path from 'path';
import lodash from 'lodash';
import { Message } from '../common/enum.js'
import { getOpenAI, getBot, getCommonConfig, getCommonChildModel, sendChatMessage } from  '../common/common.js'

const { cloneDeep } = lodash;
const userTemp = {
  unique_key: 'name',
  unique_val: '',
  cur_model: 0, // 标记用户当前所使用的功能
  last_time: 0,
  warned: false,
  cleared: false
}
const userInfo = {}
let intervalFunc = null

const leaveModel = (key) => {
  const childModel = getCommonChildModel() || {}
  const openai = getOpenAI() || {}
  if (userInfo[key].cur_model === childModel['model-gptChat'].union_num || userInfo[key].cur_model === childModel['model-transcription'].union_num) {
    openai.clearContext(key)
  }
  userInfo[key].cur_model = childModel['model-welcome'].union_num
}

const getWarnMsg = (key) => {
  if (userInfo[key].cur_model) {
    let Msg = ''
    const childModel = getCommonChildModel() || {}
    Object.keys(childModel).forEach(item => {
      if (childModel[item].open && childModel[item].union_num && childModel[item].support && childModel[item].support.length && userInfo[key].cur_model === childModel[item].union_num) {
        userInfo[key].cur_model = childModel[item].union_num
        Msg = `提示：请检查输入，当前功能(${childModel[item].title})支持输入类型[${childModel[item].support.join('|')}]`
      }
    })
    return Msg || welcomeMsg()
  } else {
    return welcomeMsg()
  }
}

const getCurModelText = async (key, text) => {
  const childModel = getCommonChildModel() || {}
  if (userInfo[key].cur_model === childModel['model-daviceChat'].union_num) {
    return await nomalCompletions(text)
  } else if (userInfo[key].cur_model === childModel['model-gptChat'].union_num) {
    return await chatCompletions(key, text)
  } else if (userInfo[key].cur_model === childModel['model-generateImage'].union_num) {
    return await generateImage(text)
  } else {
    return getWarnMsg(key)
  }
}
const getCurModelAudio = async (key, file) => {
  const childModel = getCommonChildModel() || {}
  if (userInfo[key].cur_model === childModel['model-transcription'].union_num) {
    return await createTranscription(file)
  } else if (userInfo[key].cur_model === childModel['model-gptChat'].union_num) {
    // 使用聊天机器人功能时，同时支持语音聊天
    return await createAudioChat(key, file)
  } else {
    return getWarnMsg(key)
  }
}

const setModel = (key, text) => {
  const bottomTips = '提示：回复*可返回主菜单'
  let sunWelcomMsg = ''
  const childModel = getCommonChildModel() || {}
  Object.keys(childModel).forEach(item => {
    if (childModel[item].open && childModel[item].union_num && text === childModel[item].union_num.toString()) {
      userInfo[key].cur_model = childModel[item].union_num
      sunWelcomMsg = `${childModel[item].tip}\n\n${bottomTips}`
    }
  })
  return sunWelcomMsg || welcomeMsg()
}

const welcomeMsg = () => {
  let modelStr = ''
  const childModel = getCommonChildModel() || {}
  Object.keys(childModel).forEach(item => {
    if (item && childModel[item] && childModel[item].open && childModel[item].union_num && !isNaN(childModel[item].union_num) && parseInt(childModel[item].union_num)) {
      modelStr += `${childModel[item].union_num} - ${childModel[item].title}\n`
    }
  })
  const welcomeStr = `${childModel['model-welcome'].tip}\n\n${modelStr}`
  return welcomeStr
}
const createTranscription = async (file) => {
  const openai = getOpenAI() || {}
  const res = await openai.createTranscription(file)
  if (res.success) {
    const text = res.text  || ''
    return text
  } else {
    return `Error: ${res.message ? res.message : res.code}`
  }
}
const createAudioChat = async (key, file) => {
  const openai = getOpenAI() || {}
  const res = await openai.createTranscription(file)
  if (res.success) {
    const text = res.text  || ''
    return await chatCompletions(key, text)
  } else {
    return `Error: ${res.message ? res.message : res.code}`
  }
}
const chatCompletions = async (key, text) => {
  const conmmonConfig = getCommonConfig() || {}
  // 3.5模型
  const params = {
    model: conmmonConfig.chat && conmmonConfig.chat.model ? conmmonConfig.chat.model : '',
    max_tokens: conmmonConfig.chat && conmmonConfig.chat.max_tokens ? conmmonConfig.chat.max_tokens : 1000,
    max_arr: 30,
    context: key
  }
  const openai = getOpenAI() || {}
  const res = await openai.createChatCompletions(text, params)
  if (res.success) {
    return res.choices && res.choices.length && res.choices[0].message ? res.choices[0].message.content : ''
  } else {
    return `Error: ${res.message ? res.message : res.code}`
  }
}

const nomalCompletions = async (text) => {
  const params = {
    max_tokens: 800
  }
  const openai = getOpenAI() || {}
  const res = await openai.createNomalCompletions(text, params)
  if (res.success) {
    return res.choices && res.choices.length && res.choices[0] ? res.choices[0].text :''
  } else {
    return  `Error: ${res.message ? res.message : res.code}`
  }
}

const generateImage = async (text) => {
  // 生成图片功能
  const openai = getOpenAI() || {}
  const res = await openai.generateImage(text)
  const fileBox = res.success && res.data && res.data[0].url ? FileBox.fromUrl(res.data[0].url) : res.message ? res.message : res.code
  return fileBox
}

const intervalDelete = async () => {
  if (Object.keys(userInfo).length) {
    const now = new Date().getTime()
    const config = getCommonConfig() || {}
    for (let key in userInfo) {
      if (userInfo[key] && userInfo[key].cur_model && userInfo[key].last_time  && now > userInfo[key].last_time && now - userInfo[key].last_time > parseInt(config.bot.warnTime) * 60000) {
        if (userInfo[key].warned) {
          if (now - userInfo[key].last_time > (parseInt(config.bot.warnTime) + parseInt(config.bot.clearTime)) * 60000) {
            leaveModel(key)
            delete userInfo[key]
          }
        } else {
          const contact = await getBot().Contact.find({ name: key})
          if (contact) {
            const userMsg = `提示：您已经${config.bot.warnTime}分钟没说话了，如果需要继续使用当前功能，请回复任意内容，否则${config.puppet.name}将在${config.bot.clearTime}分钟后离开，离开之后您可回复任意内容唤醒${config.puppet.name}，如果您想使用其他功能，请回复*返回主菜单。`
            contact.say(userMsg)
            sendChatMessage(`${new Date().toLocaleString()}\n${userMsg}`)
          }
          userInfo[key].warned = true
        }
      }
    }
  }
}

const onMessage = async (msg) => {
  if (!msg.room() && (!msg.self() || (msg.self() && msg.type() === Message.MessageType.Text && msg.text().toString().indexOf('chat-') > -1)) && msg.age() < 180) {
    //  msg.talker().id || 
    // msg.talker().alise() || 
    const key = msg.talker().name()
    let messageStr = ''
    if (key) {
      if (userInfo[key]) {
        userInfo[key].last_time = new Date().getTime()
        userInfo[key].warned = false
        if (!intervalFunc) {
          intervalFunc = setInterval(intervalDelete, 60000)
        }
        if (msg.type() === Message.MessageType.Text) {
          const text = msg.self() ? msg.text().toString().split('chat-')[1] : msg.text().toString()
          console.log(`[${key}](${msg.date().toLocaleString()}): ${msg.text()}`)
          sendChatMessage(`[${key}](${msg.date().toLocaleString()}): ${msg.text()}`)
          if (text === '*') {
            leaveModel(key)
            messageStr = welcomeMsg()
          } else {
            if (userInfo[key].cur_model) {
              messageStr = await getCurModelText(key, text)
            } else {
              messageStr = setModel(key, text)
            }
          }
        } else if (msg.type() === Message.MessageType.Audio) {
          console.log(`[${key}](${msg.date().toLocaleString()}): [语音]`)
          sendChatMessage(`[${key}](${msg.date().toLocaleString()}): [语音]`)
          if (userInfo[key].cur_model) {
            try {
              // 不保存，直接传stream
              const filebox = await msg.toFileBox()
              // const stream = await filebox.toStream()
              // messageStr = await getCurModelAudio(key, stream)
              // 保存音频资源到本地
              const openai = getOpenAI() || {}
              if (openai.createInSourceDir('audio')) {
                const savePath = path.resolve(openai.getSourceDir(), 'audio', `${key}-${new Date().getTime()}.mp3`)
                await filebox.toFile(savePath, true);
                messageStr = await getCurModelAudio(key, savePath)
              } else {
                messageStr = '创建audio文件失败'
              }
            } catch (error) {
              messageStr = error.toString()
              console.error(error)
            }
          } else {
            messageStr = getWarnMsg(key)
          }
        } else {
          // console.log(`[${key}]: ${msg}`)
          messageStr = getWarnMsg(key)
        }
      } else {
        userInfo[key] = cloneDeep(userTemp)
        messageStr = welcomeMsg()
      }
    } else {
      messageStr = 'Error: Failed to obtain key, please contact the administrator by phone'
    }
    const config = getCommonConfig() || {}
    console.log(`[${config.puppet.name}]：${messageStr}`)
    if (messageStr) {
      try {
        await msg.say(messageStr)
        sendChatMessage(`[${config.puppet.name}](${new Date().toLocaleString()})：${messageStr}`)
      } catch (error) {
        await msg.say(`Error: ${error.message ? error.message : error.code || ''}`)
        sendChatMessage(`[${config.puppet.name}](${new Date().toLocaleString()})：Error: ${error.message ? error.message : error.code || ''}`)
      }
    }
  }
}
// console.log(welcomeMsg())
export default onMessage