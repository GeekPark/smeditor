import SMEditor from './components/SMEditor.vue'

const install = function (Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return

  Vue.component(SMEditor.name, SMEditor)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default SMEditor
