<template>
  <div class="smeditor" id="smeditor">
    <div class="buttons">
      <button v-for='(icon, name) in icons.basic' @click='basicStyle(name)' v-bind:class="{buttonsActive: styles.indexOf(name) > -1}">
        <span v-html='icon'></span>
      </button>
      <button>
        <span v-html='icons.color' v-on:click="isColorPickerShow = !isColorPickerShow">
        </span>
        <color-picker v-bind:ColorPickerClick="ColorPickerClick" v-show="isColorPickerShow"></color-picker >
      </button>
    </div>
     <div>
      <div
        contenteditable="true"
        autocorrect="off"
        autocomplete="off"
        spellcheck="false"
        class="input-area"
        id="input-area"
        v-on:mouseup="mouseup"
        v-on:keyup.enter="kenter"
        >
      </div>
    </div>
    <p class="select-words" v-show="selectWords">{{selectWords.length}}个字</p>
  </div>
</template>

<script>
import icons from './icons.js'
import ColorPicker from './ColorPicker.vue'
const remove = function (arr, val) {
  let index = arr.indexOf(val)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
export default {
  name: 'smeditor',
  components: {
    'color-picker': ColorPicker
  },
  data () {
    return {
      // 图标
      icons: icons,
      input: [],
      styles: [],
      // 调色盘是否显示
      isColorPickerShow: false,
      // 选中文字
      selectWords: ''
    }
  },
  methods: {
    kenter (e) {
      e.stopPropagation()
      if (this.styles.length === 0) {
        return false
      }
    },
    basicStyle (name) {
      console.log(name)
      document.execCommand(name, false, null)
      if (this.styles.indexOf(name) === -1) {
        this.styles.push(name)
      } else {
        remove(this.styles, name)
      }
    },
    mouseup () {
      console.log(window.getSelection())
      const str = window.getSelection().toString()
      if (str.length < 1) {
        return false
      }
      this.selectWords = str
      setTimeout(() => {
        this.selectWords = ''
      }, 1500)
    },
    ColorPickerClick (color) {
      document.querySelector('.ql-color-label').style.fill = color
      document.execCommand('forecolor', false, color)
      setTimeout(() => {
        this.isColorPickerShow = false
      }, 200)
    }
  },
  mounted () {
  }
}

// function getCursortPosition (obj) {
//   let cursorIndex = 0
//   if (document.selection) {
//     // IE Support
//     obj.focus()
//     let range = document.selection.createRange()
//     range.moveStart('character', -obj.value.length)
//     cursorIndex = range.text.length
//   } else if (obj.selectionStart || obj.selectionStart === 0) {
//     // another support
//     cursorIndex = obj.selectionStart
//   }
//   return cursorIndex
// }
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.smeditor {
  width: 50%;
  margin: 0 auto;
}
.input-area {
  outline: none;
  min-height: 400px;
  width: 100%;
  padding: 10px;
  text-align: left;
  box-shadow: 0 1px 6px #ccc;
  background-color: #ffffff;
  border-color: transparent;
}

.buttons {
  text-align: left;
  padding: 1px 0px;
}

.buttons button {
  border: none;
  color: #000000;
  height: 27px;
  width: 30px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid transparent;
  position: relative;
}

.buttons button:hover {
  border-color: #BFBFBF;
}

.buttonsActive {
  border: 1px solid #BFBFBF !important;
}

svg {
  fill: #555;
  height: 100%;
  width: 100%;
}

.select-words {
  position: fixed;
  right: calc(50% - 0px);
  margin-right: -100px;
  bottom: 30px;
  width: 200px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #898989;
  opacity: 1;
  z-index: 1;
  background-color: #fff;
  border-radius: 1px;
  -webkit-border-radius: 1px;
  -moz-border-radius: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-transition: all .2s ease-in;
  -moz-transition: all .2s ease-in;
  transition: all .2s ease-in;
  -webkit-box-shadow: 0 2px 8px hsla(0,0%,70%,.8);
  -moz-box-shadow: 0 2px 8px hsla(0,0%,70%,.8);
  -ms-box-shadow: 0 2px 8px hsla(0,0%,70%,.8);
  -o-box-shadow: 0 2px 8px hsla(0,0%,70%,.8);
  box-shadow: 0 2px 8px hsla(0,0%,70%,.8);
  transition-property: right;
  transition: all 0.3s;
}


</style>
