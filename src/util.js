/*
 * @Author: yangss
 * @Position: 
 * @Date: 2023-06-05 11:26:38
 * @LastEditors: yangss
 * @LastEditTime: 2023-06-05 17:57:08
 * @FilePath: \electron-wechaty\src\util.js
 */
// import config from './config.json' assert { type: "json" }

const configPath = '../src/config/config.json'
const childPath = '../src/config/childModel.json'
import config from './config/config.json'
import childModel from './config/childModel.json'
import fs from 'fs'
import path from 'path'

const getBotConfig = () => {
  return config
}
const getChildModel = () => {
  return childModel
}

const setBotConfig = (conf) => {
  try {
    fs.writeFileSync(path.join(__dirname, configPath), JSON.stringify(conf, null, 2))
    return {success: true}
  } catch (error) {
    return {success: false, msg: error.message}
  }
}
const setChildModel = (conf) => {
  try {
    fs.writeFileSync(path.join(__dirname, childPath), JSON.stringify(conf, null, 2))
    return {success: true}
  } catch (error) {
    return {success: false, msg: error.message}
  }
}

export {
  getBotConfig,
  getChildModel,
  setBotConfig,
  setChildModel
} 