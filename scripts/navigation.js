!(function () {
  'use strict'

  var navWrapper = document.querySelector('.navigation__wrapper')

  selectPanel('domain')
  find('.navigation-toolbar [data-panel]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      selectPanel(btn.dataset.panel)
    })
  })

  document.querySelector('.navigation-open').addEventListener('click', function () {
    document.body.setAttribute('data-overlay', 'navigation')
    navWrapper.dataset.state = 'open'
  })

  document.querySelector('.navigation-close').addEventListener('click', function () {
    document.body.removeAttribute('data-overlay')
    navWrapper.dataset.state = null
  })

  function selectPanel(panelName) {
    find('.navigation [data-panel]').forEach(function (element) {
      element.classList.toggle('navigation--currentPanel', element.dataset.panel === panelName)
    })
  }

  function find(selector) {
    return [].slice.call(navWrapper.querySelectorAll(selector))
  }
})()
