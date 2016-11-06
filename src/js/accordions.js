import $ from 'jquery'
import { Accordion } from './accordion'

export class AccordionsModel {
  constructor() {
    this.largeId = 0
    this.middleIds = []
    this.total = 0
    this.sumSmallIdsEveryLargeId = []
    this.middleValuesEveryLargeId = []
  }
  count(largeId, middleIds, list) {
    let sumSmallIds = 0
    let middleValues = [] 
    middleIds.forEach((id) => {
      sumSmallIds += list[largeId].item[id].item.length
      middleValues.push(list[largeId].item[id].value)
    })
    this.sumSmallIdsEveryLargeId[largeId] = sumSmallIds
    this.middleValuesEveryLargeId[largeId] = middleValues
    this.total = this.sumSmallIdsEveryLargeId.reduce(function(a,b) { return a + b }, 0)
    return [this.total, this.middleValuesEveryLargeId]
  }
  static get total() {
    return this.total
  }
  static get middleValuesEveryLargeId() {
    return this.middleValuesEveryLargeId
  }
}

export class AccordionsView {
  constructor(variables) {
    this.$el = $('.accordions') 
    this.list = variables.list
    this.checkList = {}
    this.init()
    this.accordions = new AccordionsModel()
  }
  init() {
    this._eventify()
  }
  _eventify() {
    // children event
    this.$el.find('.accordion').map((index, el) => {
      const $this = $(el)
      $this.data('check', new Accordion(index, $this))
    })

    // onClick event
    this.$el.find('.accordion').on('click', this._onClick.bind(this))
  }

  _onClick(e) {
    const $this = $(e.currentTarget)
    const largeId = $this.data('check').index
    const middleIds = $this.data('check').checkList
    const [total, middleValuesEveryLargeId] = this.accordions.count(largeId, middleIds, this.list)

    const $button = this.$el.find('.-floatEntryBtn__text')
    const $total = this.$el.find('.accordion__btn__total')

    this.$el.data('values', middleValuesEveryLargeId)

    if (!$total.length) {
      $button.append(AccordionsView.$newTotal.text(total))
    } else if (total) {
      $total.text(total)
    } else {
      $total.remove()
    }
  }
  static get $newTotal() {
    return $('<span class="accordion__btn__total -floatEntryBtn__icon"></span>')
  }
  static get template() {
    return `
.accordions
  each large in list
    accordionComponent
  .view.-floatEntryBtn
     p.-floatEntryBtn__title
     a.-floatEntryBtn__text(href="/page2") ぼたん`
  }
}

