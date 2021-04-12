import {TemplateComponent} from '@/core/TemplateComponent'
import { toolbarState } from '../../constants'

export class Canvas extends TemplateComponent {
  static className = 'work_space__canvas'
  constructor($root, options = {}) {
    super($root, {
      name: 'Canvas',
      listeners: [],
      subscribe: ['mode'],
      ...options
    })
    this.width = 700
    this.height = 500
  }

  init() {
    super.init()
    this.ctx = document.getElementById('canvas').getContext('2d')
    this.mode = this.store.getState().mode || toolbarState
  }


  toHTML() {
    return `
        <canvas height='${this.height}' width='${this.width}' id='canvas'>
        </canvas>
    `
  }
}