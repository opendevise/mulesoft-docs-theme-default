'use strict'

module.exports = function (version) {

  if (version === 'master') {
    return ''
  }

  return `(${version})`
}
