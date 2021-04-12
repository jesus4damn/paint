import {$} from '@/core/dom'
import {TemplateComponent} from '@/core/TemplateComponent'
import { Canvas } from '../canvas/Canvas'
import { Console } from '../console/Console'

export class WorkSpace extends TemplateComponent {
  static className = 'paint__work_space'
  constructor($root, options = {}) {
    super($root, {
      name: 'WorkSpace',
      listeners: [],
      ...options
    })
    this.options = options
    this.subscriber = options.subscriber
    this.components = [Canvas, Console]
  }


  toHTML() {
    let html = '';
    this.components = this.components.map(Component => {
        const $el = $.create('div', Component.className)
        const component = new Component($el, this.options)
        html += $el.html(component.toHTML()).html()
        return component
    })
    
    return html
  }

  init() {
    super.init()

    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
  }
}