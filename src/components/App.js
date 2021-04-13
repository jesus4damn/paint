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
    this.components = html(this.components, componentOptions, $root)
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

function html(components, componentOptions, $root) {
  const allComponents = []
  for (let i = 0; i < components.length; i++) {
    const $el = $.create('div', components[i].className)
    const component = new components[i]($el, componentOptions)
    allComponents.push(component)
    if (component.getComponents().length) {
      allComponents.push(
        ...html(component.getComponents(), componentOptions, $el)
      )
    } else {
      $el.html(component.toHTML())
    }
    $root.append($el)
  }
  return allComponents
}