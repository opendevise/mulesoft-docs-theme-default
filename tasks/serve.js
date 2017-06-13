'use strict'

const fs = require('fs')

const browserSync = require('browser-sync')
const chokidar = require('chokidar')
const debounce = require('lodash.debounce')

const watchedDirs = ['images', 'layouts', 'nav', 'partials', 'preview-site', 'scripts', 'stylesheets']

module.exports = (dest, buildCallback) => {

  browserSync({
    files: dest,
    ghostMode: false,
    notify: false,
    open: false,
    port: 8080,
    reloadDelay: 200,
    reloadDebounce: 200,
    ui: false,
    server: dest,
  })

  const build = debounce(buildCallback, 300)
  const watcher = chokidar.watch(watchedDirs, { ignoreInitial: true })
  watcher.on('all', () => build())
}
