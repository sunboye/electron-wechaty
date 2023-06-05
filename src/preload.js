/*
 * @Author: yangss
 * @Position: 
 * @Date: 2023-05-30 13:40:34
 * @LastEditors: yangss
 * @LastEditTime: 2023-06-05 17:27:43
 * @FilePath: \electron-wechaty\src\preload.js
 */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  startBot: () => ipcRenderer.send('bot:startBot'),
  getBotConfig: () => ipcRenderer.invoke('bot:getBotConfig'),
  getChildModel: () => ipcRenderer.invoke('bot:getChildModel'),
  setBotConfig: (conf) => ipcRenderer.invoke('bot:setBotConfig', conf),
  setChildModel: (conf) => ipcRenderer.invoke('bot:setChildModel', conf)
})