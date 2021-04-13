import { StateComponent } from '../../core/StateComponent';
import { createToolbar } from './toolbar.template';
import {$} from '../../core/dom'
import {toolbarState} from '../../constants'
import { 
  changeEdgesColor,
  changeFillColor,
  changeMode,
  clearCanvas,
  setStartDraw
} from '../../redux/actions';

export class Toolbar extends StateComponent {
  static className = 'paint__toolbar'
  constructor($root, options = {}) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['mode', 'startDraw'],
      ...options
    })
  }

  prepare() {
    this.initState(toolbarState)
    this.onKeydown = this.onKeydown.bind(this)
    window.addEventListener('keydown', this.onKeydown)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged(changes) {
    if ('mode' in changes) {
      this.setState({...this.state, currentMode: changes.mode})
    }
    if ('startDraw' in changes) {
      this.setState({
        ...this.state,
        startDraw: changes.startDraw,
        clearCanvas: changes.startDraw ? true : this.state.clearCanvas
      })
    }
  }


  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      this.$dispatch(setStartDraw(false))
      this.$dispatch(changeMode($target.data.value))
    }
    if ($target.data.type === 'done') {
      this.$dispatch(setStartDraw(false))
    }
    if ($target.data.type === 'clear') {
      this.clearCanvas()
    }
    if ($target.data.type === 'border-button') {
      this.setState({...this.state, edgesColorModal: true})
    }
    if ($target.data.type === 'fill-button') {
      this.setState({...this.state, fillColorModal: true})
    }
    if ($target.data.type === 'background') {
      this.setState({
        ...this.state,
        fillColorModal: false,
        edgesColorModal: false
      })
    }
    if ($target.data.type === 'edge-color-button') {
      this.$dispatch(changeEdgesColor($target.data.value))
      this.setState({
        ...this.state,
        edgesColorModal: false,
        edgesColor: $target.data.value
      })
    }
    if ($target.data.type === 'fill-color-button') {
      this.$dispatch(changeFillColor($target.data.value))
      this.setState({
        ...this.state,
        fillColorModal: false,
        fillColor: $target.data.value
      })
    }
  }

  clearCanvas() {
    this.setState({
      clearCanvas: false
    })
    this.$dispatch(setStartDraw(false))
    this.$dispatch(clearCanvas())
  }

  onKeydown(event) {
    if (event.key === 'Enter' && this.state.startDraw) {
      this.$dispatch(setStartDraw(false))
    }
    if (event.key === 'Escape') {
      this.clearCanvas()
    }
  }

  destroy() {
    super.destroy()
    window.removeEventListener('keydown', this.onKeydown)
  }
}