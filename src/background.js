/*
 * @Author: yangss
 * @Position: 
 * @Date: 2023-05-29 18:23:01
 * @LastEditors: yangss
 * @LastEditTime: 2023-06-13 22:04:31
 * @FilePath: \electron-wechaty\src\background.js
 */
'use strict'

import { app, Tray, nativeImage, Menu, protocol, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { getBotConfig, getChildModel, setBotConfig, setChildModel, deleteMemory } from './util.js'
import { startBot, stopBot } from './services/index.js'
import { setMainWin } from './services/common/common.js'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const gotTheLock = app.requestSingleInstanceLock()
let win = null
let tray = null
let icon = null
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    console.log(commandLine)
    console.log(workingDirectory)
    // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
      win.show()
    }
  })
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    appQuit()
  })
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
      // Install Vue Devtools
      try {
        await installExtension(VUEJS_DEVTOOLS)
      } catch (e) {
        console.error('Vue Devtools failed to install:', e.toString())
      }
    }
  
    ipcMain.handle('bot:getBotConfig', getBotConfig)
    ipcMain.handle('bot:getChildModel', getChildModel)
    ipcMain.handle('bot:setBotConfig', (event, conf) => {
      return setBotConfig(conf)
    })
    ipcMain.handle('bot:setChildModel', (event, conf) => {
      return setChildModel(conf)
    })
    createWindow()
  })
  
  // Exit cleanly on request from parent process in development mode.
  if (isDevelopment) {
    if (process.platform === 'win32') {
      process.on('message', (data) => {
        if (data === 'graceful-exit') {
          appQuit()
        }
      })
    } else {
      process.on('SIGTERM', () => {
        appQuit()
      })
    }
  }
}
  
const appQuit = () => {
  try {
    deleteMemory(true)
  } catch (error) {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  } finally {
    app.exit()
  }
}

async function createWindow() {
  if (gotTheLock) {
    // 取消顶部菜单
    Menu.setApplicationMenu(null)
    // Create the browser window.
    win = new BrowserWindow({
      width: 800,
      height: 680,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        // autoHideMenuBar: true, // 取消顶部菜单
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
      }
    })
    const iconSrc = app.isPackage ? './icons/favicon.icon' : '../public/icons/favicon.png'
    console.log(__dirname)
    icon = nativeImage.createFromPath(path.join(__dirname, iconSrc))
    tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
    { label: '打开主界面', click: () => { win.show() } },
    { label: '退出', click: () => { appQuit() } }
    ])

    tray.setToolTip('Wechaty-robot')
    tray.setContextMenu(contextMenu)
    tray.on('double-click', () => {
    win.isVisible() ? win.hide() : win.show()
    })
    win.on('close', (event) => {
      win.hide();
      win.setSkipTaskbar(true);
      event.preventDefault();
    });
    // win.webContents.openDevTools()
    ipcMain.on('bot:startBot', () => {
      startBot()
    })
    ipcMain.on('bot:stopBot', () => {
      stopBot()
    })
    setMainWin(win)
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
      if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
      createProtocol('app')
      // Load the index.html when not in development
      win.loadURL('app://./index.html')
    }
  } else {
    app.quit()
  }
}
