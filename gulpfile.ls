require! {
  fs
  gulp
  'gulp-exec'
  'gulp-uglify'
  'gulp-concat'
  'gulp-livereload'
  'tiny-lr'
  connect
  'connect-livereload'
}
/*
 * dev subtasks
 */
gulp.task 'dev:html' ->
  return gulp.src 'app/index.html'
    .pipe gulp.dest 'public'

gulp.task 'dev:css' ->
  return gulp.src 'app/scss/application.scss'
    .pipe gulp-exec('compass compile --force')
    .pipe gulp-livereload(livereload)

gulp.task 'dev:js' ->
  return gulp.src <[
      bower_components/modernizr/modernizr.js
      bower_components/jquery/dist/jquery.js
      bower_components/sticky/jquery.sticky.js
      app/js/scrollit.min.js
      bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.js
      bower_components/foundation/js/foundation.js
      app/js/app.js
    ]>
    .pipe gulp-concat 'application.js'
    .pipe gulp.dest 'public'
    .pipe gulp-livereload(livereload)
/*
 * public subtasks
 */
gulp.task 'public:css' ->
  return gulp.src 'app/scss/application.scss'
    .pipe gulp-exec('compass compile --output-style compressed --force')

gulp.task 'public:uglify' ->
  return gulp.src <[
      bower_components/modernizr/modernizr.js
      bower_components/sticky/jquery.sticky.js
      app/js/app.js
    ]>
    .pipe gulp-uglify!
    .pipe gulp.dest 'tmp'

gulp.task 'public:js' <[ public:uglify ]> ->
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
/*
 * for npm scripts
 */
const server = connect!
server.use connect-livereload!
server.use connect.static './public'

const livereload = tiny-lr!

gulp.task 'dev' <[ dev:html dev:js dev:css ]> !->
  server.listen 8000
  livereload.listen 35729

  gulp.watch 'app/*.html' <[ dev:html ]>
  gulp.watch 'app/js/*.js' <[ dev:js ]>
  gulp.watch 'app/scss/*.scss' <[ dev:css ]>

gulp.task 'public' <[ dev:html public:js public:css ]> !->
  server.listen 8000
