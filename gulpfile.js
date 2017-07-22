'use strict'

const path = require('path')
const gulp = require('gulp')

const config = require('./config')

const buildTheme = require('./tasks/build-theme')
const buildPreview = require('./tasks/build-preview')
const buildRelease = require('./tasks/build-release')
const preview = require('./tasks/preview')
const release = require('./tasks/release')
const update = require('./tasks/update')

try {
  config.validate({ allowed: 'strict' })
}
catch (error) {
  error.message.split('\n').forEach((message) => { console.error('Bad config -', message) })
  // 9 - Invalid Argument; see https://nodejs.org/api/process.html#process_exit_codes
  process.exit(9)
}

const src = config.get('source')
const dest = config.get('destination')
const destTheme = path.join(dest, config.get('theme_destination'))

gulp.task('build-theme', () =>
  buildTheme(src, destTheme)
)

gulp.task('build-preview', ['build-theme'], () =>
  buildPreview(src, dest, destTheme)
)

gulp.task('preview', ['build-preview'], () =>
  preview({ dest, port: config.get('port') }, () => gulp.start('build-preview'))
)

gulp.task('build-release', ['build-theme'], () =>
  buildRelease({ repo: config.get('repository.name'), dest, destTheme })
)

gulp.task('release', ['build-release'], () =>
  release({
    owner: config.get('repository.owner'),
    repo: config.get('repository.name'),
    token: config.get('github_token'),
    dest
  })
)

gulp.task('update', () =>
  update()
)
