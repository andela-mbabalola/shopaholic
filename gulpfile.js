var gulp = require('gulp'),
  minifyCss = require('gulp-minify-css'),
  nodemon = require('gulp-nodemon'),
  gutil = require('gulp-util'),
  bower = require('gulp-bower'),
  sass = require('gulp-sass'),
  jade = require('gulp-jade'),
  jshint = require('gulp-jshint'),
  mocha = require('gulp-mocha'),
  Server = require('karma').Server,
  imagemin = require('gulp-imagemin'),
  notify = require('gulp-notify'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),

  path = {
    public: 'public/',
    app: {
      scripts: 'app/**/*.js',
      styles: 'app/sass/*.scss',
      jade: ['app/*.jade', '!app/shared/**', 'app/**/*.jade'],
      images: 'app/img/*.*',
      staticFiles: [
        '!app/**/*.+(scss|css|js|jade)',
        '!app/images/**/*',
        'app/**/*.*'
      ]
    },
    serverTests: ['./spec/server/**/*.spec.js']
  };

/**
 * [task to convert jade files to html]
 * @param  {[.jade]} 'jade' [files written in jade]
 * @return {[html]}        [files converted to html]
 */
gulp.task('jade', function() {
  return gulp.src(path.app.views)
    .pipe(jade())
    .pipe(gulp.dest('./public/'))
    .pipe(notify('Gulp-jade Done!'));
});

/**
 * [task to convert sass files to css]
 * @param  {[.scss]} 'sass' [files written in scss]
 * @return {[css]}        [files converted to css]
 */
gulp.task('sass', function() {
  return gulp.src(path.app.styles)
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(notify('Gulp-sass Done!'));
});


/**
 * [task to minify images]
 * @param  {[.jpg, .png]} 'images' [images]
 * @return {[.jpg, .png]}          [minified image]
 */
gulp.task('images', function() {
  return gulp.src(path.app.images)
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('./public/images'))
    .pipe(notify('Gulp-imagemin Done!'));
});

gulp.task('lint', function() {
  return gulp.src(['./app/**/*.js', './index.js',
      './server/**/*.js', './tests/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

/**
 * [task to minify css files]
 * @param  {[.css]} 'minCss' [files to be minified]
 * @return {[.css]}          [minified css file]
 */
gulp.task('minCss', function() {
  return gulp.src('public/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./public/css'))
    .pipe(notify('Gulp-minify-css Done!'));
});

/**
 * [task to enable bower components install dependencies]
 */
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('./public/lib/'));
});

/**
 * [task to start the api server]
 */
gulp.task('server', function() {
  nodemon({
      script: 'server.js',
      ext: 'js html',
      env: {
        'NODE_ENV': 'development'
      },
      ignore: ['public/**', 'client/**', 'node_modules/**']
    })
    .on('restart', ['jade', 'sass'], function() {
      console.log('Server restarted!');
    });
});

/**
 * [task to handle static files]
 */
gulp.task('static-files', function() {
  return gulp.src(path.app.staticFiles)
    .pipe(gulp.dest('public/'));
});

gulp.task('browserify', function() {
  return browserify('./app/js/application.js').bundle()
    .on('success', gutil.log.bind(gutil, 'Browserify Rebundled'))
    .on('error', gutil.log.bind(gutil, 'Browserify ' +
      'Error: in browserify gulp task'))
    // vinyl-source-stream makes the bundle compatible with gulp
    .pipe(source('application.js')) // Desired filename
    // Output the file
    .pipe(gulp.dest('./public/js/'))
    .pipe(notify('Browserify Done!'));
});

gulp.task('test:fend', ['build'], function(done) {
  // Be sure to return the stream
  return new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  },done()).start();
});

gulp.task('test:bend', ['test:fend'], function() {
  return gulp.src(path.serverTests)
    .pipe(mocha({
      reporter: 'spec'
    }))
    .once('error', function(err) {
      throw err;
    });
});

/**
 * [task to watch for changes]
 */
gulp.task('watchers', function() {
  // gulp.watch(path.app.js,['minify']);
  gulp.watch(path.app.sass, ['sass']);
  gulp.watch(path.app.jade, ['jade']);
  gulp.watch(path.app.js, ['browserify']);
});

gulp.task('build', ['jade', 'sass', 'static-files', 'images',
  'browserify', 'bower'
]);

gulp.task('dev', ['watchers']);
gulp.task('production', ['minifyJs', 'minifyCss']);
gulp.task('default', ['watchers', 'build']);
