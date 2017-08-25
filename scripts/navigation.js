!(function () {
  'use strict'

  var navWrapper = document.querySelector('.navigation__wrapper')

  document.querySelector('.navigation-open').addEventListener('click', function () {
    document.body.setAttribute('data-overlay', 'navigation')
    navWrapper.dataset.state = 'open'
  })

  document.querySelector('.navigation-close').addEventListener('click', function () {
    document.body.removeAttribute('data-overlay')
    navWrapper.dataset.state = null
  })
})()
