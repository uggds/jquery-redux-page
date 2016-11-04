import page from 'page'
import $ from 'jquery'
import jade from 'jade'
import View from './view'

import { AccordionsView } from './accordions'

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
view.setChildComponent('accordionComponent', Hoge)

$.getJSON( '/api/job.json', (list) => {
  view.mount($('.content'), AccordionsView, { list })

  $('.accordion__title').on(`click`, (e) => {
    const $this = $(e.currentTarget)
    const $slideContent = $this.next()
    $slideContent.slideToggle()
  })

  //$('.accordion').map((i, el) => {
  //  const $this = $(el)
  //  $this.data('check', new Hoge(i, $this))
  //})
  $('.view').on('click', (e) => {
    page('/page2')
    e.preventDefault()
  })
})
