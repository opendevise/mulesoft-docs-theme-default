(function () {
  'use strict'

  var component = document.querySelector('.domain-selector')

  document.querySelector('.domain-selector-toggle').addEventListener('click', function () {
    if (component.dataset.state === 'expanded') {
      component.removeAttribute('data-state')
    }
    else {
      component.setAttribute('data-state', 'expanded')
    }
  })

  component.addEventListener('click', function (e) { e.stopPropagation() })
  window.addEventListener('click', function () { component.removeAttribute('data-state') })
})()
