const paths = {
    src_scss: 'src/sass/main*.scss',
    dest_css: 'dest/css',
    src_html: 'src/*.html',
    dest_html: 'dest',
    src_img: 'src/img/*',
    dest_img: 'dest/img',
    main_css: "dest/css/main.css",
}

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

//copy all HTML files
function copyHTML() {
    return gulp.src(paths.src_html).pipe(gulp.dest(paths.dest_html));
}

//minimizing all the images.

function optimizeImages() {
    return gulp.src(paths.src_img).pipe(imagemin()).pipe(gulp.dest(paths.dest_img));;
}

//Compile main style sass to css

function compileSass() {
    return gulp.src(paths.src_scss).pipe(sass().on('error', sass.logError)).pipe(gulp.dest(paths.dest_css));
}


function deleteHTML() {
    return gulp.src(`${paths.dest_html}/*.html`).pipe(clean())
}

function watch() {
    gulp.watch(paths.src_scss, compileSass);
    //rerender dest html
    gulp.watch(paths.src_html, gulp.series(deleteHTML, copyHTML))
}

function prefixer() {
    return gulp.src(paths.main_css).pipe(autoprefixer({ cascade: false, overrideBrowserslist: ['last 2 versions'] })).pipe(gulp.dest(paths.dest_css))
}

function minimizeCSS() {
    return gulp.src(paths.main_css).pipe(cssmin()).pipe(rename({ suffix: ".min" })).pipe(gulp.dest(paths.dest_css));
}


//Exports


exports.copyHTML = copyHTML;
exports.optimizeImages = optimizeImages;
exports.compileSass = compileSass;
exports.deleteHTML = deleteHTML;
exports.watch = watch;
exports.prefixer = prefixer;
exports.minimizeCSS = minimizeCSS;