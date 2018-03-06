const qiniu = (name) => {
  return `https://om4m02471.qnssl.com/2018/editor/${name}.svg?2`
}

const names = ['bold', 'italic', 'underline', 'strikethrough', 'color', 'listOrdered', 'listUnordered', 'listCheck', 'indent', 'outdent', 'alignLeft', 'alignCenter', 'alignRight', 'undo', 'redo', 'removeFormat', 'insertVideo', 'insertLink', 'insertImage', 'insertLine', 'insertQuote', 'insertBlock']
const icons = {}

names.forEach(name => {
  icons[name] = qiniu(name.toLowerCase())
})

export default icons
