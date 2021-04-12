import {
    CHANGE_MODE
} from './types'
  
export function rootReducer(state, action) {
    switch (action.type) {
      case CHANGE_MODE:
        return {...state, mode: action.mode}
      default: 
        return state
    }
}