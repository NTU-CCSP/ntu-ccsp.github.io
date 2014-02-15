module.exports = function(grunt) {
  var port = grunt.option('port') || 8000;
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    compass: {
      dist: {
        options: {
          config: 'config/compass.rb',
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
      compass: {
        options:{
          livereload: false
        },
        files: ['scss/**/*.scss','scss/**/*.sass'],
        tasks: ['compass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['compass']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};