(function () {
  'use strict'

  var toggle = document.querySelector('.page-version-selector-toggle')
  if (!toggle) return

  var component = document.querySelector('.page-version-selector')

  toggle.addEventListener('click', function () {
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
