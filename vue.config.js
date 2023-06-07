/*
 * @Author: yangss
 * @Position: 
 * @Date: 2023-05-29 18:17:08
 * @LastEditors: yangss
 * @LastEditTime: 2023-06-07 16:17:18
 * @FilePath: \electron-wechaty\vue.config.js
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      customFileProtocol: "./",
      preload: 'src/preload.js',
      builderOptions: {
        // build配置在此处
        asar: false,
        productName:"Wechaty Robot",
        appId: "com.wechaty.robot.songsong",
        copyright:"songsong",
        // directories: {
        //   output: "dist_electron"
        // },
        extraResources: [
          {
            from: './src/config',
            to: 'config'
          }
        ],
        win: {
          icon: "./public/icons/favicon.png",
          target: [
            {
              target: "nsis",
              // , "ia32"
              arch: ["x64"]
            }
          ]
        },
        mac: {
          icon: "./public/icons/icon.icns"
        },
        linux: {
          icon: "./public/icons"
        },
        nsis: {
          oneClick: false,
          allowElevation: true,
          allowToChangeInstallationDirectory: true,
          installerIcon: "./public/icons/favicon.ico",
          uninstallerIcon: "./public/icons/favicon.ico",
          installerHeaderIcon: "./public/icons/favicon.ico",
          createDesktopShortcut: true,
          createStartMenuShortcut: true,
          shortcutName: 'Wechaty Robot'
        }
      }
    }
  }
})
