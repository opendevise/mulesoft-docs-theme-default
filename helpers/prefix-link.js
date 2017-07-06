'use strict'

module.exports = function (prefix, href) {

  if (href == null) {
    return ''
  }

  // if link is absolute /foo, http://, https://
  if (href.match(/^(\/|https?:\/\/)/)) {
    return href
  }
  else {
    return prefix + '/' + href
  }
}
