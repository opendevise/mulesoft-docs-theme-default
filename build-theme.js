'use strict'

const path = require('path')

const vfs = require('vinyl-fs')
const del = require('del')
const map = require('map-stream')
const merge = require('merge-stream')
const minimatch = require('minimatch')

const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const postcssImport = require('postcss-import')
const postcssUrl = require('postcss-url')
const cssnano = require('cssnano')

const postcssPlugins = [
  autoprefixer({ browsers: ['last 2 versions'] }),
  postcssImport(),
  postcssUrl({
    url: function (asset) {
      if (asset.pathname != null && minimatch(asset.pathname, './files/*.{svg,eot,woff,woff2}')) {
        const parsedPath = path.parse(asset.pathname)
        return path.join('..', 'fonts', parsedPath.base)
      }
    },
  }),
  cssnano(),
]

const srcOptions = { base: __dirname, cwd: __dirname }

del.sync('build')

merge([

  vfs.src('stylesheets/theme.css', srcOptions)
    .pipe(postcss(postcssPlugins)),

  vfs.src('node_modules/typeface-*/**/*.{svg,eot,woff,woff2}', srcOptions)
    .pipe(map((file, next) => {
      // move font files to fonts (without any subfolder)
      file.dirname = path.join(file.base, 'fonts')
      next(null, file)
    })),

  vfs.src('layouts/*.hbs', srcOptions),
  vfs.src('partials/*.hbs', srcOptions),
])
  .pipe(vfs.dest('build/_theme'))
