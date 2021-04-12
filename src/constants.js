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
    currentMode: modes.DRAW_POINT
}