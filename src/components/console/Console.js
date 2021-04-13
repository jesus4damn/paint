import { StateComponent } from '../../core/StateComponent'
import {consoleState} from '../../constants'
import { createConsole } from './console.template';

export class Console extends StateComponent {
  static className = 'work_space__console'
  constructor($root, options = {}) {
    super($root, {
      name: 'Console',
      listeners: [],
      subscribe: ['shapes'],
      ...options
    })
  }

  prepare() {
    this.initState(consoleState)
  }

  get template() {
    return createConsole(this.state)
  }

  storeChanged(changes) {
    if ('shapes' in changes) {
      this.setState({shapes: changes.shapes})
    }
  }

  toHTML() {
    return this.template
  }
}