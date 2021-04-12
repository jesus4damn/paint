import {
    CHANGE_MODE
} from './types'
  

export function changeMode(mode) {
    return {
        type: CHANGE_MODE,
        mode
    }
}