var gulp             = require('gulp');
var sass             = require('gulp-sass');
var htmlmin          = require('gulp-htmlmin');
var autoprefixer     = require('gulp-autoprefixer');
var imagemin         = require('gulp-imagemin');
var uglify           = require('gulp-uglify');
var concat           = require('gulp-concat');
var browserSync      = require('browser-sync').create();
var angularFilesort  = require('gulp-angular-filesort');
var inject           = require('gulp-inject');
var paths            = {
    'src':{
        'scripts': [
            './bower_components/angular/angular.min.js',
            './bower_components/angular-ui-router/release/angular-ui-router.js',
            './assets/js/*.js',
            './src/**/*.js'
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
            './src/*.html',
            './src/*.html',
            './src/**/*.html'
        ]
    },
    'dist':{
        'scripts':'./dist/js/',
        'styles': './dist/css/',
        'images': './dist/img/',
        'fonts': './dist/fonts/',
        "html": './dist/',
    },
}

var injectable = [
    paths.dist.scripts+'*js',
    paths.dist.styles+'*.css'
]

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
    // .pipe(uglify())
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
    gulp.watch(paths.src.scripts, ['scripts']); 
    gulp.watch(paths.src.styles,  ['sass']); 
    gulp.watch(paths.src.fonts,   ['fonts']); 
    gulp.watch(paths.src.images,  ['images']); 
    gulp.watch(paths.src.html,    ['inject']);
    
    gulp.watch(paths.dist.html).on('change', browserSync.reload);
})

//====================================
gulp.task('index', ['scripts', 'sass', 'html'], function () {
    gulp.src(paths.dist.html+'index.html')
        .pipe(inject(gulp.src(injectable, {read: false}), {relative: true}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('inject', ['html'], function () {
    gulp.src(paths.dist.html+'index.html')
        .pipe(inject(gulp.src(injectable, {read: false}), {relative: true}))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('default',[
        'watch',
        'index',
        'images',
        'fonts',
        'html',
        'browserSync'
    ],function(){
        return;
    }
)