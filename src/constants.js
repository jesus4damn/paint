export const modes = {
    DRAW_POINT: 'DRAW_POINT',
    DRAW_SQUARE: 'DRAW_SQUARE',
    DRAW_CIRCLE: 'DRAW_CIRCLE',
    DRAW_BEZIER_CURVE: 'DRAW_BEZIER_CURVE',
    DELETE: 'DELETE',
    FILL_BORDER: 'FILL_BORDER',
    FILL_INNER: 'FILL_INNER',
    MOVE_POINT: 'MOVE_POINT'
}

export const defaultMode = modes.DRAW_POINT

export const toolbarState = {
    currentMode: modes.DRAW_POINT,
    startDraw: false,
    clearCanvas: false,
    edgesColorModal: false,
    fillColorModal: false,
    edgesColor: '#ff0000',
    fillColor: '#fffb00',
}

export const consoleState = {
    shapes: []
}

export const canvasSize = {width: 700, height: 500}