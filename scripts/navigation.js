(function () {
  'use strict'

  var navTree = document.querySelector('.nav-tree'),
      currentDomain = navTree.dataset.domain,
      currentVersion = navTree.dataset.version

  navTree.addEventListener('scroll', function () { saveExpandedState() })

  restoreExpandedState()

  find(navTree, '.nav-ctl').forEach(function (btn) {
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
      find(navTree, '.nav-lnk')
        .filter(function (link) { return expandedLinks.indexOf(link.href) >= 0 })
        .forEach(function (link) { link.parentElement.setAttribute('data-state', 'expanded') })
      navTree.scrollTop = state.currentScroll
    }
    else {
      var currentPageItem = document.querySelector('.nav-itm--currentPage')
      if (currentPageItem) scrollItemIntoView(currentPageItem, navTree)
      saveExpandedState()
    }
  }

  function saveExpandedState() {
    var expandedLinks = find(navTree, '.nav-itm[data-state="expanded"] > .nav-lnk').map(function (link) { return link.href })
    sessionStorage.setItem('nav-state', JSON.stringify({
      currentScroll: parseInt(navTree.scrollTop),
      expandedLinks: expandedLinks,
      currentDomain: currentDomain,
      currentVersion: currentVersion
    }))
  }

  function find(from, selector) {
    return [].slice.call(from.querySelectorAll(selector))
  }

  // tries to get item as close to the top of the view as possible
  function scrollItemIntoView(el, parent) {
    var amountToScroll = el.offsetTop - parent.offsetTop
    if (amountToScroll > 0) {
      parent.scrollTop = amountToScroll
    }
  }
})()
