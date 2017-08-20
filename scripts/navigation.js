(function () {
  'use strict'

  var innerNav = document.querySelector('.inner-nav'),
      currentDomain = innerNav.dataset.domain,
      currentVersion = innerNav.dataset.version

  innerNav.addEventListener('scroll', function () { saveExpandedState() })

  restoreExpandedState()

  qsa('.nav-ctl').forEach(function (btn) {
    var li = btn.parentElement
    btn.addEventListener('click', function () {
      li.setAttribute('data-state', (li.dataset.state === 'collapsed' || !li.dataset.state) ? 'expanded' : 'collapsed')
      saveExpandedState()
    })
  })

  function restoreExpandedState() {
    var state = JSON.parse(sessionStorage.getItem('nav-state') || '{}'),
        expandedLinks = state.expandedLinks || []

    if (state.currentDomain === currentDomain && state.currentVersion === currentVersion) {
      qsa('.inner-nav .nav-lnk')
        .filter(function (link) { return expandedLinks.indexOf(link.href) >= 0 })
        .forEach(function (link) { link.parentElement.setAttribute('data-state', 'expanded') })
      innerNav.scrollTop = state.currentScroll
    }
    else {
      var currentPageItem = document.querySelector('.nav-itm--currentPage')
      if (currentPageItem) scrollItemIntoView(currentPageItem, innerNav)
      saveExpandedState()
    }
  }

  function saveExpandedState() {
    var expandedLinks = qsa('.inner-nav .nav-itm[data-state="expanded"] > .nav-lnk').map(function (link) { return link.href })
    sessionStorage.setItem('nav-state', JSON.stringify({
      currentScroll: parseInt(innerNav.scrollTop),
      expandedLinks: expandedLinks,
      currentDomain: currentDomain,
      currentVersion: currentVersion
    }))
  }

  function qsa(selector) {
    return [].slice.call(document.querySelectorAll(selector))
  }

  // tries to get item as close to the top of the view as possible
  function scrollItemIntoView(el, parent) {
    var amountToScroll = el.offsetTop - parent.offsetTop
    if (amountToScroll > 0) {
      parent.scrollTop = amountToScroll
    }
  }
})()
