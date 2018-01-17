<template>
  <div class="insert-options">
    <ul>
      <li v-on:click='insertImageClick'>图片
        <input id="img_input" type="file" accept="image/*"/>
      </li>
      <li>表格</li>
      <li>超链接</li>
      <li>分割线</li>
      <li>附件</li>
      <li>代码块</li>
    </ul>
  </div>
</template>
<script type="text/javascript">

export default {
  name: 'Insert',
  data () {
    return {
    }
  },
  props: ['insertImage'],
  methods: {
    insertImageClick () {
      this.insertImage()
    }
  }
}
</script>

<style type="text/css">

.insert-options {
  width: 80px;
  padding: 5px 0px;
  border-radius: 2px;
  position: absolute;
  box-shadow: 0 1px 2px #ccc;
  background-color: #fff;
  margin-top: 10px;
  text-align: left;
}
.insert-options ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.insert-options ul li {
  padding: 5px 10px;
  color: #333;
  font-size: 14px;
  position: relative;
  cursor: pointer;
}

.insert-options ul li:hover, .insertActive {
  background-color: #E5E5E5;
}

.insert-options #img_input {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
