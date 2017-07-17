!(function () {
  'use strict'

  const $toggleButtons = Array.from(document.querySelectorAll('.nav-tgl'))

  $toggleButtons.forEach((btn) => {

    const li = btn.parentElement
    btn.addEventListener('click', () => {
      li.dataset.state = (li.dataset.state === 'collapsed') ? 'expanded' : 'collapsed'
    })
  })
})()
