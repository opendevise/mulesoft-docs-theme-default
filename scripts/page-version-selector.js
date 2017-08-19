(function () {
  'use strict'

  var $toggle = document.querySelector('.page-version-selector-toggle')
  if (!$toggle) return

  var $component = document.querySelector('.page-version-selector')

  $toggle.addEventListener('click', function () {
    if ($component.dataset.state === 'expanded') {
      delete $component.dataset.state
    }
    else {
      $component.dataset.state = 'expanded'
    }
  })

  $component.addEventListener('click', function (e) { e.stopPropagation() })
  window.addEventListener('click', function () { delete $component.dataset.state })
})()
