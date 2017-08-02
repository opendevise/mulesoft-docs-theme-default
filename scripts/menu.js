!(function () {
  'use strict'

  const $toggleButtons = Array.from(document.querySelectorAll('.nav-tgl'))

  $toggleButtons.forEach((btn) => {

    const li = btn.parentElement
    btn.addEventListener('click', () => {
      const collapsed = (li.dataset.state === 'collapsed' || li.dataset.state == null)
      li.dataset.state = collapsed ? 'expanded' : 'collapsed'
    })
  })
})()
