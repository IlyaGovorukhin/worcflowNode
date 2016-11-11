var gulp = require('gulp')
    , nodemon = require('gulp-nodemon')
    , babel = require('gulp-babel')
    , Cache = require('gulp-file-cache')

var cache = new Cache();

gulp.task('compile', function () {
    var foo = [
        'src/app.js',
        'src/users.js',
        'src/index.js',
        'src/main.js'
    ]
    foo.forEach(function(n){
        var stream = gulp.src(n)
            .pipe(cache.filter()) // remember files
            .pipe(babel()) // compile new ones
            .pipe(cache.cache()) // cache them
        switch (n){
    case foo[0]:
        stream.pipe(gulp.dest(''))
        return stream
        break;
    case foo[1]:
        stream.pipe(gulp.dest('routes'))
        return stream
        break;
    case foo[2]:
         stream.pipe(gulp.dest('routes'))
         return stream
         break;
    case foo[3]:
         stream.pipe(gulp.dest('public/javascripts'))
         return stream
         break;
    }
})

})

gulp.task('watch', ['compile'], function () {
    var stream = nodemon({
        script: 'bin/www' // run ES5 code
        , watch: ['src', 'routes'] // watch ES2015 code
        , tasks: ['compile'] // compile synchronously onChange
    })

    return stream
})