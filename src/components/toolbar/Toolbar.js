import {TemplateComponent} from '@/core/TemplateComponent'

export class Toolbar extends TemplateComponent {
  static className = 'paint__toolbar'
  constructor($root, options = {}) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    })
  }


  toHTML() {
    return `
        <div class="buttons">
          <div class="button button__left active" data-type="button">
              <i class="material-icons" data-type="button">
                radio_button_checked
              </i>
              <div class="button__drop_list">
                  <div class="content">
                      <div class="content__item">
                          <i class="material-icons">radio_button_checked</i>
                          <p>Точка</p>
                      </div>
                      <div class="content__item">
                          <i class="material-icons">check_box_outline_blank</i>
                          <p>Квадрат</p>
                      </div>
                      <div class="content__item">
                          <i class="material-icons">circle</i>
                          <p>Круг</p>
                      </div>
                      <div class="content__item">
                          <i class="material-icons">circle</i>
                          <p>Кривая безье</p>
                      </div>
                  </div>
              </div>
          </div>
          <div class="button button__left" data-type="button">
              <i class="material-icons" data-type="button">pan_tool</i>
          </div>
          <div class="button button__left" data-type="button">
              <i class="material-icons" data-type="button">delete</i>
          </div>
          <div class="button button__left" data-type="button">
              <i class="material-icons" data-type="button">border_color</i>
          </div>
          <div class="button button__left" data-type="button">
              <i class="material-icons" data-type="button">format_color_fill</i>
          </div>
      </div>
      <div class="buttons">
          <div class="button" data-type="button">
              <i class="material-icons" data-type="button">arrow_back</i>
          </div>
          <div class="button" data-type="button">
              <i class="material-icons" data-type="button">cached</i>
          </div>
      </div>
    `
  }


  onClick(event) {
    console.log(event.target);
  }
}