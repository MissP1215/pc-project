var gulp 		= require('gulp');
var browserSync = require('browser-sync').create();
var reload		= browserSync.reload;
var sass 		= require('gulp-sass');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./src",
            index: "home.html",
            online: true
        },
        port: 1010
    });

var baseDir = [
		"src/*.html", 
		"src/**/*.css", 
		"src/**/*.js", 
		"src/**/*.html",
		"src/js/**/*.js"
    ]
    gulp.watch(baseDir).on('change', reload);
    gulp.watch('src/sass/*.scss', ['sass']);
});

gulp.task('sass', function () {
  return gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
});

gulp.task('default', ['browser-sync']);