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
              @click='basicStyleClick(name)'
              v-bind:class="{buttonsActive: styles.indexOf(name) > -1}"
              v-on:mouseover.stop='mouseover($event)'
              v-bind:title='basicStyleNames[Object.keys(icons.basic).indexOf(name)]'>
        <span v-html='icon'></span>
      </button>
      <button v-on:mouseover.stop='mouseover($event)' title="文本颜色">
        <span v-html='icons.color' v-on:click="isColorPickerShow = !isColorPickerShow"></span>
        <color-picker v-bind:ColorPickerClick="ColorPickerClick" v-show="isColorPickerShow"></color-picker>
      </button>
      <button class='indent' v-on:click='indent' v-on:mouseover.stop='mouseover($event)' title="增加缩进">
        <span v-html='icons.indent'></span>
      </button>
      <button class='outdent' v-on:click='outdent' v-on:mouseover.stop='mouseover($event)' title="减少缩进">
        <span v-html='icons.outdent'></span>
      </button>
      <button class='insert-ol' v-on:click='insertList("OrderedList")' v-on:mouseover.stop='mouseover($event)' title="有序列表">
        <span v-html='icons.listOrdered'></span>
      </button>
      <button class='insert-ul' v-on:click='insertList("UnorderedList")' v-on:mouseover.stop='mouseover($event)' title="无序列表">
        <span v-html='icons.listUnordered'></span>
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
      <button class='insert-link' v-on:click='insertLinkClick'  v-on:mouseover.stop='mouseover($event)' title='插入链接'>
        <span v-html='icons.insertLink'></span>
      </button>
      <button class='insert-options' v-on:click="isInsertShow = !isInsertShow">
        <span class="insert-options-label"></span>
        <insert-options v-show="isInsertShow"
         :insertImage="insertImageClick"
         :insertLink="insertLink"
         :insertLine="insertLine"
         :insertAttachment="insertAttachment"
         :insertQuote="insertQuote"
         :insertBlock="insertBlock"
         ></insert-options>
      </button>
      <button class="backup" @click='backupClick'></button>
      <button class="restore" @click='restoreClick'></button>
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
    <insert-link :insertLink='insertLink' v-if='isInsertLinkShow' :cancel='insertLinkCancel'></insert-link>
  </div>
</template>

