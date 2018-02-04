<template>
  <div class="smeditor" id="smeditor">
    <div class="buttons">
      <button class='undo' v-on:click='undo' v-on:mouseover.stop='mouseover($event)' title="撤销">
        <span v-html='icons.undo'></span>
      </button>
      <button class='redo' v-on:click='redo' v-on:mouseover.stop='mouseover($event)' title="重做">
        <span v-html='icons.redo'></span>
      </button>
      <button class='remove-format'
              title="清式"
              v-on:click='removeFormat'
              v-on:mouseover.stop='mouseover($event)'>
        <span v-html='icons.removeFormat'></span>
      </button>
      <button class="font-size"
              title="字号"
              v-on:click="isFontSizePickerShow = !isFontSizePickerShow"
              v-on:mouseover.stop='mouseover($event)'>
        <span> {{fontSize}} </span>
        <font-size-picker v-bind:FontSizePickerClick="FontSizePickerClick" v-show="isFontSizePickerShow"></font-size-picker>
      </button>
      <button v-for='(icon, name) in icons.basic'
              @click='basicStyle(name)'
              v-bind:class="{buttonsActive: styles.indexOf(name) > -1}"
              v-on:mouseover.stop='mouseover($event)'
              v-bind:title='basicStyleNames[Object.keys(icons.basic).indexOf(name)]'>
        <span v-html='icon'></span>
      </button>
      <button v-on:mouseover.stop='mouseover($event)' title="文本颜色">
        <span v-html='icons.color' v-on:click="isColorPickerShow = !isColorPickerShow"></span>
        <color-picker v-bind:ColorPickerClick="ColorPickerClick" v-show="isColorPickerShow"></color-picker>
      </button>
      <button class='insert-ol' v-on:click='insertList("OrderedList")' v-on:mouseover.stop='mouseover($event)' title="有序列表">
        <span v-html='icons.listOrdered'></span>
      </button>
      <button class='insert-ul' v-on:click='insertList("UnorderedList")' v-on:mouseover.stop='mouseover($event)' title="无序列表">
        <span v-html='icons.listUnordered'></span>
      </button>
      <button class='indent' v-on:click='indent' v-on:mouseover.stop='mouseover($event)' title="增加缩进">
        <span v-html='icons.indent'></span>
      </button>
      <button class='outdent' v-on:click='outdent' v-on:mouseover.stop='mouseover($event)' title="减少缩进">
        <span v-html='icons.outdent'></span>
      </button>
      <button class='align-left' v-on:click='align("Left")' v-on:mouseover.stop='mouseover($event)' title="左对齐">
        <span v-html='icons.alignLeft'></span>
      </button>
      <button class='align-center' v-on:click='align("Center")' v-on:mouseover.stop='mouseover($event)' title="居中对齐">
        <span v-html='icons.alignCenter'></span>
      </button>
      <button class='align-right' v-on:click='align("Right")'  v-on:mouseover.stop='mouseover($event)' title='右对齐'>
        <span v-html='icons.alignRight'></span>
      </button>
      <button class='insert-options' v-on:click="isInsertShow = !isInsertShow">
        <span class="insert-options-label"></span>
        <insert-options v-show="isInsertShow"
         :insertImage="insertImage"
         :insertTable="insertTable"
         :insertLink="insertLink"
         :insertLine="insertLine"
         :insertAttachment="insertAttachment"
         :insertQuote="insertQuote"
         :insertBlock="insertBlock"
         ></insert-options>
      </button>
   <!--    <button class='insert-ul' v-on:click='insertCheck'>
        <span v-html='icons.listCheck'></span>
      </button> -->
      <!-- <button v-on:click='insertImage'>23333</button> -->
    </div>
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
    <p class="select-words" v-show="selectWords">{{selectWords.length}}个字</p>
  </div>
</template>

