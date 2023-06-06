/*
 * @Author: yangss
 * @Position: 
 * @Date: 2023-06-05 11:26:38
 * @LastEditors: yangss
 * @LastEditTime: 2023-06-07 00:43:48
 * @FilePath: \electron-wechaty\src\util.js
 */

// import config from './config.json' assert { type: "json" }

const configPath = '../src/config/config.json'
const childPath = '../src/config/childModel.json'
import config from './config/config.js'
import fs from 'fs'
import path from 'path'

const getBotConfig = () => {
  return config
}
const getChildModel = () => {
  const childModel = fs.readFileSync(path.join(__dirname.replace('app.asar',''), childPath), 'utf-8')
  return JSON.parse(childModel)
}

const setBotConfig = (conf) => {
  try {
    const jsonStr = JSON.stringify(conf, null, 2)
    fs.writeFileSync(path.join(__dirname.replace('app.asar',''), configPath), jsonStr)
    return {success: true}
  } catch (error) {
    return {success: false, msg: error.message}
  }
}
const setChildModel = (conf) => {
  try {
    const jsonStr = JSON.stringify(conf, null, 2)
    fs.writeFileSync(path.join(__dirname.replace('app.asar',''), childPath), jsonStr)
    return {success: true}
  } catch (error) {
    return {success: false, msg: error.message}
  }
}

const deleteMemory = () => {
  const fileNames = fs.readdirSync(path.join(__dirname.replace('app.asar',''), '../'));
  fileNames.forEach(item => {
    if (item && item.indexOf('memory-card') > -1) {
      const filePath = path.join(__dirname.replace('app.asar',''), '../', item)
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath)
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