module.exports = function(grunt) {
  'use strict';

  var LIVERELOAD_PORT = 35729;
  var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
  var mountFolder = function (connect, dir) {
    connect.static(require('path').resolve(dir));
  };

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    'clean': {
      src: 'dist'
    },

    'copy': {
      'index': {
        src: ['src/index.html'],
        dest: 'dist/'
      },

      'assets': {
        expand: true,
        src: ['assets/**/*'],
        dest: 'dist/',
        filter: 'isFile'
      },

      'vendors': {
        expand: true,
        src: ['vendors/**/*'],
        dest: 'dist/vendors',
        filter: 'isFile'
      }
    },

    'watch': {
      assets: {
        files: ['assets/**/*'],
        tasks: ['copy:assets']
      },
      js: {
        files: ['src/**/*.js'],
        tasks: ['browserify']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: ['dist/**/*']
      }
    },

    'connect': {
      options: {
        port: 9000,
        hostname: '0.0.0.0'
      },

      livereload: {
        options: {
          open: true,
          base: [
            'dist',
            'src'
          ]
        }
      },
    },

    'open': {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },

    'browserify': {
      dist: {
        options: {
          transform: [["babelify", { "stage": 0 }]]
        },
        files: {
          'dist/webmon.js': 'src/main.js'
        }
      }
    },

    'jscs': {
      src: "src/**/*.js",
      options: {
        config: ".jscsrc",
        esnext: true,
        verbose: true
      }
    }
  });

  grunt.registerTask('dist', function () {
    return grunt.task.run(['jscs', 'browserify', 'copy']);
  });

  grunt.registerTask('default', ['dist']);

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['dist', 'open', 'connect:dist:keepalive']);
    }
    grunt.task.run(['dist', 'connect:livereload', 'open', 'watch']);
  });
};