<script>
import icons from './icons.js'
import ColorPicker from './ColorPicker.vue'
import FontSizePicker from './FontSizePicker.vue'
import Insert from './Insert.vue'
import tippy from 'tippy.js'
const remove = function (arr, val) {
  let index = arr.indexOf(val)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
const focus = function (el) {
  document.querySelector(el).focus()
}
export default {
  name: 'smeditor',
  components: {
    'color-picker': ColorPicker,
    'font-size-picker': FontSizePicker,
    'insert-options': Insert
  },
  data () {
    return {
      // 图标
      icons: icons,
      input: [],
      styles: [],
      basicStyleNames: ['粗体', '斜体', '下划线', '中划线'],
      // 调色盘是否显示
      isColorPickerShow: false,
      isFontSizePickerShow: false,
      isInsertShow: false,
      // 选中文字
      selectWords: '',
      // 字号
      fontSize: 16
    }
  },
  methods: {
    kenter (e) {
      e.stopPropagation()
      if (this.styles.length === 0) {
        return false
      }
    },
    mouseup () {
      const str = window.getSelection().toString()
      if (str.length < 1) {
        return false
      }
      this.selectWords = str
      setTimeout(() => {
        this.selectWords = ''
      }, 1500)
    },
    mouseover (event) {
      let target = ''
      event.path.forEach(el => {
        if (el.localName === 'button' && target === '') {
          target = el
        }
      })
      tippy(target, {
        placement: 'bottom',
        animation: 'shift-away',
        duration: 100,
        arrow: true
      })
    },
    redo () {
      document.execCommand('redo')
    },
    undo () {
      document.execCommand('undo')
    },
    removeFormat () {
      document.execCommand('removeFormat')
      this.styles = []
      this.FontSize = 16
    },
    FontSizePickerClick (size, index) {
      document.execCommand('FontSize', false, index + 1)
      this.fontSize = size
      setTimeout(() => {
        this.isFontSizePickerShow = false
      }, 200)
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
    ColorPickerClick (color) {
      document.querySelector('.ql-color-label').style.fill = color
      document.execCommand('forecolor', false, color)
      setTimeout(() => {
        this.isColorPickerShow = false
      }, 200)
    },
    insertImage (size, index) {
      document.execCommand('insertHTML', false, `
        <br><div class="image-desc">
          <img class="uploaded-img" src="https://ws2.sinaimg.cn/large/006tNc79ly1fni9fylw8zj30fa0a13yt.jpg" width="auto" height="auto">
          <br>
          <div class="image-caption"></div>
        </div><br>
      `)
    },
    insertTable () {
      alert('暂未添加')
    },
    insertLink () {

    },
    insertLine () {
      document.execCommand('insertHTML', false, `<p><hr></p>`)
    },
    insertBlock () {

    },
    insertAttachment () {

    },
    insertQuote () {
      document.execCommand('insertHTML', false, `<blockquote><p></p></blockquote>`)
    },
    insertClick () {
      setTimeout(() => {
        this.isInsertShow = false
      }, 200)
    },
    insertList (name) {
      document.execCommand(`insert${name}`, false, '')
    },
    insertCheck () {
      document.execCommand('insertHTML', false, `
        <ul class="unchecked-list"><li class="unchecked">&nbsp</li></ul>
      `)
      document.querySelectorAll('.unchecked-list').forEach(ul => {
        ul.childNodes.forEach(li => {
          li.onclick = function (event) {
            const name = event.target.className === 'unchecked' ? 'checked' : 'unchecked'
            event.target.className = name
            console.log(event.target.className)
          }
        })
      })
    },
    indent () {
      document.execCommand('indent')
    },
    outdent () {
      document.execCommand('outdent')
    },
    align (name) {
      document.execCommand(`Justify${name}`)
    }
  },
  mounted () {
    document.execCommand('insertHTML', false, '<p><br></p>')
    this.insertImage()
    const self = this
    document.querySelector('.input-area').onfocus = function (event) {
      if (event.relatedTarget && event.relatedTarget.localName === 'button') {
        self.isFontSizePickerShow = false
        self.isInsertShow = false
        self.isColorPickerShow = false
      }
    }
    focus('.input-area')
    // 回车事件
    document.querySelector('.input-area').onkeypress = function (event) {
      const el = getSelectedNode()
      if (event.keyCode === 13 && isImageCaption(el)) {
        document.execCommand('removeFormat', false, '')
        this.innerHTML = this.innerHTML + '<p><br></p>'
        document.getSelection().collapse(this, this.childNodes.length - 1)
        return false
      }
    }
    // 删除事件
    document.querySelector('.input-area').onkeydown = function (event) {
      const el = getSelectedNode()
      if (event.keyCode === 8 && isImageDesc(el)) {
        el.innerHTML = '<p></p>'
        return false
      }
      if (el.innerHTML.length <= 1 &&
          event.keyCode === 8 &&
          isImageCaption(el)) {
        el.innerHTML = ''
        return false
      }
    }
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
function isImageCaption (el) {
  return el.className === 'image-caption'
}

function isImageDesc (el) {
  return el.className === 'image-desc'
}

function getSelectedNode () {
  if (document.selection) {
    return document.selection.createRange().parentElement()
  } else {
    let selection = window.getSelection()
    if (selection.rangeCount > 0) {
      return selection.getRangeAt(0).startContainer.parentNode
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
.smeditor {
  width: 50%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}
.smeditor .input-area {
  outline: none;
  min-height: 400px;
  width: calc(100% - 20px);
  padding: 10px;
  text-align: left;
  box-shadow: 0 1px 6px #ccc;
  background-color: #ffffff;
  border-color: transparent;
}

.smeditor .buttons {
  display: flex;
  justify-content: baseline;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  background-color: rgba(240,240,240, 1);
}

.smeditor .buttons button {
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

.smeditor .buttons button:hover {
  border-color: #BFBFBF;
}

.smeditor .buttonsActive {
  border: 1px solid #BFBFBF !important;
}

.smeditor svg {
  fill: #555;
  height: 100%;
  width: 100%;
}

.smeditor input {
  border: none;
  color: #333;
  font-size: 16px;
  text-align: center;
  width: 100%;
}

.smeditor img {
  max-width: 100%;
  width: auto;
  height: auto;
  vertical-align: middle;
  border: 0;
}

.smeditor p {
  padding: 2px 0;
  margin: 0px;
}

.smeditor svg {
  cursor: pointer;
}

.smeditor blockquote {
  color: #BFBFBF;
  padding-left: 15px;
  border-left: 5px solid #f0f0f0;
}

.smeditor .image-caption {
  min-width: 20%;
  max-width: 80%;
  height: 35px;
  display: inline-block;
  padding: 10px 10px 0px 10px;
  margin: 0 auto;
  border-bottom: 1px solid #d9d9d9;
  font-size: 16px;
  color: #999;
  content: "";
}

.smeditor .image-caption:empty {
  display: inline-block;
  content: "";
}

.smeditor .image-desc {
  text-align: center;
  color: #333;
}

.smeditor .select-words {
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

.smeditor .font-size, .smeditor .insert-options {
  min-width: 40px !important;
}

.smeditor .font-size {
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.smeditor .font-size span {
  font-size: 14px;
  color: #333;
  bottom: 1px;
  font-family: 'Helvetica,Tahoma,Arial,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif';
  position: relative;
}

.smeditor .insert-options:before {
  content: "\63D2\5165";
  color: #333;
  font-family: Helvetica,Tahoma,Arial,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  line-height: 28px;
  font-size: 12px;
  float: left;
  margin-left: 8px;
}

.unchecked-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.unchecked:before {
  content: "\F402";
  padding-left: 3px;
  margin-right: 6px;
  cursor: pointer;
  box-sizing: border-box;
}

.checked:before {
  content: "\F402";
}

</style>
