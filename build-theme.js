'use strict'

const vfs = require('vinyl-fs')
const del = require('del')

const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const postcssImport = require('postcss-import')
const cssnano = require('cssnano')

const postcssPlugins = [
  autoprefixer({ browsers: ['last 2 versions'] }),
  postcssImport(),
  cssnano(),
]

del.sync('build')

vfs.src('stylesheets/theme.css', { base: __dirname, cwd: __dirname })
  .pipe(postcss(postcssPlugins))
  .pipe(vfs.dest('build/_theme'))
