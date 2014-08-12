module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    // stylus
    stylus: {
      app: {
        options: {
          compress: false
        },
        src : ['plugin/newtab/stylus/*.styl'],
        dest: 'plugin/newtab/css/style.css'
      }
    },
    // CSS min化
    cssmin: {
      app: {
        files: {
          'plugin/newtab/css/style.min.css': 'plugin/newtab/css/style.css'
        }
      }
    },
    // CSS gzip化
    compress: {
      css: {
        options: {
          mode: 'gzip'
        },
        files: [
          {
            expand: true,
            src: 'plugin/newtab/css/*.min.css',
            ext: '.min.css.gz'
          }
        ]
      }
    },

    watch: {
      // Stylus
      css: {
        // 監視ファイル
        files: ['plugin/newtab/stylus/*.styl', 'plugin/newtab/stylus/**/*.styl'],
        // 実行タスク
        tasks: 'css',
        options: {
          nospawn: true
        }
      }
    }
  });

  // loadNpmTasksを変更
  for(var taskName in pkg.devDependencies) {
    if(taskName.substring(0, 6) == 'grunt-') {
      grunt.loadNpmTasks(taskName);
    }
  }

  grunt.registerTask('css', ['stylus:app', 'cssmin:app', 'compress:css']);
  grunt.registerTask('default', ['watch']);
};
