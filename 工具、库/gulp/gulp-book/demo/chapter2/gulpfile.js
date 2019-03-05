// 获取 gulp
var gulp = require('gulp')

var uglify = require('gulp-uglify')
var minifyCSS = require('gulp-minify-css')

gulp.task('script', function() {
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
})

gulp.task('css', function () {
    gulp.src('css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'))
})

gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(uglify())
        .pipe(gulp.dest('dist/html'))
})

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改
    gulp.watch('js/*.js', ['script'])
    gulp.watch('css/*.css', ['css'])
    gulp.watch('*.html', ['html'])
})


gulp.task('default', ['html', 'script', 'css', 'auto'])