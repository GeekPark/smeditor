<template>
  <div class="home">
    <div class="header">SMEditor
      <span>(石墨文档编辑器)</span>
    </div>
    <div class="bg"></div>
    <smeditor class="smeditor-wrapper"></smeditor>
    <vfooter></vfooter>
  </div>
</template>

<script>
import SMEditor from '@/components/SMEditor.vue'
import VFooter from '@/components/VFooter.vue'
export default {
  name: 'app',
  components: {
    'smeditor': SMEditor,
    'vfooter': VFooter
  }
}
</script>

<style lang="stylus">
.home
  min-height calc(100% - 60px)
  position absolute
  top 0
  left 0
  width 100%
  padding-bottom 60px
  background-color rgb(240,240,240)
  .bg
    height 480px
    width 100%
    margin 0 auto
    background-image url('https://assets-cdn.shimo.im/assets/images/home/index/banner_back-9564341c38.jpg')
    background-size 1280px 580px
    background-size cover
    background-position center
    position absolute

  .smeditor-wrapper
    margin-top 18%

  .header
    position absolute
    z-index 2
    color #fff
    font-family "Helvetica Neue", Helvetica, Arial, sans-serif
    font-size 60px
    text-rendering optimizeLegibility
    font-weight 200
    margin-top 8%
    text-align center
    width 100%

  .header span
    font-size 20px
</style>
