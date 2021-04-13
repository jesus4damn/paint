import {TemplateComponent} from '@/core/TemplateComponent'
import { canvasSize, defaultMode, modes } from '../../constants'
import { draw, getRadius } from '../../core/utils'
import { 
  addCircle,
  addPointToPolygon,
  addPolygon,
  changeCircleRadius,
  deleteCircle,
  deletePoint,
  moveCircle,
  movePoint,
  setStartDraw
} from '../../redux/actions'

export class Canvas extends TemplateComponent {
  static className = 'work_space__canvas'
  constructor($root, options = {}) {
    super($root, {
      name: 'Canvas',
      listeners: ['mousedown', 'mousemove', 'mouseup'],
      subscribe: ['mode', 'startDraw', 'shapes', 'fillColor', 'edgesColor'],
      ...options
    })
    this.width = canvasSize.width
    this.height = canvasSize.height
  }

  init() {
    super.init()
    this.ctx = document.getElementById('canvas').getContext('2d')
    const state = this.store.getState()
    this.mode = state.mode || defaultMode
    this.start = state.startDraw || false
    this.countShapes = state.shapes.length
    this.indexes = [null, null]
    this.deltaXY = [null, null]
    this.edgesColor = state.edgesColor
    this.fillColor = state.fillColor
    draw(this.ctx, state.shapes)
  }

  storeChanged(changes) {
    if ('mode' in changes) {
      this.mode = changes.mode
    }
    if ('startDraw' in changes) {
      this.start = changes.startDraw
    }
    if ('edgesColor' in changes) {
      this.edgesColor = changes.edgesColor
    }
    if ('fillColor' in changes) {
      this.fillColor = changes.fillColor
    }
    if ('shapes' in changes) {
      this.countShapes = changes.shapes.length - 1
      draw(this.ctx, changes.shapes)
    }
  }


  toHTML() {
    return `
        <canvas height='${this.height}' width='${this.width}' id='canvas'>
        </canvas>
    `
  }

  getCoordinates(event) {
    return {
      x: event.clientX - this.$root.position().x,
      y: event.clientY - this.$root.position().y
    }
  }

  drawPoligon(event) {
    const {x, y} = this.getCoordinates(event)
    if (!this.start) {
      this.$dispatch(setStartDraw(true))
      this.$dispatch(addPolygon({x, y}, this.fillColor, this.edgesColor))
    } else {
      this.$dispatch(addPointToPolygon(this.countShapes, {x, y}))
    }
  }

  drawCircle(event) {
    const {x, y} = this.getCoordinates(event)
    this.$dispatch(setStartDraw(true))
    this.$dispatch(addCircle({x, y}, 1, this.fillColor, this.edgesColor))
  }

  choosePoint(event) {
    const {x, y} = this.getCoordinates(event)
    const shapes = this.store.getState().shapes
    shapes.forEach((shape, index) => {
      if (shape.type === 'circle') {
        if (getRadius(x, y, shape.center.x, shape.center.y) <= shape.radius) {
          this.indexes = [index, null]
          this.deltaXY = [x - shape.center.x, y - shape.center.y]
        }
      } else if (shape.type === 'polygon') {
        shape.points.forEach((point, i) => {
          if (getRadius(x, y, point.x, point.y) <= 2) {
            this.indexes = [index, i]
          }
        })
      }
    })
  }

  deleteShape(event) {
    const {x, y} = this.getCoordinates(event)
    const shapes = this.store.getState().shapes
    shapes.forEach((shape, index) => {
      if (shape.type === 'circle') {
        if (getRadius(x, y, shape.center.x, shape.center.y) <= shape.radius) {
          this.$dispatch(deleteCircle(index))
        }
      } else if (shape.type === 'polygon') {
        shape.points.forEach((point, i) => {
          if (getRadius(x, y, point.x, point.y) <= 2) {
            this.$dispatch(deletePoint(index, i))
          }
        })
      }
    })
  }

  onMousedown(event) {
    if (this.mode === modes.DRAW_POINT) {
      this.drawPoligon(event)
    }
    if (this.mode === modes.DRAW_CIRCLE) {
      this.drawCircle(event)
    }
    if (this.mode === modes.MOVE_POINT) {
      this.choosePoint(event)
    }
    if (this.mode === modes.DELETE) {
      this.deleteShape(event)
    }
  }

  onMousemove(event) {
    if (this.mode === modes.DRAW_CIRCLE && this.start) {
      const {x, y} = this.getCoordinates(event)
      this.$dispatch(changeCircleRadius(this.countShapes, {x, y}))
    }
    if (this.mode === modes.MOVE_POINT && this.indexes[0] !== null) {
      const {x, y} = this.getCoordinates(event)
      if (this.indexes[1] !== null) {
        this.$dispatch(movePoint(this.indexes[0], this.indexes[1], x, y))
      } else {
        this.$dispatch(
            moveCircle(this.indexes[0], x, y, this.deltaXY[0], this.deltaXY[1]))
      }
    }
  }

  onMouseup() {
    if (this.mode === modes.DRAW_CIRCLE && this.start) {
      this.$dispatch(setStartDraw(false))
    }
    if (this.mode === modes.MOVE_POINT) {
      this.indexes = [null, null]
      this.deltaXY = [null, null]
    }
  }
}