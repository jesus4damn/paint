import {$} from '@/core/dom'
import {TemplateComponent} from '@/core/TemplateComponent'
import { Canvas } from '../canvas/Canvas'
import { Console } from '../console/Console'

export class WorkSpace extends TemplateComponent {
  static className = 'paint__work_space'
  constructor($root, options = {}) {
    super($root, {
      name: 'WorkSpace',
      listeners: ['click'],
      ...options
    })
    this.components = [Canvas, Console]
  }


  toHTML() {
    let html = '';
    this.components = this.components.map(Component => {
        const $el = $.create('div', Component.className)
        const component = new Component($el)
        html += $el.html(component.toHTML()).html()
        return component
    })
    
    return html
  }

  init() {
    super.init()
    this.components.forEach(component => component.init())
  }

  onClick(event) {
    console.log(event.target);
  }
}