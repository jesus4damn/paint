export class Dom {
    constructor(selector, id) {
      this.$el = typeof selector === 'string'
        ? id ? document.querySelector('#' + selector) 
        : document.querySelector(selector)
        : selector
    }
  
    // get/set html
    html(html) {
      if (html instanceof Dom) {
        this.$el.innerHTML = html.$el.outerHTML.trim()
        return this
      }
      if (typeof html === 'string') {
        this.$el.innerHTML = html
        return this
      }
      return this.$el.outerHTML.trim()
    }
  
    clear() {
      this.html('')
      return this
    }
  
    get data() {
      return this.$el.dataset
    }

    on(eventType, callback) {
      this.$el.addEventListener(eventType, callback)
    }
  
    off(eventType, callback) {
      this.$el.removeEventListener(eventType, callback)
    }

    position() {
      return this.$el.getBoundingClientRect()
    }

    append(node) {
      if (node instanceof Dom) {
        node = node.$el
      }

      if (Element.prototype.append) {
        this.$el.append(node)
      } else {
        this.$el.appendChild(node)
      }

      return this
    }
  
    css(styles = {}) {
      Object
          .keys(styles)
          .forEach(key => {
            this.$el.style[key] = styles[key]
          })
    }

  
    addClass(className) {
      this.$el.classList.add(className)
    }
  
    removeClass(className) {
      this.$el.classList.remove(className)
    }
  }
  
  export function $(selector, id = false) {
    return new Dom(selector, id)
  }
  
  $.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
      el.classList.add(classes)
    }
    return $(el)
  }