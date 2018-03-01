<template>
  <div class="preview">
    <div class="preview-wrapper" v-html='content'></div>
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
.preview-wrapper
  width 70%
  margin 50px auto
  border 1px solid #BFBFBF
  padding 20px
</style>
