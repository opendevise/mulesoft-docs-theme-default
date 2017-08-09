'use strict'

const fs = require('fs')
const path = require('path')

const vfs = require('vinyl-fs')
const map = require('map-stream')
const merge = require('merge-stream')
const minimatch = require('minimatch')
const handlebars = require('handlebars')
const requireFromString = require('require-from-string')

module.exports = async (src, dest, destTheme) => {

  const relativeThemePath = path.relative(dest, destTheme)

  const [layoutsIndex] = await Promise.all([
    compileLayouts(src),
    registerPartials(src),
    registerHelpers(src),
  ])

  const mockModelPath = path.resolve(__dirname, '../preview-site/mock-model.json')
  const mockModelJson = fs.readFileSync(mockModelPath)
  const mockModel = JSON.parse(mockModelJson.toString())

  vfs.src(['preview-site/**/*.html'])
    .pipe(map((file, next) => {
      const previewSitePath = path.resolve('preview-site')
      const relativeToRoot = path.relative(file.path, previewSitePath)
      const compileLayout = layoutsIndex['default.hbs']
      mockModel['theme-path'] = path.join(relativeToRoot, relativeThemePath)
      mockModel['root-href'] = path.join(relativeToRoot, 'index.html')
      mockModel['contents'] = file.contents.toString()
      mockModel['navigation-link-prefix'] = relativeToRoot
      file.contents = new Buffer(compileLayout(mockModel))
      next(null, file)
    }))
    .pipe(vfs.dest(dest))
}

function registerPartials(src) {

  return new Promise((resolve, reject) => {

    vfs.src(['partials/*.hbs'], { base: src, cwd: src })
      .pipe(map((file, next) => {
        handlebars.registerPartial(file.stem, file.contents.toString())
        next(null, file)
      }))
      .on('error', reject)
      .on('end', resolve)
  })
}

function registerHelpers(src) {

  return new Promise((resolve, reject) => {

    vfs.src(['helpers/*.js'], { base: src, cwd: src })
      .pipe(map((file, next) => {
        const helperFunction = requireFromString(file.contents.toString())
        handlebars.registerHelper(file.stem, helperFunction)
        next(null, file)
      }))
      .on('error', reject)
      .on('end', resolve)
  })
}

function compileLayouts(src) {

  const layoutsIndex = {}
  return new Promise((resolve, reject) => {

    vfs.src('layouts/*.hbs', { base: src, cwd: src })
      .pipe(map((file, next) => {
        layoutsIndex[file.basename] = handlebars.compile(file.contents.toString())
        next(null, file)
      }))
      .on('error', reject)
      .on('end', () => resolve(layoutsIndex))
  })
}
