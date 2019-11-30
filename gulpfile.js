const paths = {
    src_scss: 'src/sass/main*.scss',
    dest_css: 'dest/css',
    src_html: 'src/*.html',
    dest_html: 'dest',
    src_img: 'src/img/*',
    dest_img: 'dest/img'
}

const gulp = require('gulp');
const { series } = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const clean = require('gulp-clean');

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

//Exports
exports.copyHTML = copyHTML;
exports.optimizeImages = optimizeImages;
exports.compileSass = compileSass;
exports.deleteHTML = deleteHTML;
exports.watch = watch;