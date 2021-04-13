import { getRadius } from '../core/utils'
import {
  ADD_CIRCLE,
  ADD_POINT_TO_POLYGON,
  ADD_POLYGON,
  CHANGE_MODE,
  START_DRAW,
  CHANGE_CIRCLE_RADIUS,
  CLEAR_CANVAS,
  MOVE_POINT,
  MOVE_CIRCLE,
  DELETE_POINT,
  DELETE_CIRCLE,
  CHANGE_EDGES_COLOR,
  CHANGE_FILL_COLOR
} from './types'
  
export function rootReducer(state, action) {
    switch (action.type) {
      case CHANGE_MODE:
        return {...state, mode: action.mode}
      case START_DRAW:
        return {
          ...state,
          startDraw: action.start,
          countShapes: action.start ? state.countShapes : state.countShapes + 1
        }
      case ADD_POLYGON:
        return {...state, shapes: [...state.shapes, action.polygon]}
      case ADD_CIRCLE:
        return {...state, shapes: [...state.shapes, action.circle]}
      case ADD_POINT_TO_POLYGON:
        state.shapes[action.index].points.push(action.point)
        state.shapes[action.index].points = 
          [...state.shapes[action.index].points]
        state.shapes[action.index] = {...state.shapes[action.index]}
        return {...state, shapes: [...state.shapes]}
      case CHANGE_CIRCLE_RADIUS:
        state.shapes[action.index].radius = getRadius(
                                            state.shapes[action.index].center.x,
                                            state.shapes[action.index].center.y,
                                            action.mousePosition.x,
                                            action.mousePosition.y)
        state.shapes[action.index] = {...state.shapes[action.index]}
        return {...state, shapes: [...state.shapes]}
      case MOVE_POINT:
        state.shapes[action.indexShape].points[action.indexPoint] = 
          {x: action.x, y: action.y}
        state.shapes[action.indexShape].points = 
          [...state.shapes[action.indexShape].points]
        state.shapes[action.indexShape] = {...state.shapes[action.indexShape]}
        return {...state, shapes: [...state.shapes]}
      case MOVE_CIRCLE:
        state.shapes[action.index].center = {
          x: action.x - action.deltaX,
          y: action.y - action.deltaY}
        state.shapes[action.index] = {...state.shapes[action.index]}
        return {...state, shapes: [...state.shapes]}
      case DELETE_POINT:
        state.shapes[action.indexShape].points.splice(action.indexPoint, 1)
        if (state.shapes[action.indexShape].points.length === 0) {
          state.shapes.splice(action.indexShape, 1)
          return {...state, shapes: [...state.shapes]}
        }
        state.shapes[action.indexShape].points = 
          [...state.shapes[action.indexShape].points]
        state.shapes[action.indexShape] = {...state.shapes[action.indexShape]}
        return {...state, shapes: [...state.shapes]}
      case DELETE_CIRCLE:
        state.shapes.splice(action.index, 1)
        return {...state, shapes: [...state.shapes]}
      case CHANGE_EDGES_COLOR:
        return {...state, edgesColor: action.color}
      case CHANGE_FILL_COLOR:
        return {...state, fillColor: action.color}
      case CLEAR_CANVAS:
        return {...state, shapes: []}
      default: 
        return state
    }
}