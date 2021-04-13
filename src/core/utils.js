import { canvasSize } from '../constants'

// input => onInput
export function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}

// string => String
export function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
      return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export function draw(context, shapes) {
    context.clearRect(0, 0, canvasSize.width, canvasSize.height)
    shapes.forEach(shape => {
        context.beginPath()
        context.fillStyle = shape.background
        context.lineWidth = 1
        context.strokeStyle = shape.edgesColor
        if (shape.type === 'circle') {
            context.arc(shape.center.x, shape.center.y,
                shape.radius, 0, 2 * Math.PI)
        } else {
            shape.points.forEach(point => {
                context.lineTo(point.x, point.y)
                context.strokeRect(point.x, point.y, 1, 1)
            })
            if (shape.points.length > 2) {
                context.lineTo(shape.points[0].x, shape.points[0].y)
            }
        }
        context.fill()
        context.stroke()
    })
}

export function getRadius(x0, y0, x1, y1) {
    return Math.sqrt((x0-x1)**2 + (y0-y1)**2)
}