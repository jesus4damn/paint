import {TemplateComponent} from '@/core/TemplateComponent'

export class Canvas extends TemplateComponent {
  static className = 'work_space__canvas'
  constructor($root, options = {}) {
    super($root, {
      name: 'Canvas',
      listeners: ['click'],
      ...options
    })
  }


  toHTML() {
    return ``
  }


  onClick(event) {
    console.log(event.target);
  }
}