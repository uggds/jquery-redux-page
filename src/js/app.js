import page from 'page'
import $ from 'jquery'
import jade from 'jade'

const template = require('jade!../jade/_list.jade')
const template2 = require('jade!../jade/_list2.jade')

$.getJSON( '/api/job.json', (json) => {
  $('.content').append(template({list: json}));
} )

page('/page2', function(){
  $.getJSON( '/api/job.json', (json) => {
    $('.dai').animate({
      marginLeft:'-340px',opacity:'0' }, 300 );
    $('.content').append(template2({list: json}));
  } )
});

$('.view').on('click', (e) => { 
  page('/page2')
  e.preventDefault()
})
