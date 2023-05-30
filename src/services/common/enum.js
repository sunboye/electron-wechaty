/*
 * @Author: yangss
 * @Position: 
 * @Date: 2023-04-13 15:29:03
 * @LastEditors: yangss
 * @LastEditTime: 2023-04-18 16:05:36
 * @FilePath: \node-wechaty-self\src\common\enum.js
 */
import childModel from '../../config/childModel.json' assert { type: "json" }
const Message = {
  MessageStatus: {
    Unknown: 0, // 表示未知状态
    Pending: 1, // 表示消息等待发送
    Sent: 2,    // 表示已发送消息
    Failed: 3,  // 表示消息发送失败
    Delivered: 4,// 表示消息已被成功发送到接收方
    Read: 5 // 表示消息已经被接收方阅读
  },
  MessageType: {
    Unknown: 1,
    Audio: 2,
    Attachment: 3,
    Contact: 4,
    Emoticon: 5,
    Image: 6,
    Text: 7,
    Video: 8,
    Url: 9,
    ChatHistory: 10,
    MiniProgram: 11,
    App: 12,
    Location: 13,
    Quote: 14
  },
  MessageIntro: {
    Audio: '语音',
    Text: '文本',
  }
}

let modelIndex = 0
Object.keys(childModel).forEach(item => {
  if (item === 'model-welcome') {
    childModel[item].open = true
    childModel[item].union_num = 0
  } else {
    if (childModel[item].open) {
      childModel[item].union_num = ++modelIndex
      childModel[item].support = childModel[item].support.map(item => Message.MessageIntro[item])
    }
  }
})

export {
  Message,
  childModel
}