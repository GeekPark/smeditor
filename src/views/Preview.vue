<template>
  <div class="preview">
    <div v-html='content'></div>
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      content: ''
    }
  },
  mounted () {
    this.content = window.localStorage.getItem('smeditorPreview')
  }
}
</script>

<style lang="stylus">
.preview div
  width 70%
  margin 50px auto
</style>
