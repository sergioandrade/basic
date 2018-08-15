/**
 * Declarations
 */
var gulp = require("gulp");
var sass = require("gulp-sass");
var htmlmin = require("gulp-htmlmin");
var autoprefixer = require("gulp-autoprefixer");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var browserSync = require("browser-sync").create();
var inject = require("gulp-inject");
var gulpNgConfig = require("gulp-ng-config");
var environments = require("gulp-environments");
var jshint = require("gulp-jshint");
var stylish = require("jshint-stylish");
var clean = require("gulp-clean");
var development = environments.development;
var production = environments.production;

var paths = {
  src: {
    scripts: {
      vendors: [
        "./node_modules/jquery/dist/jquery.js",
        "./node_modules/angular/angular.js",
        "./node_modules/@uirouter/angularjs/release/angular-ui-router.js",
        "./assets/vendor/toastr/toastr.js",
        "./assets/vendor/bootstrap/js/bootstrap.js"
      ],
      app: "./src/**/*.js"
    },
    styles: [
      "./assets/scss/*.scss",
      "./assets/scss/**/*.scss",
      "./assets/vendor/toastr/toastr.scss",
      "./assets/vendor/tabler/css/dashboard.css",
      "./assets/vendor/tabler/css/tabler.css"
    ],
    images: [
      "./assets/img/*.+(png|jpg|jpeg|gif|svg)",
      "./assets/img/**/*.+(png|jpg|jpeg|gif|svg)"
    ],
    fonts: "./assets/fonts/**/*",
    html: ["./src/*.html", "./src/**/*.html"]
  },
  dist: {
    scripts: "./dist/js/",
    styles: "./dist/css/",
    images: "./dist/img/",
    fonts: "./dist/fonts/",
    html: "./dist/"
  },
  config: "./src/app/settings/config.json"
};
var injectable = [paths.dist.scripts + "*js", paths.dist.styles + "*.css"];

/**
 * Clean dist directory before start the tasks
 */
gulp.task("clean", function() {
  return gulp.src("./dist", { read: false }).pipe(clean());
});

/**
 * Create http-server with live reload for sass, html and js files
 */
gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    ghostMode: true,
    notify: {
      styles: {
        bottom: "10px",
        right: "10px",
        top: "auto",
        "border-radius": 0,
        "font-size": "12px",
        opacity: 0.5
      }
    }
  });
});

/**
 * Concat and minify vendors files
 */
gulp.task("vendors", function() {
  return (
    gulp
      .src(paths.src.scripts.vendors)
      //develompent
      .pipe(development(concat("vendors.js")))

      //production
      .pipe(production(uglify()))
      .pipe(production(concat("vendors.min.js")))

      //default
      .pipe(gulp.dest(paths.dist.scripts))
      .pipe(
        browserSync.reload({
          stream: true
        })
      )
  );
});

/**
 * Concat and minify scripts files
 */
gulp.task("scripts", ["lint", "vendors", "environments"], function() {
  return (
    gulp
      .src(paths.src.scripts.app)
      //develompent
      .pipe(development(concat("_main.js")))

      //production
      .pipe(production(uglify()))
      .pipe(production(concat("_main.min.js")))

      //default
      .pipe(gulp.dest(paths.dist.scripts))
      .pipe(
        browserSync.reload({
          stream: true
        })
      )
  );
});

/**
 * Compile SASS to css with autoprefixer
 */
gulp.task("sass", function() {
  return (
    gulp
      .src(paths.src.styles)
      //develompent
      .pipe(
        development(
          sass({
            style: "expanded",
            sourceComments: "normal"
          }).on("error", sass.logError)
        )
      )
      .pipe(development(concat("_main.css")))

      //production
      .pipe(
        production(
          sass({
            outputStyle: "compressed"
          })
        )
      )
      .pipe(production(concat("_main.min.css")))

      //default
      .pipe(
        autoprefixer({
          browsers: ["last 3 versions"],
          cascade: true
        })
      )
      .pipe(gulp.dest(paths.dist.styles))
      .pipe(
        browserSync.reload({
          stream: true
        })
      )
  );
});

/**
 * Minify html
 */
gulp.task("html", function() {
  return gulp
    .src(paths.src.html)
    .pipe(production(htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest(paths.dist.html));
});

/**
 * Transfering fonts from /src to /dist
 */
gulp.task("fonts", function() {
  return gulp.src(paths.src.fonts).pipe(gulp.dest(paths.dist.fonts));
});

/**
 * Transfering images from /src to /dist with minification
 */
gulp.task("images", function() {
  return gulp
    .src(paths.src.images)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.images));
});

/**
 * Starting inject js and css files to index.html after run each taks
 */
gulp.task("index", ["scripts", "sass", "html"], function() {
  return gulp
    .src(paths.dist.html + "index.html")
    .pipe(inject(gulp.src(injectable, { read: false }), { relative: true }))
    .pipe(gulp.dest("./dist"));
});

/**
 * Starting inject js and css files to index.html whitout run script, and sass tasks
 */
gulp.task("inject", ["html"], function() {
  return gulp
    .src(paths.dist.html + "index.html")
    .pipe(inject(gulp.src(injectable, { read: false }), { relative: true }))
    .pipe(gulp.dest("./dist"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

/**
 * Prevent code pattern validations in js files
 */
gulp.task("lint", function() {
  return gulp
    .src("./src/**/*.js")
    .pipe(jshint(".jshintrc"))
    .pipe(jshint.reporter("jshint-stylish"));
});

/**
 * Set environment according each situation
 */
gulp.task("environments", function() {
  return gulp
    .src(paths.config)
    .pipe(concat("app.config.js"))
    .pipe(
      production(
        gulpNgConfig("aprove.config", {
          wrap:
            '(function(){ \n "use strict"; \n return <%= module %> \n })();',
          environment: "env.production"
        })
      )
    )
    .pipe(
      development(
        gulpNgConfig("aprove.config", {
          wrap:
            '(function(){ \n "use strict"; \n return <%= module %> \n })();',
          environment: "env.development"
        })
      )
    )
    .pipe(gulp.dest("./src/app/"));
});

/**
 * Watching file modifications for trigger browser sync
 */
gulp.task("watch", function() {
  gulp.watch(paths.src.scripts.app, ["scripts"]);
  gulp.watch(paths.src.styles, ["sass"]);
  gulp.watch(paths.src.fonts, ["fonts"]);
  gulp.watch(paths.src.images, ["images"]);
  gulp.watch(paths.src.html, ["inject"]);

  gulp.watch(paths.dist.html).on("change", browserSync.reload);
});

/**
 * Default task for development
 */
gulp.task(
  "default",
  ["watch", "index", "images", "fonts", "html", "environments", "browserSync"],
  function() {
    return;
  }
);

/**
 * Build a app for production
 */
gulp.task("build", ["index", "images", "fonts", "html"], function() {
  return;
});

/**
 * Testing a app for production
 */
gulp.task(
  "testing",
  ["index", "images", "fonts", "html", "environments", "browserSync"],
  function() {
    return;
  }
);
