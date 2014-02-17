require! {
  fs
  gulp
  'gulp-exec'
  'gulp-uglify'
  'gulp-rename'
  'gulp-concat'
  'gulp-livereload'
  'tiny-lr'
  connect
  'connect-livereload'
}

gulp.task 'gh-pages:html' ->
  return gulp.src 'app/index.html'
    .pipe gulp.dest 'public'

gulp.task 'gh-pages:css' ->
  return gulp.src 'app/scss/application.scss'
    .pipe gulp-exec('compass compile -c app/compass.rb')
    .pipe gulp-livereload(livereload)

gulp.task 'gh-pages:uglify' ->
  return gulp.src <[
      bower_components/modernizr/modernizr.js
      bower_components/sticky/jquery.sticky.js
      app/js/app.js
    ]>
    .pipe gulp-uglify!
    .pipe gulp.dest 'tmp'

gulp.task 'gh-pages:js' <[ gh-pages:uglify ]> ->
  return gulp.src <[
      tmp/modernizr.js
      bower_components/jquery/dist/jquery.min.js
      tmp/jquery.sticky.js
      app/js/scrollit.min.js
      bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js
      bower_components/foundation/js/foundation.min.js
      tmp/app.js
    ]>
    .pipe gulp-concat 'application.js'
    .pipe gulp.dest 'public'
    .pipe gulp-livereload(livereload)

const server = connect!
server.use connect-livereload!
server.use connect.static './public'

const livereload = tiny-lr!

gulp.task 'gh-pages' <[ gh-pages:html gh-pages:js gh-pages:css ]> !->
  server.listen 8000
  livereload.listen 35729

  gulp.watch 'app/*.html' <[ gh-pages:html ]>
  gulp.watch 'app/js/*.js' <[ gh-pages:js ]>
  gulp.watch 'app/scss/*.scss' <[ gh-pages:css ]>