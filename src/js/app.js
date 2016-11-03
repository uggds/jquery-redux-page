import page from 'page'
import $ from 'jquery'
import jade from 'jade'
import View from './view'

// const template = require('../../../jade/entry/tssmp/_list.jade')
// const template2 = require('../../../jade/entry/tssmp/_list2.jade')

const accordionsComponent = {
  template: `
.accordions
  each large in list
    accordionComponent
`
}
const accordionComponent = {
  template: `
.accordion
  .accordion__title #{large.value} #{large.label}
  .accordion__content
    each middle, index in large.item
      .accordion__item
        input.accordion__checkbox(type="checkbox" value="#{index}")
        | #{middle.label}
`
}

const checkComponent = {
  template: `
ul.sho
  each item in list
    each item2 in item.item
      li.chu__item 
        span.chu__item__label #{item2.value} #{item2.label}
`
}

page('/page2', function(){
  $.getJSON( '/api/job.json', (json) => {
    //$('.dai').animate({ marginLeft:'-340px',opacity:'0' }, 300 );
    const $target = $('.dai')
    if ($target.css("display") == "none"){
      $target.show("slide", {direction: 'left'}, 1000, function(){
        $target.clearQueue();
      });
    } else {
      $target.hide("slide", {direction: 'left'}, 1000, function(){
        $target.clearQueue();
      });
    }
    $('.content').append(jade.render(checkComponent.template, {list: json}));
  } )
});

$('.view').on('click', (e) => {
  page('/page2')
  e.preventDefault()
})


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
} 

class Fuga {
  constructor($el, list) {
    this.$el = $el
    this.init()
    this.list = list
    this.ids = new Array( list.length ).map(() => { return 0 })
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
    middleIds.forEach((id) => {
      smallIdsSum += this.list[largeId].item[id].item.length
    })
    this.ids[largeId] = smallIdsSum
    console.log(this.ids.reduce((a,b) => { return a + b }, 0))
  }
} 


$(function() {
  $('.accordion__title').on(`click`, (e) => {
    const $this = $(e.currentTarget)
    const $slideContent = $this.next()
    $this.find(`.js-slide__icon`).css(
      `transform`, $slideContent.is(`:visible`) ? `translate(0%, -50%) rotate(90deg)` : `translate(0%, -50%) rotate(-90deg)`)
    $slideContent.slideToggle()
  })

  $('.accordion').map((i, el) => {
    const $this = $(el)
    $this.data('check', new Hoge(i, $this))
  })

})

const view = new View
view.component('accordionComponent', accordionComponent)

$.getJSON( '/api/job.json', (json) => {
  view.mount('.content', accordionsComponent, { list: json })
  new Fuga($('.accordions'), json)
} )



