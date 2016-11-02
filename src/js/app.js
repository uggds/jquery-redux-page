import page from 'page'
import $ from 'jquery'
import jade from 'jade'
import View from './view'

// const template = require('../../../jade/entry/tssmp/_list.jade')
// const template2 = require('../../../jade/entry/tssmp/_list2.jade')

const accordionsComponent = {
  template: `
.accordions
  each item in list
    .js-slide #{item.value} #{item.label}
    accordionComponent
`
}
const accordionComponent = {
  template: `
.accordion.js-slide__content
  .chu(class="chu--#{item.value}")
    each item2 in item.item
      .chu__item 
        input.chu__item__label(type="checkbox" value="1")
        | #{item2.label}
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


const view = new View
view.component('accordionComponent', accordionComponent)

$.getJSON( '/api/job.json', (json) => {
  view.mount('.content', accordionsComponent, { list: json })
} )


// スライドの制御
$(`.content`).on(`click`, `.js-slide`, (e) => {
  const $this = $(e.currentTarget)
  const $slideContent = $this.next()
  $this.find(`.js-slide__icon`).css(
    `transform`, $slideContent.is(`:visible`) ? `translate(0%, -50%) rotate(90deg)` : `translate(0%, -50%) rotate(-90deg)`)
  $slideContent.slideToggle()
})
