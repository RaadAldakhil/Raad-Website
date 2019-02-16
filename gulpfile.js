var gulp = require('gulp'),
    connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var wait = require('gulp-wait');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('webserver', function() {
    connect.server({
        livereload: true
      });
  });
   
gulp.task('default', ['webserver','watch']);

// gulp.task('scripts', function() {
//     return gulp.src('js/scripts.js')
//         .pipe(plumber(plumber({
//             errorHandler: function (err) {
//                 console.log(err);
//                 this.emit('end');
//             }
//         })))
//         .pipe(uglify({
//             output: {
//                 comments: '/^!/'
//             }
//         }))
//         .pipe(rename({extname: '.min.js'}))
//         .pipe(gulp.dest('js'));
// });
function scripts() {
    return gulp.src('js/scripts.js')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(uglify({
            output: {
                comments: '/^!/'
            }
        }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('js'));
}
// gulp.task('styles', function () {
//     return gulp.src('./scss/styles.scss')
//         .pipe(wait(250))
//         .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
//         .pipe(gulp.dest('./css'));
// });
function styles() {
    return gulp.src('./scss/styles.scss')
        .pipe(wait(250))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
}
gulp.task('watch', function() {
    gulp.watch('js/scripts.js', scripts);
    gulp.watch('scss/styles.scss', styles);
});
