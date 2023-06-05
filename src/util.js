/*
 * @Author: yangss
 * @Position: 
 * @Date: 2023-06-05 11:26:38
 * @LastEditors: yangss
 * @LastEditTime: 2023-06-05 22:03:23
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
    const jsonStr = JSON.stringify(conf, null, 2)
    console.log(jsonStr)
    fs.writeFileSync(path.join(__dirname, configPath), jsonStr)
    return {success: true}
  } catch (error) {
    return {success: false, msg: error.message}
  }
}
const setChildModel = (conf) => {
  try {
    const jsonStr = JSON.stringify(conf, null, 2)
    console.log(jsonStr)
    fs.writeFileSync(path.join(__dirname, childPath), jsonStr)
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