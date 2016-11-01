import page from 'page'
import * as $ from 'jquery'

$('.view').on('click', (e) => { 
  page('/user/12')
  e.preventDefault()
})
