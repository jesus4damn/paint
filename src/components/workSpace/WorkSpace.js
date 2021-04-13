import {TemplateComponent} from '@/core/TemplateComponent'
import { Canvas } from '../canvas/Canvas'
import { Console } from '../console/Console'

export class WorkSpace extends TemplateComponent {
  static className = 'paint__work_space'
  constructor($root, options = {}) {
    super($root, {
      name: 'WorkSpace',
      listeners: [],
      components: [Canvas, Console],
      ...options
    })
  }
  toHTML() {
    return ''
  }
}