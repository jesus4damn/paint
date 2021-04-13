import {DomListener} from './DomListener'

export class TemplateComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.components = options.components || []

    this.prepare()
  }

  prepare() {}

  toHTML() {
    return ''
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanged() {}

  getComponents() {
    return this.components
  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
  }
}