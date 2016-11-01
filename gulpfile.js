const gulp = require('gulp')
const $ = require('gulp-load-plugins')()

const DEST = './dist'
const SRC = './src'
const DELIVER = './deliver'

const paths = {
  js:     [`${SRC}/**/*.js`, `!${SRC}/**/_*.js`],
  sass:   [`${SRC}/**/*.sass`, `!${SRC}/**/_sprite.sass`],
  jade:   [`${SRC}/**/*.jade`, `!${SRC}/**/*.template.jade`, `!${SRC}/**/_*.jade`],
  img:    [`${SRC}/**/*.{png,jpg,gif}`]
}

const buildJade = (customConfig) => {
  const config = Object.assign({
    'glob': paths.jade
  }, customConfig)

  return gulp.src(config.glob, {base: `${SRC}/jade`})
  .pipe($.data(() => {
    return config
  }))
  .pipe($.jade({
    pretty: true
  }))
}

gulp.task('jade', () => {
  return buildJade().pipe(gulp.dest(DEST))
})
