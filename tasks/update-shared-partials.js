'use strict'

const vfs = require('vinyl-fs')
const merge = require('merge-stream')
const download = require('gulp-download-stream')
const buffer = require('vinyl-buffer')
const replace = require('gulp-replace')

module.exports = () => {

  return merge([

    download({
      url: 'https://developer.mulesoft.com/markup/get/header?searchbox=false',
      file: 'header-shared.hbs',
    })
      // NOTE pipe to buffer to ensure whole stream is read
      .pipe(buffer())
      .pipe(replace(/^[\s\S]*(<header[^>]*>[\s\S]*?<\/header>)[\s\S]*$/, '$1'))
      .pipe(replace(/<a href=".+?" title="Home"/, '<a href="https://docs.mulesoft.com" title="Home"'))
      .pipe(replace(/<img src="[^"]+"/, '<img src="{{theme-path}}/images/mulesoft-dev-logo.svg"'))
      .pipe(replace(' id="block-menu-menu-footer-menu"', ' id="block-system-main-menu"'))
      .pipe(replace('<a href="#sidr" id="open-left" class="closed">\n</a>\n', '')),

    download({
      url: 'https://developer.mulesoft.com/markup/get/footer',
      file: 'footer-shared.hbs',
    })
      // NOTE pipe to buffer to ensure whole stream is read in
      .pipe(buffer())
      .pipe(replace(/^[\s\S]*(<footer[^>]*>[\s\S]*?<\/footer>)[\s\S]*$/, '$1'))
      .pipe(replace(/<script[^>]*>[\s\S]*?<\/script>/g, ''))
      .pipe(replace(/ title=""/g, '')),
  ])
    .pipe(vfs.dest('partials'))
}
