/*
 * @Author: yangss
 * @Position: 
 * @Date: 2023-04-14 19:34:52
 * @LastEditors: yangss
 * @LastEditTime: 2023-04-15 14:21:57
 * @FilePath: \node-wechaty-self\src\scan\scan.js
 */
import { ScanStatus } from 'wechaty'
import config from '../../config/config.js'
import qrcodeTerminal from 'qrcode-terminal'

const onScan = (qrcode, status) => {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    console.dir(`qrcode: ${qrcode}`)
    const qrcodeImageUrl = [config.bot.qrcodeUrl, encodeURIComponent(qrcode)].join('')
    console.log(`onScan: ${ScanStatus[status]}(${status}) - ${qrcodeImageUrl}`)
    qrcodeTerminal.generate(qrcode, { small: true })  // show qrcode on console
  } else {
    console.log(`onScan: ${ScanStatus[status]}(${status})`)
    if (status === ScanStatus.Canceled) {
      throw(new Error(`ScanStatus ${ScanStatus[status]}, please rebot the program!!`))
    }
  }
}

export default onScan