(function () {
  'use strict'

  const $toggle = document.querySelector('.page-version-selector-toggle')
  if ($toggle == null) {
    return
  }

  const $component = document.querySelector('.page-version-selector')

  $toggle.addEventListener('click', () => {
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
