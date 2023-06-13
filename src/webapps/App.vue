<!--
 * @Author: yangss
 * @Position: 
 * @Date: 2023-05-29 18:17:08
 * @LastEditors: yangss
 * @LastEditTime: 2023-06-12 18:03:55
 * @FilePath: \electron-wechaty\src\webapps\App.vue
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    created() {
      window.electronAPI.sendMessage((_event, value) => {
        if (value && value.type) {
          this.$message[value.type](value.msg || value.message)
        } else {
          this.$message.success(value)
        }
      })
    }
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background-color: beige;
  padding: 0px;
  margin: 0px;
}
</style>