<script>
import icons from './icons.js'
import ColorPicker from './ColorPicker.vue'
import FontSizePicker from './FontSizePicker.vue'
import InsertLink from './InsertLink.vue'
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
    'insert-options': Insert,
    'insert-link': InsertLink
  },
  data () {
    return {
      // 图标
      icons: icons,
      // 样式
      styles: [],
      // 基本样式名称
      basicStyleNames: ['粗体', '斜体', '下划线', '中划线'],
      // 调色盘是否显示
      isColorPickerShow: false,
      // 字号选项是否显示
      isFontSizePickerShow: false,
      // 插入选项是否显示
      isInsertShow: false,
      // 插入链接是否显示
      isInsertLinkShow: false,
      // 选中文字内容
      selectWords: '',
      // 字号
      fontSize: 16,
      // 光标
      cursor: {}
    }
  },
  methods: {
    // 回车事件
    kenter (e) {
      e.stopPropagation()
      if (this.styles.length === 0) {
        return false
      }
    },
    // 鼠标事件
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
    // 鼠标事件
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
    // 重做
    redo () {
      document.execCommand('redo')
    },
    // 撤销
    undo () {
      document.execCommand('undo')
    },
    // 移除格式
    removeFormat () {
      document.execCommand('removeFormat')
      this.styles = []
      this.FontSize = 16
    },
    // 字号选项点击
    FontSizePickerClick (size, index) {
      document.execCommand('FontSize', false, index + 1)
      this.fontSize = size
      this.closeAlert()
    },
    // 基本样式点击
    basicStyleClick (name) {
      console.log(name)
      document.execCommand(name, false, null)
      if (this.styles.indexOf(name) === -1) {
        this.styles.push(name)
      } else {
        remove(this.styles, name)
      }
    },
    // 调色盘点击
    ColorPickerClick (color) {
      document.querySelector('.ql-color-label').style.fill = color
      document.execCommand('forecolor', false, color)
      this.closeAlert()
    },
    // 插入图片
    insertImageClick (size, index) {
      this.closeAlert()
      document.execCommand('insertHTML', false, `
        <br><div class="image-desc">
          <img class="uploaded-img" src="https://ws2.sinaimg.cn/large/006tNc79ly1fni9fylw8zj30fa0a13yt.jpg" width="auto" height="auto">
          <br>
          <div class="image-caption"></div>
        </div><br>
      `)
    },
    // 点击插入链接
    insertLinkClick () {
      console.log('1')
      this.closeAlert()
      this.cursor = window.getSelection().getRangeAt(0)
      this.isInsertLinkShow = true
      this.isInsertShow = false
    },
    // 插入链接
    insertLink (url, title) {
      this.closeAlert()
      this.isInsertLinkShow = false
      document.querySelector('.input-area').focus()
      const savedRange = this.cursor
      if (window.getSelection) {
        var s = window.getSelection()
        if (s.rangeCount > 0) {
          s.removeAllRanges()
        }
        s.addRange(savedRange)
      } else if (document.createRange) {
        window.getSelection().addRange(savedRange)
      } else if (document.selection) {
        savedRange.select()
      }
      document.execCommand('insertHTML', false, `<a href=${url} target="_blank">${title}</>`)
    },
    // 取消插入链接
    insertLinkCancel () {
      this.closeAlert()
      this.isInsertLinkShow = false
    },
    // 插入一条线
    insertLine () {
      this.closeAlert()
      document.execCommand('insertHTML', false, `<p><hr></p>`)
    },
    // 插入代码块
    insertBlock () {
      this.closeAlert()
    },
    // 插入附件
    insertAttachment () {
      this.closeAlert()
    },
    // 插入引用
    insertQuote () {
      document.execCommand('insertHTML', false, `<div class="blockquote"><blockquote><span><br></span></blockquote></div>`)
    },
    // 插入 有序/无序 列表
    insertList (name) {
      this.closeAlert()
      document.execCommand(`insert${name}`, false, '')
    },
    // 插入 todo , 暂时不做
    insertCheck () {
      this.closeAlert()
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
    // 缩进+
    indent () {
      document.execCommand('indent', false, null)
    },
    // 缩进-
    outdent () {
      document.execCommand('outdent', false, null)
    },
    // 对齐
    align (name) {
      document.execCommand(`Justify${name}`)
    },
    // 备份
    backupClick () {
      window.localStorage.setItem('smeditor', document.querySelector('.input-area').innerHTML)
    },
    // 恢复
    restoreClick () {
      document.querySelector('.input-area').innerHTML = window.localStorage.getItem('smeditor') || ''
    },
    // 关闭弹窗
    closeAlert () {
      setTimeout(() => {
        self.isFontSizePickerShow = false
        self.isInsertShow = false
        self.isColorPickerShow = false
      }, 200)
    }
  },
  mounted () {
    document.execCommand('insertHTML', false, '<p><br></p>')
    this.insertImageClick()

    // 焦点隐藏弹窗
    const self = this
    document.querySelector('.input-area').onfocus = function (event) {
      self.closeAlert()
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
      if (event.keyCode === 13 && el.className === 'blockquote' && el.lastChild.innerHTML === '<br>') {
        console.log('return')
        el.lastChild.innerHTML = ''
        document.execCommand('removeFormat', false, '')
        this.innerHTML = this.innerHTML + '<p></p>'
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

// 设置光标位置
// function setCaretPosition (textDom, pos) {
//   if (textDom.setSelectionRange) {
//     textDom.focus()
//     textDom.setSelectionRange(pos, pos)
//   } else if (textDom.createTextRange) {
//     var range = textDom.createTextRange()
//     range.collapse(true)
//     range.moveEnd('character', pos)
//     range.moveStart('character', pos)
//     range.select()
//   }
// }

// 获取光标位置
// function getCursortPosition (textDom) {
//   var cursorPos = 0
//   if (document.selection) {
//     textDom.focus()
//     var selectRange = document.selection.createRange()
//     selectRange.moveStart('character', -textDom.value.length)
//     cursorPos = selectRange.text.length
//   } else if (textDom.selectionStart || textDom.selectionStart === '0') {
//     cursorPos = textDom.selectionStart
//   }
//   return cursorPos
// }

// function findParentByTagName (root, name) {
//   let parent = root
//   if (typeof name === 'string') {
//     name = [name]
//   }
//   while (name.indexOf(parent.nodeName.toLowerCase()) === -1 && parent.nodeName !== 'BODY' && parent.nodeName !== 'HTML') {
//     parent = parent.parentNode
//   }
//   return parent.nodeName === 'BODY' || parent.nodeName === 'HTML' ? null : parent
// }
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

.smeditor a {
  color: #87AA99;
  margin-right: 3px;
}

.smeditor .blockquote {
  margin: 15px 0px;
}


.smeditor .backup, .smeditor .restore {
  min-width: 40px !important;
}

.smeditor .backup:before , .smeditor .restore:before {
  color: rgb(51, 51, 51);
  font-family: Helvetica, Tahoma, Arial, "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif;
  line-height: 28px;
  font-size: 12px;
  float: left;
  margin-left: 8px;
}

.smeditor .backup:before {
  content: "备份";
}

.smeditor .restore:before {
  content: "恢复";
}

.smeditor .blockquote blockquote {
  color: #BFBFBF;
  padding-left: 15px;
  border-left: 5px solid #f0f0f0;
  margin-top: 0px;
  margin-bottom: 0px;
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

.smeditor .image-caption:empty{
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
