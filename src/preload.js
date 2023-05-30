/*
 * @Author: yangss
 * @Position: 
 * @Date: 2023-05-30 13:40:34
 * @LastEditors: yangss
 * @LastEditTime: 2023-05-30 13:40:37
 * @FilePath: \electron-wechaty\src\preload.js
 */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getFilePath: (filePath) => ipcRenderer.invoke('dialog:getFilePath', filePath),
    getData: (sliceStep) => ipcRenderer.invoke('read:getData', sliceStep),
    getSplice: (startTimestamp, endTimestamp, keyCode) => ipcRenderer.invoke('read:getSplice', startTimestamp, endTimestamp, keyCode),
})