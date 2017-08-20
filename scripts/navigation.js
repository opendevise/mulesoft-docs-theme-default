(function () {
  'use strict'

  var $innerNav = document.querySelector('.inner-nav')
  $innerNav.addEventListener('scroll', function () { saveExpandedState() })

  var currentDomain = $innerNav.dataset.domain,
      currentVersion = $innerNav.dataset.version

  restoreExpandedState()

  qsa('.nav-ctl').forEach(function (btn) {
    var li = btn.parentElement
    btn.addEventListener('click', function () {
      li.dataset.state = (li.dataset.state === 'collapsed' || !li.dataset.state) ? 'expanded' : 'collapsed'
      saveExpandedState()
    })
  })

  function restoreExpandedState() {
    var state = JSON.parse(sessionStorage.getItem('nav-state') || '{}'),
        expandedLinks = state.expandedLinks || []

    if (state.currentDomain === currentDomain && state.currentVersion === currentVersion) {
      qsa('.inner-nav .nav-lnk')
        .filter(function (link) { return expandedLinks.indexOf(link.href) >= 0 })
        .forEach(function (link) { link.parentElement.dataset.state = 'expanded' })
      $innerNav.scrollTop = state.currentScroll
    }
    else {
      var $currentPage = document.querySelector('.nav-itm--currentPage')
      if ($currentPage) scrollItemIntoView($currentPage, $innerNav)
      saveExpandedState()
    }
  }

  function saveExpandedState() {
    var expandedLinks = qsa('.inner-nav .nav-itm[data-state="expanded"] > .nav-lnk').map(function (a) { return a.href })
    sessionStorage.setItem('nav-state', JSON.stringify({
      currentScroll: parseInt($innerNav.scrollTop),
      expandedLinks: expandedLinks,
      currentDomain: currentDomain,
      currentVersion: currentVersion
    }))
  }

  function qsa(selector) {
    return [].slice.call(document.querySelectorAll(selector))
  }

  // tries to get item as close to the top of the view as possible
  function scrollItemIntoView(element, parent) {
    var amountToScroll = element.offsetTop - parent.offsetTop
    if (amountToScroll > 0) {
      parent.scrollTop = amountToScroll
    }
  }
})()
