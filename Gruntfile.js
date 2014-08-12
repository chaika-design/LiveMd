module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    // stylus
    stylus: {
      app: {
        options: {
          compress: false
        },
        src : ['newtab/stylus/*.styl'],
        dest: 'newtab/css/style.css'
      }
    },
    // CSS min化
    cssmin: {
      app: {
        files: {
          'newtab/css/style.min.css': 'newtab/css/style.css'
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
            src: 'newtab/css/*.min.css',
            ext: '.min.css.gz'
          }
        ]
      }
    },

    watch: {
      // Stylus
      css: {
        // 監視ファイル
        files: ['newtab/stylus/*.styl', 'newtab/stylus/**/*.styl'],
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
