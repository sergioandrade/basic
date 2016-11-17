var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var paths = {
    'src':{
        'scripts': [
            './assets/js/*.js',
        ],
        'styles': [
            './assets/scss/*.scss',
            './assets/scss/**/*.scss',
        ],
        'images': [
            './assets/img/*.+(png|jpg|jpeg|gif|svg)',
            './assets/img/**/*.+(png|jpg|jpeg|gif|svg)'
        ],
        'fonts': './assets/fonts/**/*',
        'html': [
            './*.html',
            './app/*.html',
            './app/**/*.html'
        ]
    },
    'dist':{
        'scripts':'./dist/js/',
        'styles': './dist/css/',
        'images': './dist/img/',
        'fonts': './dist/fonts/',
        "html": './dist/',
    }
}

//====================================
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        ghostMode: false,
        notify: {
            styles: {
                "bottom": "10px",
                "right": "10px",
                "top": "auto",
                "border-radius": 0,
                "font-size": "12px",
                "opacity": 0.5
            }
        }
    })
})

//====================================
gulp.task('scripts', function() {
    return gulp.src(paths.src.scripts)
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.dist.scripts))
    .pipe(browserSync.reload({
        stream: true
    }))
});

//====================================
gulp.task('sass', function(){
    return gulp.src(paths.src.styles)
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 3 versions'],
        cascade: true
    }))
    .pipe(gulp.dest(paths.dist.styles))
    .pipe(browserSync.reload({
        stream: true
    }))
})

//====================================
gulp.task('html', function() {
    return gulp.src(paths.src.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.dist.html))
});

//====================================
gulp.task('fonts', function() {
    return gulp.src(paths.src.fonts)
    .pipe(gulp.dest(paths.dist.fonts))
});

//====================================
gulp.task('images', function(){
    return gulp.src(paths.src.images)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.images))
});

//====================================
gulp.task('watch', function(){
    gulp.watch(paths.src.styles,  ['sass']); 
    gulp.watch(paths.src.images,  ['images']); 
    gulp.watch(paths.src.scripts, ['scripts']); 
    gulp.watch(paths.src.html,    ['html']).on('change', browserSync.reload);
})

gulp.task('default',[
        'watch',
        'sass',
        'images',
        'scripts',
        'fonts',
        'html',
        'browserSync'
    ],
    function(){
        return;
    }
)