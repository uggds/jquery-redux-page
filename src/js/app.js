import page from 'page'
import $ from 'jquery'
import jade from 'jade'
import View from './view'

import { AccordionsView } from './accordions'
import { Accordion } from './accordion'

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
       a.-floatEntryBtn__text(href="/") ボタン
`
}

const view = new View
view.setChildComponent('accordionComponent', Accordion)

let fuga
page('/', load)
page('/page2', load2)
page()

function load(ctx, next){
  if (fuga) {
    const $target = $('.checkLists')
    $target.remove()
    $('.content').append(fuga);
  } else {
    $.getJSON( '/api/job.json', (list) => {
      view.mount($('.content'), AccordionsView, { list })
      $('.accordion__title').on(`click`, (e) => {
        const $this = $(e.currentTarget)
        const $slideContent = $this.next()
        $slideContent.slideToggle()
      })
    })
  }
}

function load2(ctx, next){
  $.getJSON( '/api/job.json', (list) => {
    const $target = $('.accordions')
    const checkList = $target.data('values')
    let filter = []
    Object.keys(checkList).forEach((key) => {
      filter.push(...checkList[key])
    })
    console.log(filter)
    fuga = $target.detach()
    $('.content').append(jade.render(checkComponent.template, {list, filter}));
  } )
}


