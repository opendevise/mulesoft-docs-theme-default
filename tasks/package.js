'use strict'

const vfs = require('vinyl-fs')
const zip = require('gulp-vinyl-zip')

module.exports = async ({ repo, dest, destTheme }) => {

  const releasePackageName = `${repo}-latest.zip`

  return new Promise((resolve, reject) => {

    vfs
      .src('**/*', { base: destTheme, cwd: destTheme })
      .pipe(zip.zip(releasePackageName))
      .pipe(vfs.dest(dest))
      .on('error', reject)
      .on('end', resolve)
  })
}
