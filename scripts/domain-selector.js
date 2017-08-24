(function () {
  'use strict'

  var component = document.querySelector('.domain-selector')

  document.querySelector('.domain-selector-toggle').addEventListener('click', function () {
    if (component.dataset.state === 'expanded') {
      document.body.removeAttribute('data-overlay')
      component.removeAttribute('data-state')
    }
    else {
      document.body.setAttribute('data-overlay', 'domain-selector')
      component.setAttribute('data-state', 'expanded')
    }
  })

  document.querySelector('.domain-selector-close').addEventListener('click', function () {
    document.body.removeAttribute('data-overlay')
    component.removeAttribute('data-state')
  })

  component.addEventListener('click', function (e) { e.stopPropagation() })
  window.addEventListener('click', function () { component.removeAttribute('data-state') })
})()
