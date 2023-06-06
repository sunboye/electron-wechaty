/*
 * @Author: yangss
 * @Position: 
 * @Date: 2023-04-15 13:21:25
 * @LastEditors: yangss
 * @LastEditTime: 2023-06-06 21:39:41
 * @FilePath: \electron-wechaty\src\services\index.js
 */

// Contact, Message,
import { WechatyBuilder } from 'wechaty'
import config from '../config/config.js'
import onScan from './scan/scan.js'
import onLogin from './login/login.js'
import onLogout from './logout/logout.js'
import onMessage from './message/message.js'
import onFriendship from './friend/friendship.js'
import onRoomInvite from './room/invite.js'
import { setBot, getBot, getOpenAI, sendStartLog, sendMessage, setConsoleLog, getConsoleLog } from  './common/common.js'

const startBot = () => {
  const bot = WechatyBuilder.build(config.puppet)
  setConsoleLog(console.log)
  console.log = (val) => {
    sendStartLog(val)
  }
  bot.on('scan',    onScan)
  bot.on('login',   onLogin)
  bot.on('logout',  onLogout)
  bot.on('message', onMessage)
  bot.on('friendship',  onFriendship)
  bot.on('room-invite', onRoomInvite)
  bot.on('ready', () => {
    sendStartLog('ready-go!!!')
    console.log = getConsoleLog()
    setTimeout(() => {
      sendStartLog({success: true, msg: '启动成功'})
    }, 1000)
  })
  setBot(bot)
  bot.start().then(() => {
    sendStartLog(`Starter Bot Started.`)
    const openAI = getOpenAI()
    openAI.clearSourceDir()
  }).catch(e => {
    sendStartLog(`StarterBot: ${e}`)
    setTimeout(() => {
      sendStartLog({success: false, msg: '启动失败，请重试...'})
    }, 1000)
    throw e
  })
}

const stopBot = () => {
  const bot = getBot()
  if (bot && Object.keys(bot).length) {
    if (bot.logonoff()) {
      bot.logout()
    }
    bot.stop().then(() => {
      const openAI = getOpenAI()
      openAI.clearSourceDir()
    }).catch((e) => {
      sendMessage({type: 'error', msg: e.message})
    }).finally(() => {
      sendMessage({type: 'success', msg: '退出成功'})
    })
  } else {
    sendMessage({type: 'warning', msg: '暂未登录'})
  }
}

const stopHandleBot = () => {
  const bot = getBot()
  if (bot.logonoff()) {
    bot.logout()
  }
  const openAI = getOpenAI()
  openAI.clearSourceDir()
  return bot.stop()
}

export {
  startBot,
  stopBot,
  stopHandleBot
}