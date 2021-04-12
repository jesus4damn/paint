import { modes } from '../../constants'

function Button(button) {
    const meta = `
      data-type="button",
      data-value="${button.value}"
      data-name="${button.name}"
    `
    return `
      <div class="button button__left ${button.active ? 'active' : ''}" ${meta}>
        <i class="material-icons" ${meta}>
            ${button.icon}
        </i>
      </div>
    `
}
  
export function createToolbar(state) {
    const buttons = [
      {
        value: modes.DRAW_POINT,
        icon: 'radio_button_checked',
        active: state.currentMode === modes.DRAW_POINT
      },
      {
        value: modes.DRAW_CIRCLE,
        icon: 'radio_button_unchecked',
        active: state.currentMode === modes.DRAW_CIRCLE
      },
      {
        value: modes.DRAW_SQUARE,
        icon: 'check_box_outline_blank',
        active: state.currentMode === modes.DRAW_SQUARE
      },
      {
        value: modes.DRAW_BEZIER_CURVE,
        icon: 'timeline',
        active: state.currentMode === modes.DRAW_BEZIER_CURVE
      },
      {
        value: modes.MOVE_POINT,
        icon: 'pan_tool',
        active: state.currentMode === modes.MOVE_POINT
      },
      {
        value: modes.DELETE,
        icon: 'delete',
        active: state.currentMode === modes.DELETE
      }
    ]
    return `
        <div class="buttons">
            ${buttons.map(Button).join('')}
        </div>
        <div class="buttons"></div>
    `
  }