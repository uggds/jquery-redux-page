import page from 'page'
import $ from 'jquery'
import jade from 'jade'
import View from './view'

const checkComponent = {
  template: `
.checkLists
  each large in list
    each middle, index in large.item
      if filter.includes(middle.value)
        .checkList #{middle.label}
          each small in middle.item
            .checkList__item #{small.value} #{small.label}
  .back.-floatEntryBtn
     p.-floatEntryBtn__title
       a.-floatEntryBtn__text(href="#") ぼたん
`
}


class Hoge {
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
      titleDivEl.append(Hoge.$countDiv.text(count))
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

class Accordions {
  constructor(variables) {
    this.$el = Accordions.$el
    this.list = variables.list
    this.ids = []
    this.checkList = {}
    this.init()
  }
  init() {
    this._eventify()
  }
  _eventify() {
    this.$el.find('.accordion').on('click', this._onClick.bind(this))
  }
  _onClick(e) {
    const largeId = $(e.currentTarget).data('check').index
    const middleIds = $(e.currentTarget).data('check').checkList
    let smallIdsSum = 0
    let middleValues = [] 
    middleIds.forEach((id) => {
      smallIdsSum += this.list[largeId].item[id].item.length
      middleValues.push(this.list[largeId].item[id].value)
    })
    this.ids[largeId] = smallIdsSum
    const total = this.ids.reduce(function(a,b) { return a + b }, 0)

    this.checkList[largeId] = middleValues
    this.$el.data('values', this.checkList)
    console.log('middleValues : ' + middleValues)
    console.log('ids : ' + this.ids)
    console.log('total : ' + total)

    const nextBtn = this.$el.find('.-floatEntryBtn__text')
    const btnTotal = this.$el.find('.accordion__btn__total')
    if (!btnTotal.length) {
      nextBtn.append(Accordions.$btnTotal.text(total))
    } else if (total) {
      btnTotal.text(total)
    } else {
      btnTotal.remove()
    }
  }
  static get $btnTotal() {
    return $('<span class="accordion__btn__total -floatEntryBtn__icon"></span>')
  }
  static get template() {
    return `
.accordions
  each large in list
    accordionComponent
  .view.-floatEntryBtn
     p.-floatEntryBtn__title
     .-floatEntryBtn__text(href="#") ぼたん`
  }
  
  static get $el() {
    return $('.accordions') 
  }
}


$(function() {
  let fuga
  page('/page2', function(){
    $.getJSON( '/api/job.json', (list) => {
      const $target = $('.accordions')
      // filter
      const checkList = $target.data('values')
      console.log(checkList)
      let filter = []
      Object.keys(checkList).forEach((key) => {
        filter.push(...checkList[key])
      })
      console.log(filter)
      fuga = $target.detach()
      $('.content').append(jade.render(checkComponent.template, {list, filter}));
      $('.back').on('click', (e) => {
        page('/page1')
        e.preventDefault()
      })
    } )
  })
  page('/page1', function(){
    const $target = $('.checkLists')
    $target.detach()
    $('.content').append(fuga);
  })
})

const view = new View
view.component('accordionComponent', Hoge)

$.getJSON( '/api/job.json', (list) => {
  view.mount($('.content'), Accordions, { list })

  $('.accordion__title').on(`click`, (e) => {
    const $this = $(e.currentTarget)
    const $slideContent = $this.next()
    $slideContent.slideToggle()
  })

  $('.accordion').map((i, el) => {
    const $this = $(el)
    $this.data('check', new Hoge(i, $this))
  })
  $('.view').on('click', (e) => {
    page('/page2')
    e.preventDefault()
  })
})
