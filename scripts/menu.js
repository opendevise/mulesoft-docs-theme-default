!(function () {
  'use strict'

  const $innerNav = document.querySelector('.inner-nav')
  $innerNav.addEventListener('scroll', () => saveExpandedState())

  const currentDomain = $innerNav.dataset.domain
  const currentVersion = $innerNav.dataset.version

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

    if (currentDomain == state.currentDomain && currentVersion == state.currentVersion) {
      qsa('.inner-nav .nav-lnk')
        .filter((link) => expandedLinks.includes(link.href))
        .forEach((link) => link.parentElement.dataset.state = 'expanded')
      $innerNav.scrollTop = state.innerNavScrollTop
    }
    else {
      // reset
      saveExpandedState()
    }
  }

  function saveExpandedState() {
    const expandedLinks = qsa('.inner-nav .nav-itm[data-state="expanded"] > .nav-lnk')
      .map((a) => a.href)
    sessionStorage.setItem('expanded-links', JSON.stringify({
      innerNavScrollTop: parseInt($innerNav.scrollTop),
      expandedLinks,
      currentDomain,
      currentVersion,
    }))
  }

  function qsa(selector) {
    return Array.from(document.querySelectorAll(selector))
  }
})()
