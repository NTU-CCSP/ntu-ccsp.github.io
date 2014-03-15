!function exportedTasksDefinedBeginsHere
  gulp.task 'client' <[ client:html client:css client:js ]> !->
    return if config.env.is 'production'
    livereload.listen config.port.livereload

    gulp.watch 'client/views/**/*', <[ client:html ]>
    gulp.watch <[ client/templates/**/* client/javascripts/**/* lib/javascripts/**/* ]>, <[ client:js ]>
    gulp.watch 'client/stylesheets/**/*', <[ client:css ]>
/*
 * Implementation details
 */
require! {
  path
}
require! {
  gulp
  'gulp-jade'
  'gulp-exec'
  'gulp-uglify'
  'gulp-concat'
  'gulp-livereload'
}
require! {
  'tiny-lr'
  'connect-livereload'
}
require! {
  '../config'
}

const livereload = tiny-lr!
/*
 * client tasks
 */
gulp.task 'client:html' ->
  return gulp.src 'client/views/**/*.jade'
  .pipe gulp-jade pretty: !config.env.is 'production'
  .pipe gulp.dest 'tmp/public'
  .pipe gulp-livereload(livereload)

gulp.task 'client:css' ->
  return gulp.src 'client/stylesheets/application.scss'
  .pipe gulp-exec("compass compile --force --output-style #{ if config.env.is 'production' then 'compressed' else 'nested' }")
  .pipe gulp-livereload(livereload)

gulp.task 'client:js:common' ->
  stream = gulp.src <[
    bower_components/modernizr/modernizr.js
    bower_components/jquery/dist/jquery.js
    client/javascripts/vendor/jquery.sticky.js
    client/javascripts/vendor/scrollit.min.js
    bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.js
    bower_components/foundation/js/foundation.js
  ]>
  .pipe gulp-concat 'common.js'
  stream.=pipe gulp-uglify! if config.env.is 'production'
  return stream.pipe gulp.dest 'tmp/public'
  .pipe gulp-livereload(livereload)

gulp.task 'client:js' <[ client:js:common ]> ->
  stream =  gulp.src 'client/javascripts/*.js'
  stream.=pipe gulp-uglify! if config.env.is 'production'
  return stream.pipe gulp.dest 'tmp/public'
  .pipe gulp-livereload(livereload)
# define!
exportedTasksDefinedBeginsHere!
