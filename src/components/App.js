import {$} from '@/core/dom'
import { StoreSubscriber } from '../core/StoreSubscriber'
import { Toolbar } from './toolbar/Toolbar'
import { WorkSpace } from './workSpace/WorkSpace'

export class App {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = [Toolbar, WorkSpace]
    this.store = options.store
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'paint')

    const componentOptions = {
      store: this.store,
      subscriber: this.subscriber
    }

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
  }
}