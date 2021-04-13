import {
    CHANGE_MODE,
    START_DRAW,
    ADD_CIRCLE,
    ADD_POLYGON,
    ADD_POINT_TO_POLYGON,
    CHANGE_CIRCLE_RADIUS,
    CLEAR_CANVAS,
    MOVE_CIRCLE,
    MOVE_POINT,
    DELETE_CIRCLE,
    DELETE_POINT,
    CHANGE_EDGES_COLOR,
    CHANGE_FILL_COLOR
} from './types'
  

export function changeMode(mode) {
    return {
        type: CHANGE_MODE,
        mode
    }
}

export function setStartDraw(start) {
    return {
        type: START_DRAW,
        start
    }
}

export function addPolygon(point, background, edgesColor) {
    return {
        type: ADD_POLYGON,
        polygon: {
            type: 'polygon',
            points: [point],
            background,
            edgesColor
        }
    }
}


export function addCircle(center, radius, background, edgesColor) {
    return {
        type: ADD_CIRCLE,
        circle: {
            type: 'circle',
            center,
            radius,
            background,
            edgesColor
        }
    }
}

export function changeCircleRadius(index, mousePosition) {
    return {
        type: CHANGE_CIRCLE_RADIUS,
        index,
        mousePosition
    }
}

export function addPointToPolygon(index, point) {
    return {
        type: ADD_POINT_TO_POLYGON,
        index,
        point
    }
}

export function clearCanvas() {
    return {
        type: CLEAR_CANVAS
    }
}

export function moveCircle(index, x, y, deltaX, deltaY) {
    return {
        type: MOVE_CIRCLE,
        index,
        x,
        y,
        deltaX,
        deltaY
    }
}

export function movePoint(indexShape, indexPoint, x, y) {
    return {
        type: MOVE_POINT,
        indexShape,
        indexPoint,
        x,
        y
    }
}

export function deleteCircle(index) {
    return {
        type: DELETE_CIRCLE,
        index
    }
}

export function deletePoint(indexShape, indexPoint) {
    return {
        type: DELETE_POINT,
        indexShape,
        indexPoint
    }
}

export function changeFillColor(color) {
    return {
        type: CHANGE_FILL_COLOR,
        color
    }
}

export function changeEdgesColor(color) {
    return {
        type: CHANGE_EDGES_COLOR,
        color
    }
}