(function () {
  'use strict'

  const $toggle = document.querySelector('.page-version-selector-toggle')
  const $component = document.querySelector('.page-version-selector')

  $toggle.addEventListener('click', () => {
    $component.dataset.state = ($component.dataset.state === 'collapsed') ? 'expanded' : 'collapsed'
  })

  $component.addEventListener('click', (e) => e.stopPropagation())
  window.addEventListener('click', () => $component.dataset.state = 'collapsed')
})()
