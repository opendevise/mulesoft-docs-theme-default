(function () {
  'use strict'

  var navWrapper = document.querySelector('.navigation__wrapper'),
    navPanels = document.querySelector('.navigation-panels'),
    panelNames = find('[data-panel]', navPanels).map(function (panel) {
      return panel.dataset.panel
    }),
    currentDomain = navWrapper.dataset.domain,
    currentVersion = navWrapper.dataset.version,
    isSiteAspect = (navWrapper.dataset.isSiteAspect === 'true'),
    isHome = (navWrapper.dataset.isHome === 'true'),
    state = getState() || {}

  if (isSiteAspect || isHome) {
    state.panel = 'aspect'
  }
  else if (state.panel === 'explore') {
    state.scroll = 0
    state.panel = 'domain'
  }
  else {
    state.panel = 'domain'
  }
  selectPanel(state.panel)
  find('.navigation-toolbar [data-panel]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      selectPanel(btn.dataset.panel)
    })
  })

  function selectPanel(panelName) {
    if (panelNames.indexOf(panelName) < 0) {
      panelName = 'domain'
    }
    find('.navigation [data-panel]').forEach(function (element) {
      element.classList.toggle('navigation--currentPanel', element.dataset.panel === panelName)
    })
    if (panelName !== state.panel) {
      navPanels.scrollTop = 0
    }
    state.panel = panelName
    saveState()
  }

  // navigation toggle for mobile/tablet view
  document.querySelector('.navigation-open').addEventListener('click', openNavigation)
  document.querySelector('.navigation-close').addEventListener('click', closeNavigation)
  navWrapper.addEventListener('click', function (e) {
    e.stopPropagation()
  })
  window.addEventListener('click', closeNavigation)

  function openNavigation(e) {
    e.stopPropagation()
    document.body.setAttribute('data-overlay', 'navigation')
    navWrapper.dataset.state = 'open'
  }

  function closeNavigation() {
    document.body.removeAttribute('data-overlay')
    navWrapper.dataset.state = null
  }

  // navigation tree items
  find('.nav-tree').forEach(function (navTree) {
    var panel = navTree.parentElement.dataset.panel
    find('.nav-itm', navTree).forEach(function (item, idx) {
      item.setAttribute('data-id', [panel, item.dataset.depth, idx].join('-'))
    })
  })
  find('.nav-ctl').forEach(function (btn) {
    var li = btn.parentElement
    btn.addEventListener('click', function () {
      li.setAttribute('data-state', (li.dataset.state === 'collapsed' || !li.dataset.state) ? 'expanded' : 'collapsed')
      state.expandedItems = getExpandedItems()
      saveState()
    })
  })
  if (!state.expandedItems) {
    state.expandedItems = getExpandedItems()
    saveState()
  }
  if (state.domain !== currentDomain || state.version !== currentVersion) {
    state.expandedItems = state.expandedItems.filter(function (item) {
      // startsWith is ES6 :/
      return item.match(/^aspect-/)
    })
  }

  state.expandedItems.forEach(function (itemId) {
    var item = document.querySelector('.nav-itm[data-id="' + itemId + '"]')
    if (item) {
      item.setAttribute('data-state', 'expanded')
    }
  })
  saveState()

  function getExpandedItems() {
    return find('.nav-tree .nav-itm[data-state="expanded"]').map(function (item) {
      return item.dataset.id
    })
  }

  state.domain = currentDomain
  state.version = currentVersion
  saveState()

  // scroll position of the current panel
  var currentPageItem = document.querySelector('.nav-itm--currentPage .nav-lnk')
  scrollItemIntoView(state.scroll || 0, navPanels, currentPageItem)
  navPanels.addEventListener('scroll', function () {
    state.scroll = Math.round(navPanels.scrollTop)
    saveState()
  })

  // state management
  function getState(domain, version) {
    var data = sessionStorage.getItem('nav-state')
    if (data) {
      return JSON.parse(data)
    }
  }

  function saveState() {
    sessionStorage.setItem('nav-state', JSON.stringify(state))
  }

  // tries to get item as close to the top of the view as possible
  function scrollItemIntoView(scrollPosition, parent, el) {

    if (el == null) {
      return parent.scrollTop = scrollPosition
    }

    // safe space over or below current item
    var margin = 10

    const overTheTop = el.offsetTop - scrollPosition < 0
    const belowTheBottom = el.offsetTop - scrollPosition + el.offsetHeight > parent.offsetHeight

    if (overTheTop) {
      parent.scrollTop = el.offsetTop - margin
    }
    else if (belowTheBottom) {
      parent.scrollTop = el.offsetTop - (parent.offsetHeight - el.offsetHeight) + margin
    }
    else {
      parent.scrollTop = scrollPosition
    }
  }

  function find(selector, from) {
    from = from || document
    return [].slice.call(from.querySelectorAll(selector))
  }
})()
