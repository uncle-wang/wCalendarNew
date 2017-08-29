var gulp = require('gulp');
var less = require('gulp-less');
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var watch = require('gulp-watch');
var fs = require('fs');

// 文件路径
var lessSrc = './develop/style.less';
var htmlSrc = './develop/template.html';
var toolSrc = './develop/tool.js';
var mainSrc = './develop/wCalendar.js';
var mainDst = './min/';

// html压缩配置
var options = {

	removeComments: true,//清除HTML注释
	collapseWhitespace: true,//压缩HTML
	collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
	removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
	removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
	removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
	minifyJS: true,//压缩页面JS
	minifyCSS: true//压缩页面CSS
};

// 合成文件
var concatFiles = function(filename) {

	var content = '';
	var encode = 'utf8';

	// 读取wCalendar.js
	fs.readFile(mainDst + 'wCalendar.js', encode, function(err, calendarText) {

		if (err) throw err;

		// 读取tool.js
		fs.readFile(mainDst + 'tool.js', encode, function(err, toolText) {

			if (err) throw err;
			content = toolText + calendarText;

			// 读取template.html
			fs.readFile(mainDst + 'template.html', encode, function(err, templateText) {

				if (err) throw err;
				content = content.replace('HTMLPLACEHOLDER', templateText.replace(/\"/g, '\\"'));

				// 读取style.css
				fs.readFile(mainDst + 'style.css', encode, function(err, styleText) {

					if (err) throw err;
					content = content.replace('CSSPLACEHOLDER', styleText.replace(/\"/g, '\\"'));

					// 生成文件
					fs.writeFile(mainDst + 'wCalendar.min.js', content, encode, function(err) {
						if (err) throw err;
						console.log('wCalendar.min.js created');
					});
				});
			});
		});
	});
};

// 编译less
gulp.task('compileLess', function() {

	gulp
		.src(lessSrc)
		.pipe(less())
		.pipe(cleancss())
		.pipe(gulp.dest(mainDst))
		.on('end', function() {
			concatFiles();
		});
});

// 压缩template
gulp.task('uglifyTemplate', function() {

	gulp
		.src(htmlSrc)
		.pipe(htmlmin(options))
		.pipe(gulp.dest(mainDst))
		.on('end', function() {
			concatFiles();
		});
});

// 压缩tool
gulp.task('uglifyTool', function() {

	gulp
		.src(toolSrc)
		.pipe(uglify())
		.pipe(gulp.dest(mainDst))
		.on('end', function() {
			concatFiles();
		});

});

// 压缩wCalendar
gulp.task('uglifyCalendar', function() {

	gulp
		.src(mainSrc)
		.pipe(uglify())
		.pipe(gulp.dest(mainDst))
		.on('end', function() {
			concatFiles();
		});
});

// 监测文件修改
gulp.task('watch', function() {

	gulp.watch(lessSrc, ['compileLess']);
	gulp.watch(htmlSrc, ['uglifyTemplate']);
	gulp.watch(toolSrc, ['uglifyTool']);
	gulp.watch(mainSrc, ['uglifyCalendar']);
});

gulp.task('default', ['watch']);