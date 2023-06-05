/*
 * @Author: yangss
 * @Position: 
 * @Date: 2023-05-30 18:16:46
 * @LastEditors: yangss
 * @LastEditTime: 2023-06-05 17:54:36
 * @FilePath: \electron-wechaty\src\config\config.js
 */
import config from './config.json'
if (process.env.OPENAI_API_KEY) {
  config.openai.apiKey = config.openai.apiKey ? config.openai.apiKey : process.env.OPENAI_API_KEY
}

export default config