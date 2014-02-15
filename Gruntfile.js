module.exports = function(grunt) {
  var port = grunt.option('port') || 8000;
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: port,
          base: '.'
        }
      }
    },
    watch: {
      grunt: { files: ['Gruntfile.js'] },
      options:{
        livereload:true
      },
      html:{
        files: ['index.html']
      },
      js: {
        files: ['js/**/*.js'],
      },
      css: {
        files: ['css/**/*.css']
      },
      sass: {
        options:{
          livereload: false
        },
        files: ['scss/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};