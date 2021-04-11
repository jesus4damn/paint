import {TemplateComponent} from '@/core/TemplateComponent'

export class Console extends TemplateComponent {
  static className = 'work_space__console'
  constructor($root, options = {}) {
    super($root, {
      name: 'Console',
      listeners: ['click'],
      ...options
    })
  }


  toHTML() {
    return `
        <div class="console__header">
            Console:
        </div>
    `
  }


  onClick(event) {
    console.log(event.target);
  }
}