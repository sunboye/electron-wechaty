/*
 * @Author: yangss
 * @Position: 
 * @Date: 2023-06-05 11:26:38
 * @LastEditors: yangss
 * @LastEditTime: 2023-06-09 22:03:55
 * @FilePath: \electron-wechaty\src\util.js
 */

let configPath = '../src/config/config.json'
let childPath = '../src/config/childModel.json'
import fs from 'fs'
import path from 'path'
import { setCommonConfig, setCommonChildModel } from './services/common/common.js'
import { app } from 'electron'
let appPath = __dirname
let openaiMemery = '../'
if (app.isPackaged) {
  appPath = path.dirname(app.getPath('exe'))
  configPath = '../config/config.json'
  childPath = '../config/childModel.json'
  openaiMemery = '../../'
}
const getBotConfig = () => {
  const config = fs.readFileSync(path.join(appPath, configPath), 'utf-8')
  return JSON.parse(config)
}
const getChildModel = () => {
  const childModel = fs.readFileSync(path.join(appPath, childPath), 'utf-8')
  return JSON.parse(childModel)
}

const setBotConfig = (conf) => {
  try {
    console.log(appPath)
    
    const jsonStr = JSON.stringify(conf, null, 2)
    fs.writeFileSync(path.join(appPath, configPath), jsonStr)
    conf.openai.sourceDir = app.isPackaged ? `../${conf.openai.sourceDir}` : `./${conf.openai.sourceDir}`
    setCommonConfig(conf)
    return {success: true}
  } catch (error) {
    return {success: false, msg: error.message}
  }
}
const setChildModel = (conf) => {
  try {
    const jsonStr = JSON.stringify(conf, null, 2)
    fs.writeFileSync(path.join(appPath, childPath), jsonStr)
    setCommonChildModel(conf)
    return {success: true}
  } catch (error) {
    return {success: false, msg: error.message}
  }
}

const deleteMemory = (isCLose) => {
  const fileNames = fs.readdirSync(path.join(appPath, openaiMemery));
  fileNames.forEach(item => {
    if (item && item.indexOf('memory-card') > -1) {
      const filePath = path.join(appPath, openaiMemery, item)
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath)
      } else {
        console.log('context file is no exist!!!')
      }
    }
  })
  if (isCLose && process.platform !== 'darwin') {
    app.quit()
  }
}

export {
  getBotConfig,
  getChildModel,
  setBotConfig,
  setChildModel,
  deleteMemory
} 