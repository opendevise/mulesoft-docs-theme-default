!(function () {
  'use strict'

  const $navWrapper = document.querySelector('.navigation-wrapper')
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

  document.querySelector('.navigation-open').addEventListener('click', () => {
    $navWrapper.dataset.state = 'open'
  })

  document.querySelector('.navigation-close').addEventListener('click', () => {
    $navWrapper.dataset.state = null
  })

  function restoreExpandedSate() {
    const state = JSON.parse(sessionStorage.getItem('nav-state') || '{}')
    const expandedLinks = state.expandedLinks || []

    if (currentDomain == state.currentDomain && currentVersion == state.currentVersion) {
      qsa('.inner-nav .nav-lnk')
        .filter((link) => expandedLinks.includes(link.href))
        .forEach((link) => link.parentElement.dataset.state = 'expanded')
      $innerNav.scrollTop = state.seedScroll
    }
    else {
      // reset
      const $currentPage = document.querySelector('.nav-itm--currentPage')
      if ($currentPage) {
        scrollIntoViewIfNeeded($currentPage, $innerNav)
      }
      saveExpandedState()
    }
  }

  function saveExpandedState() {
    const expandedLinks = qsa('.inner-nav .nav-itm[data-state="expanded"] > .nav-lnk')
      .map((a) => a.href)
    sessionStorage.setItem('nav-state', JSON.stringify({
      seedScroll: parseInt($innerNav.scrollTop),
      expandedLinks,
      currentDomain,
      currentVersion,
    }))
  }

  function qsa(selector) {
    return Array.from(document.querySelectorAll(selector))
  }

  // simplified version from this polyfill https://gist.github.com/hsablonniere/2581101
  function scrollIntoViewIfNeeded(element, parent) {
    const overTop = (element.offsetTop - parent.offsetTop) < parent.scrollTop
    const overBottom = (element.offsetTop - parent.offsetTop + element.clientHeight) > (parent.scrollTop + parent.clientHeight)
    if (overTop || overBottom) {
      element.scrollIntoView()
    }
  }
})()
