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
            <div class="button button__left" data-type="border-button">
              <i class='material-icons' 
                data-type="border-button" style="color:${state.edgesColor}">
                  border_color
              </i>
            </div>
            <div class="button button__left" data-type="fill-button">
              <i class="material-icons" 
                data-type="fill-button" style="color:${state.fillColor}">
                  format_color_fill
              </i>
            </div>
        </div>
        <div class="buttons">
          ${state.startDraw && state.currentMode === modes.DRAW_POINT ? 
          `
            <div class="button check_mark" data-type="done">
                <i class="material-icons" data-type="done">done</i>
            </div>
          ` : ''}
          ${state.clearCanvas ? 
          `
            <div class="button clear_canvas" data-type="clear">
                <i class="material-icons" data-type="clear">clear</i>
            </div>
          ` : ''}
        </div>
        ${state.edgesColorModal ? 
        `
        <div class="background" data-type="background">
            <div class="palitra">
                <h1>Edges color</h1>
                <div class="colors">
                  <div class="color color__1" 
                    data-type="edge-color-button" data-value="#ff0000"></div>
                  <div class="color color__2"
                    data-type="edge-color-button" data-value="#fffb00"></div>
                  <div class="color color__3"
                    data-type="edge-color-button" data-value="#00ff0d"></div>
                  <div class="color color__4"
                    data-type="edge-color-button" data-value="#00ffea"></div>
                </div>
                <div class="colors">
                  <div class="color color__5"
                    data-type="edge-color-button" data-value="#0400ff"></div>
                  <div class="color color__6"
                    data-type="edge-color-button" data-value="#ff00f2"></div>
                  <div class="color color__7"
                    data-type="edge-color-button" data-value="#470258"></div>
                  <div class="color color__8"
                    data-type="edge-color-button" data-value="#070707"></div>
                </div>
            </div>
        </div>
        ` : ''}
        ${state.fillColorModal ? 
          `
          <div class="background" data-type="background">
              <div class="palitra">
                  <h1>Fill color</h1>
                  <div class="colors">
                    <div class="color color__1" 
                      data-type="fill-color-button" data-value="#ff0000"></div>
                    <div class="color color__2"
                      data-type="fill-color-button" data-value="#fffb00"></div>
                    <div class="color color__3"
                      data-type="fill-color-button" data-value="#00ff0d"></div>
                    <div class="color color__4"
                      data-type="fill-color-button" data-value="#00ffea"></div>
                  </div>
                  <div class="colors">
                    <div class="color color__5"
                      data-type="fill-color-button" data-value="#0400ff"></div>
                    <div class="color color__6"
                      data-type="fill-color-button" data-value="#ff00f2"></div>
                    <div class="color color__7"
                      data-type="fill-color-button" data-value="#470258"></div>
                    <div class="color color__8"
                      data-type="fill-color-button" data-value="#070707"></div>
                  </div>
              </div>
          </div>
          ` : ''}
    `
  }