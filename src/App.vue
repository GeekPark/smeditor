<template>
  <div id='app'>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    let link = document.createElement('link')
    link.href = 'https://ws3.sinaimg.cn/large/006tNc79ly1fnyr74sc8ej305m05mmx9.jpg'
    link.rel = 'shortcut icon'
    document.head.appendChild(link)
    document.title = 'SMEditor (石墨文档编辑器)'
  }
}
</script>

<style>
html, body {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
  height: auto;
  overflow-y: scroll;
}
</style>
