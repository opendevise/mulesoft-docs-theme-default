(function () {

  'use strict'

  const $domainVersionSelector = document.querySelector('#domain-version-selector')
  $domainVersionSelector.addEventListener('change', () => {
    location.href = $domainVersionSelector.options[$domainVersionSelector.selectedIndex].value
  })
})()
