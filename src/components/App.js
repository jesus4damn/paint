import {$} from '@/core/dom'
import { Toolbar } from './toolbar/Toolbar'
import { WorkSpace } from './workSpace/WorkSpace'

export class App {
  constructor(selector) {
    this.$el = $(selector)
    this.components = [Toolbar, WorkSpace]
  }

  getRoot() {
    const $root = $.create('div', 'paint')


    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.components.forEach(component => component.init())
  }

  destroy() {
    this.components.forEach(component => component.destroy())
  }
}