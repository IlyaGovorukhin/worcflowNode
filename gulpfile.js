
var gulp = require('gulp')
    , nodemon = require('gulp-nodemon')
    , babel = require('gulp-babel')
    , Cache = require('gulp-file-cache')

var cache = new Cache();

gulp.task('compile', function () {
    var stream = gulp.src('src/*.js') // your ES2015 code
        .pipe(cache.filter()) // remember files
        .pipe(babel()) // compile new ones
        .pipe(cache.cache()) // cache them
        .pipe(gulp.dest('public/javascripts')) // write them
    return stream // important for gulp-nodemon to wait for completion
})

gulp.task('watch', ['compile'], function () {
    var stream = nodemon({
        script: 'bin/www' // run ES5 code
        , watch: 'src' // watch ES2015 code
        , tasks: ['compile'] // compile synchronously onChange
    })

    return stream
})