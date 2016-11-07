import page from 'page'
import $ from 'jquery'
import jade from 'jade'
import View from './view'

import { AccordionsView } from './accordions'
import { Accordion } from './accordion'
import { CheckListsView } from './checkLists'
import { setPage } from './actions'
import store from './store'

const view = new View()
view.setChildComponent('accordionComponent', Accordion)

page('/', load)
page('/page2', load2)
page()

function load(ctx, next){

  const page = store.getState().page
  if (page) {
    const $target = $('.checkLists')
    $target.remove()
    $('.content').append(page);
  } else {
    $.getJSON( '/api/job.json', (list) => {
      view.mount($('.content'), AccordionsView, { list })
    })
  }
}

function load2(ctx, next){
  $.getJSON( '/api/job.json', (list) => {
    const $target = $('.accordions')
    const checkList = store.getState().checkList
    let filter = []
    Object.keys(checkList).forEach((key) => {
      filter.push(...checkList[key])
    })
    store.dispatch(setPage({ page: $target.detach() }))
    view.mount($('.content'), CheckListsView, { filter, list })
  } )
}

