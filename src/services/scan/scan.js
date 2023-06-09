/*
 * @Author: yangss
 * @Position: 
 * @Date: 2023-04-14 19:34:52
 * @LastEditors: yangss
 * @LastEditTime: 2023-06-09 15:50:19
 * @FilePath: \electron-wechaty\src\services\scan\scan.js
 */
import { ScanStatus } from 'wechaty'
// import config from '../../config/config.js'
import QRC from 'qrcode'
import { sendStartLog } from  '../common/common.js'

const onScan = (qrcode, status) => {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    
    // const qrcodeImageUrl = [config.bot.qrcodeUrl, encodeURIComponent(qrcode)].join('')
    // sendStartLog(`onScan: ${ScanStatus[status]}(${status}) - ${qrcode}`)
    QRC.toDataURL(qrcode).then(url => {
      sendStartLog({qrcode: url, status: status})
    }).catch(e => {
      sendStartLog({success: false, msg: e.message})
    })
  } else {
    // sendStartLog(`onScan: ${ScanStatus[status]}(${status})`)
    if (status === ScanStatus.Canceled) {
      setTimeout(() => {
        sendStartLog({success: false, msg: `ScanStatus ${ScanStatus[status]}，启动失败，请重试...`})
      }, 1000)
      throw(new Error(`ScanStatus ${ScanStatus[status]}, please rebot the program!!`))
    } else {
      sendStartLog({status: status, msg: `onScan: ${ScanStatus[status]}(${status}`})
    }
  }
}

export default onScan