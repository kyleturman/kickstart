/* ---------------------------------------
    CONFIG
   --------------------------------------- */

var localConfig = require('./local.config.js');

// Project paths
var src     = './source/';
var vendor  = './source/vendor/';
var dist    = './public/';

var config = {
  styles: {
    source: src+'styles/main.scss',
    dest: dist+'assets/css/',
    autoprefixer: {
      browsers: ['> 5%', 'last 2 versions'],
      cascade: false
    }
  },

  jshint: {
    source: [
      src+'scripts/**/*.js',
      '!**/vendor/**'
    ]
  },

  images: {
    source: src+'images/**/*.{png,jpg}',
    dest: dist+'assets/img/'
  },

  fonts: {
    source: src+'fonts/**/*.{eot,svg,ttf,woff}',
    dest: dist+'assets/fonts/'
  },

  modernizr: {
    parameters: {
      options: ['setClasses','html5printshiv','fnBind']
    },
    source: dist+'assets/css/*.css',
    dest: dist+'assets/js'
  },

  server: {
    base: dist,
    port: 9000,
    host: '0.0.0.0'
  },

  clean: {
    all: [
      './.sass-cache',
      dist+'assets/js',
      dist+'assets/img',
      dist+'assets/css'
    ]
  },

  webpack: {
    source: './source/scripts/main.js',
    dest: './public/assets/js'
  },

  watch: {
    livereload: dist + '**/*.{js,html,php}',
    styles: src + 'styles/**/*.scss',
    styles_output: dist + '**/*.css',
    images: src + 'images/**/*.*',
  }
};

module.exports = Object.assign(config, localConfig);
