# SMEditor

[![Build Status](https://travis-ci.org/ericjjj/smeditor.svg?branch=master)](https://travis-ci.org/ericjjj/smeditor)
[![Code Climate](https://codeclimate.com/github/ericjjj/smeditor/badges/gpa.svg)](https://codeclimate.com/github/ericjjj/smeditor)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Downloads](https://img.shields.io/npm/dm/smeditor.svg)](https://npmjs.org/package/smeditor)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

> ✎ 基于 Vue.js 2.0+ 石墨文档样式的富文本编辑器, 轻量, 快速, 优雅

在线预览: https://ericjj.com/smeditor.github.io/

反馈: https://github.com/ericjjj/smeditor/issues

联系: github@ericjj.com

关于作者: https://ericjj.com/about/


## 起因
之前一直使用的 [wangEditor](https://www.kancloud.cn/wangfupeng/wangeditor3/332599) 不能满足 [我司](http://geekpark.net) 编辑需求, 使用过程中也出了很多问题,  [simditor](http://simditor.tower.im/) 体验之后效果不是很好, 并且也不维护了; [极客公园后台管理系统](https://github.com/GeekPark/gpk_admin)技术选型已经转向了 Vue, 所以就有了这个轮子;

## 功能
- [x] 轻, 快 48 KB
- [x] 自动添加图片描述框 (类似简书)
- [x] 复制上传, 多张批量上传
- [x] 轻量级备份, 恢复, 预览
- [x] 代码精简, 适合二次开发
- [x] 其他编辑器有的功能
- [ ] 移动端

## 使用

```js
// 安装
npm install smeditor

// 引入
import SMEditor from 'smeditor'

// 全局组件
Vue.use(SMEditor)

// 局部组件
components: {
  'smeditor': SMEditor
}

// 使用
<smeditor :config='config'></smeditor>
```

## 配置
```js
const config = {
  // 接口地址
  uploadUrl: '',
  // form 里的 filename
  uploadName: '',
  // 其他参数
  uploadParams: {},
  // 上传成功回调
  uploadCallback: (data) => {
    console.log(data)
    return 'blob:https://fiddle.jshell.net/00a0b0b4-d19a-4860-9796-137692aef36f'
  },
  // 上传失败回调, 可选
  uploadFailed: (err) => {
    console.log(err)
  }
}
```

## 快捷键
```
Ctrl + S 保存
Ctrl + P 预览(新窗口)
```

## 本地运行

```
npm run dev

npm run build
```

## 打赏

如果你感觉有收获，欢迎给我打赏 ———— 以激励我更多输出优质开源内容
<img src="https://ws4.sinaimg.cn/large/006tNc79ly1fnyqbykokqj30w00w0wh9.jpg" width = "50%" />
