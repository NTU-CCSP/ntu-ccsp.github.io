module.exports = function(grunt) {
  var port = grunt.option('port') || 8000;
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    compass: {
      options: {
        config: 'config/compass.rb'
      },
      dev: {},
      build: {
        options: {
          outputStyle: 'compressed', // Overriding compass.rb
          noLineComments: true,
          basePath: 'build'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: port,
          base: '.'
        }
      },
      test: { // Test built pages
        options: {
          port: port,
          base: 'build',
          keepalive: true
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
    },
    // http://www.sitepoint.com/writing-awesome-build-script-grunt/
    //
    copy: {
      build: {
        src: ['**', '!build'],
        dest: 'build',
        expand: true
      }
    },
    clean: {
      build: {
        src: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', 'Use during development.', ['compass:dev', 'connect:server', 'watch']);
  grunt.registerTask('build', 'Build websites in build/ directory.', ['clean', 'copy', 'compass:build']);
  grunt.registerTask('test', 'Test built pages.', ['connect:test']);
};