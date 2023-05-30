<!--
 * @Author: yangss
 * @Position: 
 * @Date: 2023-05-29 18:17:08
 * @LastEditors: yangss
 * @LastEditTime: 2023-05-30 16:49:45
 * @FilePath: \electron-wechaty\src\views\AboutView.vue
-->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button @click="goback">返回</el-button>
  </div>
</template>
<script>
// import { cloneDeep } from 'lodash'
export default {
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {
    goback() {
      this.$router.back(-1)
    }
  }
}
</script>
<style scoped></style>