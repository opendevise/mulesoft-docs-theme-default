'use strict'

const $toggleButtons = Array.from(document.querySelectorAll('.navigation-toggle'))

$toggleButtons.forEach((btn) => {

  const li = btn.parentElement
  btn.addEventListener('click', () => {
    li.dataset.state = (li.dataset.state === 'collapsed') ? 'expanded' : 'collapsed'
  })
})
