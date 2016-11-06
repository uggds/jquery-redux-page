import page from 'page'
import $ from 'jquery'
import jade from 'jade'
import View from './view'

import { AccordionsView } from './accordions'
import { Accordion } from './accordion'
import { CheckListsView } from './checkLists'
import { get } from './actions'
import store from './store'

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
    fuga = $target.detach()
    view.mount($('.content'), CheckListsView, { filter, list })
  } )
}

