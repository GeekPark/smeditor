<template>
  <div class="vfooter">
    <li>@2018</li>
    <li><a href="https://github.com/ericjjj/smeditor" target="_blank">Github</a></li>
    <li><a href="https://github.com/ericjjj/smeditor/issues" target="_blank">反馈</a></li>
    <li><router-link to='donation' target="_blank">捐助</router-link></li>
  </div>
</template>
<script type="text/javascript">
export default {}
</script>

<style lang="stylus">
.vfooter
  position absolute
  height 50px
  width 100%
  bottom 0
  z-index 3
  display flex
  align-items center
  justify-content center

  li
    list-style none
    margin 0 5px
    color #333
    font-size 14px
    cursor pointer
  a
    color #333
    text-decoration none
</style>
