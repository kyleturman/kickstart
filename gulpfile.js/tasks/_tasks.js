var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(cb){
  runSequence('styles', ['lint','webpack:once','images','modernizr', 'fonts'], cb);
});

gulp.task('default', function(cb){
  runSequence('clean', 'build', ['watch','connect','webpack:watch'], cb);
});
