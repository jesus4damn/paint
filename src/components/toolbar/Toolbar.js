import { StateComponent } from '../../core/StateComponent';
import { createToolbar } from './toolbar.template';
import {$} from '../../core/dom'
import {toolbarState} from '../../constants'
import { changeMode } from '../../redux/actions';

export class Toolbar extends StateComponent {
  static className = 'paint__toolbar'
  constructor($root, options = {}) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['mode'],
      ...options
    })
  }

  prepare() {
    this.initState(toolbarState)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged(changes) {
    this.setState({currentMode: changes.mode})
  }


  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      this.$dispatch(changeMode($target.data.value))
    }
  }
}