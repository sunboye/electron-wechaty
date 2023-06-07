/*
 * @Author: yangss
 * @Position: 
 * @Date: 2023-06-05 11:26:38
 * @LastEditors: yangss
 * @LastEditTime: 2023-06-07 14:13:31
 * @FilePath: \electron-wechaty\src\util.js
 */

// import config from './config.json' assert { type: "json" }

let configPath = '../src/config/config.json'
let childPath = '../src/config/childModel.json'
import config from './config/config.js'
import fs from 'fs'
import path from 'path'
import { app } from 'electron'
let appPath = __dirname
if (app.isPackaged) {
  appPath == path.dirname(app.getPath('exe'))
  configPath = '../config/config.json'
  childPath = '../config/childModel.json'
}
const getBotConfig = () => {
  return config
}
const getChildModel = () => {
  console.log(appPath)
  const childModel = fs.readFileSync(path.join(appPath, childPath), 'utf-8')
  return JSON.parse(childModel)
}

const setBotConfig = (conf) => {
  try {
    const jsonStr = JSON.stringify(conf, null, 2)
    fs.writeFileSync(path.join(appPath, configPath), jsonStr)
    return {success: true}
  } catch (error) {
    return {success: false, msg: error.message}
  }
}
const setChildModel = (conf) => {
  try {
    const jsonStr = JSON.stringify(conf, null, 2)
    fs.writeFileSync(path.join(appPath, childPath), jsonStr)
    return {success: true}
  } catch (error) {
    return {success: false, msg: error.message}
  }
}

const deleteMemory = () => {
  const fileNames = fs.readdirSync(path.join(appPath, '../'));
  console.log(fileNames)
  fileNames.forEach(item => {
    if (item && item.indexOf('memory-card') > -1) {
      const filePath = path.join(appPath, '../', item)
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        // fs.unlinkSync(filePath)
      } else {
        console.log('context file is no exist!!!')
      }
    }
  })
}

export {
  getBotConfig,
  getChildModel,
  setBotConfig,
  setChildModel,
  deleteMemory
} 