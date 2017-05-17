var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jsSrc = './develop/wCalendar.js';
var jsDst = './min/';

// 压缩js文件
gulp.task('uglifyjs', function() {

	gulp
		.src(jsSrc)
		.pipe(uglify())
		.pipe(rename('wCalendar.min.js'))
		.pipe(gulp.dest(jsDst));
});

gulp.task('default', ['uglifyjs']);