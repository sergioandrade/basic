var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var paths = {
    'src':{
        'scripts': [
            './assets/src/js/*.js',
            './bower_components/vue/dist/vue.min.js'
        ],
        'styles': [
            './assets/src/scss/*.scss',
            './assets/src/scss/**/*.scss',
        ],
        'images': [
            './assets/src/img/*.+(png|jpg|jpeg|gif|svg)',
            './assets/src/img/**/*.+(png|jpg|jpeg|gif|svg)'
        ],
        'fonts': './assets/src/fonts/**/*',
        'html': [
            './*.html',
        ]
    },
    'dist':{
        'scripts':'./assets/dist/js/',
        'styles': './assets/dist/css/',
        'images': './assets/dist/img/',
        'fonts': './assets/dist/fonts/'
    }
}

//====================================
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
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
    .pipe(concat('main.min.js'))
    .pipe(uglify())
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
    gulp.watch(paths.src.html).on('change', browserSync.reload);
})

gulp.task('default',[
        'watch',
        'sass',
        'images',
        'scripts',
        'fonts',
        'browserSync'
    ],
    function(){
        return;
    }
)