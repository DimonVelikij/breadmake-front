var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglifyjs'),
    cssnano     = require('gulp-cssnano'),
    rename      = require('gulp-rename'),
    del         = require('del'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    cache       = require('gulp-cache'),
    autoprefixer= require('gulp-autoprefixer');

/*
собираем css из sass
 */
gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

/*
переименование и сжатие css файла
 */
gulp.task('css-libs', ['sass'], function () {
    return gulp.src('app/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'));
});

/*
собираем js в один файл и минифицируем его
 */
gulp.task('scripts', function () {
    return gulp.src([
            'app/libs/jquery/jquery-1.11.1.min.js',
            'app/libs/jquery.easing/js/jquery.easing.js',
            'app/libs/angular/angular.min.js',
            'app/libs/fancybox/dist/jquery.fancybox.min.js',
            'app/libs/html5shiv/es5-shim.min.js',
            'app/libs/html5shiv/html5shiv.min.js',
            'app/libs/html5shiv/html5shiv-printshiv.min.js',
            'app/libs/html5shiv/respond.min.js',
            'app/libs/owl-carousel/owl.carousel.min.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

/*
life reload
 */
gulp.task('browser-sync', function () {
    browserSync({
        server: {baseDir: 'app'},
        notify: false
    });
});

/*
сжатие изображений c кэшем
 */
gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            une: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

/*
ожидание изменений sass
['browser-sync', 'sass'] - то, что нужно выполнить
до запуста таска в первом параметре
 */
gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function () {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

/*
таска по умолчанию, запускается gulp
 */
gulp.task('default', ['watch']);

/*
очищаем директорию src
 */
gulp.task('clean', function () {
    return del.sync('dist');
});

/*
очистка кэша изображений, запускать отдельно
 */
gulp.task('clear', function () {
    return cache.clearAll();
});

/*
сборка файлов для прода
 */
gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function () {
    var buildCss = gulp.src([
            'app/css/main.css',
            'app/css/libs.min.css'
        ])
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});