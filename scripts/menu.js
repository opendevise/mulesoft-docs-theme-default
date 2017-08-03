!(function () {
  'use strict'

  const $innerNav = document.querySelector('.inner-nav')
  $innerNav.addEventListener('scroll', () => saveExpandedState())

  restoreExpandedSate()

  qsa('.nav-tgl').forEach((btn) => {
    const li = btn.parentElement
    btn.addEventListener('click', () => {
      const collapsed = (li.dataset.state === 'collapsed' || li.dataset.state == null)
      li.dataset.state = collapsed ? 'expanded' : 'collapsed'
      saveExpandedState()
    })
  })

  function restoreExpandedSate() {
    const state = JSON.parse(sessionStorage.getItem('expanded-links') || '{}')
    const expandedLinks = state.expandedLinks || []
    qsa('.inner-nav .nav-lnk')
      .filter((link) => expandedLinks.includes(link.href))
      .forEach((link) => link.parentElement.dataset.state = 'expanded')
    $innerNav.scrollTop = state.innerNavScrollTop
  }

  function saveExpandedState() {
    const expandedLinks = qsa('.inner-nav .nav-itm[data-state="expanded"] > .nav-lnk')
      .map((a) => a.href)
    sessionStorage.setItem('expanded-links', JSON.stringify({
      innerNavScrollTop: parseInt($innerNav.scrollTop),
      expandedLinks,
    }))
  }

  function qsa(selector) {
    return Array.from(document.querySelectorAll(selector))
  }
})()
