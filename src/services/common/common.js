/*
 * @Author: yangss
 * @Position: 
 * @Date: 2023-06-06 09:45:58
 * @LastEditors: yangss
 * @LastEditTime: 2023-06-06 18:09:58
 * @FilePath: \electron-wechaty\src\services\common\common.js
 */
let robot = {}
let mainwin = {}
let openAI = {}
let consoleObj = {}

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