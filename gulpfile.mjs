import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import obfuscator from 'gulp-javascript-obfuscator';
import imagemin from 'gulp-imagemin';
import * as dartSass from 'sass';

const sass = gulpSass(dartSass);

function comprimeImg() {
  return gulp.src('./source/images/*')
    .pipe(imagemin(
        { 
            verbose: true 
        }))
    .pipe(gulp.dest('./build/images'));
}

function comprimeJS(){
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscator({
        compact: true
    }))
    .pipe(gulp.dest('./build/scripts'))
}

function compilaSass(){
    return gulp.src('./source/styles/main.scss', { sourcemaps: true })
    .pipe(sass({
        outputStyle: "compressed"
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./build/styles', {sourcemaps: './maps'}))
}



export default function(){
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass))
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJS))
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimeImg))
}

