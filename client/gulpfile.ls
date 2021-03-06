!function exportedTasksDefinedBeginsHere
  gulp.task 'client' <[ client:html client:css client:js ]> !->
    return if config.env.is 'production'

    gulp.watch <[ client/views/**/* ]>, <[ client:html ]>
    gulp.watch <[ client/templates/**/* client/javascripts/**/* lib/javascripts/**/* ]>, <[ client:js ]>
    gulp.watch <[ client/stylesheets/**/* ]>, <[ client:css ]>
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
  request
}
require! {
  '../config'
}

const ssurl = 'https://spreadsheets.google.com/feeds/list/0AoxVTWRslBcwdElBZUw1dDVlTnd0UmdwdWl5eG5JUXc/od6/public/values?alt=json'
const escapeTags = (str)->
  # http://stackoverflow.com/questions/5499078/fastest-method-to-escape-html-tags-as-html-entities
  str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')

/*
 * client tasks
 */
gulp.task 'client:html' !(cb) ->
  (err, data) <-! request ssurl, json: true
  stream = gulp.src 'client/views/**/*.jade'
  .pipe gulp-jade do
    pretty: !config.env.is 'production'
    locals: data.body.feed{entry} <<< {escapeTags: escapeTags}
  .pipe gulp.dest 'tmp/public'
  .on 'end' cb
  stream.=pipe gulp-livereload! unless config.env.is 'production'
  stream

gulp.task 'client:css' ->
  stream = gulp.src 'client/stylesheets/application.scss'
  .pipe gulp-exec("compass compile --force --output-style #{ if config.env.is 'production' then 'compressed' else 'nested' }")
  stream.=pipe gulp-livereload! unless config.env.is 'production'
  stream

gulp.task 'client:js:common' ->
  stream = gulp.src <[
    bower_components/modernizr/modernizr.js
    bower_components/jquery/dist/jquery.js
    client/javascripts/vendor/jquery.sticky.js
    client/javascripts/vendor/scrollit.min.js
    client/javascripts/vendor/touchSwipe.js
    bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.js
    bower_components/foundation/js/foundation.js
  ]>
  .pipe gulp-concat 'common.js'
  stream.=pipe gulp-uglify! if config.env.is 'production'
  stream.=pipe gulp.dest 'tmp/public'
  stream.=pipe gulp-livereload! unless config.env.is 'production'
  stream

gulp.task 'client:js' <[ client:js:common ]> ->
  stream =  gulp.src 'client/javascripts/*.js'
  stream.=pipe gulp-uglify! if config.env.is 'production'
  stream.=pipe gulp.dest 'tmp/public'
  stream.=pipe gulp-livereload! unless config.env.is 'production'
  stream
# define!
exportedTasksDefinedBeginsHere!
