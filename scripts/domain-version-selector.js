(function () {
  'use strict'

  var $component = document.querySelector('.domain-version-selector')

  document.querySelector('.domain-version-selector-toggle').addEventListener('click', function () {
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
