import $ from 'jquery'

export class Accordion {
  constructor(index, $el) {
    this.index = index
    this.$el = $el
    this.init()
    this.checkList = []
  }
  init() {
    this._eventify()
  }
  _eventify() {
    this.$el.find('.accordion__item').on('click', this._onClick.bind(this))
  }
  _onClick(e) {
    const $child = $(e.currentTarget).find('.accordion__checkbox')[0]
    const value = $child.value
    const index = this.checkList.indexOf(value)
    if (index === -1) {
      this.checkList.push(value)
      $child.checked = true
    } else {
      this.checkList.splice(index, 1)
      $child.checked = false
    }
    this.checkList.sort((a, b) => {
      return a - b
    })
    const count = this.checkList.length
    const countDivEl = this.$el.find('.accordion__count')
    const titleDivEl = this.$el.find('.accordion__title')
    if (!countDivEl.length) {
      titleDivEl.append(Accordion.$countDiv.text(count))
    } else if (count) {
      countDivEl.text(count)
    } else {
      countDivEl.remove()
    }
    console.log(`checked index: ${value}`)
    console.log(this.checkList)
  }

  static get $countDiv() {
    return $('<span class="accordion__count"></span>')
  }
  static get template() {
    return `
.accordion
  .accordion__title #{large.label}
  .accordion__content
    each middle, index in large.item
      .accordion__item
        input.accordion__checkbox(type="checkbox" value="#{index}")
        | #{middle.label}`
  }
}

