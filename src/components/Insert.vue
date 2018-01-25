<template>
  <div class="insert-options-items">
    <ul>
      <li v-for='(key, index) in Object.keys(icons.insert)'>
        <input v-if='index === 0' id="img_input" type="file" accept="image/*"/>
        <span v-html='icons.insert[key]' :class='key'></span>
        <span>{{labels[index]}}</span>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
import icons from './icons.js'
export default {
  name: 'Insert',
  data () {
    return {
      icons: icons,
      labels: ['图片', '表格', '超链接', '分割线', '附件', '引用', '代码块']
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

.insert-options-items {
  width: 120px;
  padding: 5px 0px;
  border-radius: 2px;
  position: absolute;
  box-shadow: 0 1px 2px #ccc;
  background-color: #fff;
  margin-top: 35px;
  text-align: left;
  z-index: 3;
}
.insert-options-items ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.insert-options-items ul li {
  padding: 5px 20px;
  color: #333;
  font-size: 12px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.insert-options-items ul li:hover, .insertActive {
  background-color: #E5E5E5;
}

.insert-options-items svg {
  width: 20px;
  height: 20px;
  top: 1px;
  position: relative;
  margin-right: 15px;
}

.insert-options-items #img_input {
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
