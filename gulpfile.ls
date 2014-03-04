require! {
  fs
  path
  temp
  gulp
  'gulp-jade'
  'gulp-exec'
  'gulp-uglify'
  'gulp-concat'
  'gulp-livereload'
  'tiny-lr'
  connect
  'connect-livereload'
}

gulp.task 'vendor' ->
  return gulp.src 'vendor/**/*'
  .pipe gulp.dest 'public'
/*
 * dev subtasks
 */
gulp.task 'dev:html' ->
  return gulp.src 'app/*.jade'
  .pipe gulp-jade pretty: true
  .pipe gulp.dest 'public'
  .pipe gulp-livereload(livereload)

gulp.task 'dev:css' ->
  return gulp.src 'app/scss/application.scss'
  .pipe gulp-exec('compass compile --force')
  .pipe gulp-livereload(livereload)

gulp.task 'dev:js:common' ->
  return gulp.src <[
    bower_components/modernizr/modernizr.js
    bower_components/jquery/dist/jquery.js
    app/js/jquery.sticky.js
    app/js/scrollit.min.js
    bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.js
    bower_components/foundation/js/foundation.js
  ]>
  .pipe gulp-concat 'common.js'
  .pipe gulp.dest 'public'
  .pipe gulp-livereload(livereload)

gulp.task 'dev:js:index' <[ dev:js:common ]> ->
  return gulp.src <[
    app/js/index.js
  ]>
  .pipe gulp.dest 'public'
  .pipe gulp-livereload(livereload)

gulp.task 'dev:js:syllabus' <[ dev:js:common ]> ->
  return gulp.src <[
    app/js/syllabus.js
  ]>
  .pipe gulp.dest 'public'
  .pipe gulp-livereload(livereload)

gulp.task 'dev:js' <[ dev:js:index dev:js:syllabus ]>
/*
 * public subtasks
 */
gulp.task 'public:html' ->
  return gulp.src 'app/*.jade'
  .pipe gulp-jade pretty: false
  .pipe gulp.dest 'public'
  .pipe gulp-livereload(livereload)

gulp.task 'public:css' ->
  return gulp.src 'app/scss/application.scss'
  .pipe gulp-exec('compass compile --output-style compressed --force')

gulp.task 'public:uglify' ->
  return gulp.src <[
    bower_components/modernizr/modernizr.js
    app/js/jquery.sticky.js
    app/js/index.js
    app/js/syllabus.js
  ]>
  .pipe gulp-uglify!
  .pipe gulp.dest 'tmp'

gulp.task 'public:js:common' <[ public:uglify ]> ->
  return gulp.src <[
    tmp/modernizr.js
    bower_components/jquery/dist/jquery.min.js
    tmp/jquery.sticky.js
    app/js/scrollit.min.js
    bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js
    bower_components/foundation/js/foundation.min.js
  ]>
  .pipe gulp-concat 'common.js'
  .pipe gulp.dest 'public'

gulp.task 'public:js:index' <[ public:js:common ]> ->
  return gulp.src <[
    tmp/index.js
  ]>
  .pipe gulp.dest 'public'

gulp.task 'public:js:syllabus' <[ public:js:common ]> ->
  return gulp.src <[
    tmp/syllabus.js
  ]>
  .pipe gulp.dest 'public'

gulp.task 'public:js' <[ public:js:index public:js:syllabus ]>
/*
 * for npm scripts
 */
const server = connect!
server.use connect-livereload!
server.use connect.static './public'

const livereload = tiny-lr!

gulp.task 'dev' <[ vendor dev:html dev:js dev:css ]> !->
  server.listen 8000
  livereload.listen 35729

  gulp.watch 'app/*.jade' <[ dev:html ]>
  gulp.watch 'app/js/*.js' <[ dev:js ]>
  gulp.watch 'app/scss/*.scss' <[ dev:css ]>

const buildPublicSubtasks = <[ vendor public:html public:js public:css ]>

gulp.task 'public' buildPublicSubtasks, !->
  server.listen 8000

gulp.task 'release' buildPublicSubtasks, !(cb) ->
  (err, dirpath) <-! temp.mkdir 'ntu-ccsp.github.io'
  return cb err if err
  gulp.src 'package.json'
  .pipe gulp-exec "cp -r public/* #{ dirpath }"
  .pipe gulp-exec 'git checkout master'
  .pipe gulp-exec 'git clean -f -d'
  .pipe gulp-exec 'git rm -rf .'
  .pipe gulp-exec "cp -r #{ path.join dirpath, '*' } ."
  .pipe gulp-exec "rm -rf #{ dirpath }"
  .pipe gulp-exec 'git add -A'
  .pipe gulp-exec "git commit -m 'chore(release): by gulpfile'"
  .pipe gulp-exec "git push --all"
  .pipe gulp-exec "git checkout dev"
  .pipe gulp-exec "npm install"
  .on 'end' cb
