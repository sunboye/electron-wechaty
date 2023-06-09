/*
 * @Author: yangss
 * @Position: 
 * @Date: 2023-06-06 09:45:58
 * @LastEditors: yangss
 * @LastEditTime: 2023-06-09 16:53:59
 * @FilePath: \electron-wechaty\src\services\common\common.js
 */
import { Message } from './enum.js'

let robot = {}
let mainwin = {}
let openAI = {}
let consoleObj = {}
let childModel = {}
let config = {}

const setCommonConfig = (conf) => {
  config = conf || {}
}

const getCommonConfig = () => {
  return config
}
const getCommonChildModel = () => {
  return childModel
}

const setCommonChildModel = (conf) => {
  const confTemp = conf || {}
  let modelIndex = 0
  Object.keys(confTemp).forEach(item => {
    if (item === 'model-welcome') {
      confTemp[item].open = true
      confTemp[item].union_num = 0
    } else {
      if (confTemp[item].open) {
        confTemp[item].union_num = ++modelIndex
        confTemp[item].support = confTemp[item].support.map(item => Message.MessageIntro[item])
      }
    }
  })
  childModel = confTemp || {}
}

const setBot = (bot) => {
  robot = bot || {}
}

const getBot = () => {
  return robot
}

const setMainWin = (win) => {
  mainwin = win || {}
}

const getMainWin = () => {
  return mainwin
}

const setOpenAI = (ai) => {
  openAI = ai || {}
}

const getOpenAI = () => {
  return openAI
}

const sendStartLog = (msg) => {
  const win = getMainWin()
  win.webContents.send('bot:updateStartLog', msg)
}

const sendMessage = (msg) => {
  const win = getMainWin()
  win.webContents.send('bot:sendMessage', msg)
}

const sendChatMessage = (msg) => {
  const win = getMainWin()
  win.webContents.send('bot:sendChatMessage', msg)
}

const setConsoleLog = (val) => {
  consoleObj = val
}

const getConsoleLog = () => {
  return consoleObj
}
const getUserAvatar = () => {
  const bot = getBot()
  console.log(bot)
  const contact = bot.self()
  return contact.avatar()
}

export {
  setCommonConfig,
  getCommonConfig,
  getCommonChildModel,
  setCommonChildModel,
  setBot,
  getBot,
  setMainWin,
  getMainWin,
  setOpenAI,
  getOpenAI,
  sendStartLog,
  sendMessage,
  setConsoleLog,
  getConsoleLog,
  sendChatMessage,
  getUserAvatar
} 