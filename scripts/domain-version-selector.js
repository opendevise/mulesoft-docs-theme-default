(function () {
  'use strict'

  const $component = document.querySelector('.domain-version-selector')

  document.querySelector('.domain-version-selector-toggle').addEventListener('click', () => {
    if ($component.dataset.state === 'expanded') {
      delete $component.dataset.state
    }
    else {
      $component.dataset.state = 'expanded'
    }
  })

  $component.addEventListener('click', (e) => e.stopPropagation())
  window.addEventListener('click', () => { delete $component.dataset.state })
})()
