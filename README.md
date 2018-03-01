# SMEditor

> ✎ 基于 Vue.js 2.0+ 石墨文档样式的富文本编辑器, 轻量, 快速, 优雅

预览: https://ericjj.com/smeditor.github.io/
反馈: https://github.com/ericjjj/smeditor/issues
联系: github@ericjj.com

## 起因
之前一直使用的 [wangEditor](https://www.kancloud.cn/wangfupeng/wangeditor3/332599) 不能满足 [我司](http://geekpark.net) 编辑需求, 使用过程中也出了很多问题,  [simditor](http://simditor.tower.im/) 体验之后效果不是很好, 并且也不维护了; [极客公园后台管理系统](https://github.com/GeekPark/gpk_admin)技术选型已经转向了 Vue, 所以就有了这个轮子;

## 功能
- [x] 轻, 快
- [x] 自动添加图片描述框 (类似简书)
- [x] 复制上传, 多张批量上传
- [x] 轻量级备份, 恢复, 预览
- [x] 代码精简, 适合二次开发
- [x] 其他编辑器有的功能

## 使用

```js
// 安装
npm install smeditor

// 使用
import smeditor from smeditor

// 全局组件 / .vue文件内引入
Vue.use(smeditor)
```


