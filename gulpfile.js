const {src, dest, task, series, watch, parallel} = require('gulp');
const gulp = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const concat = require('gulp-concat');  
const sassGlob = require('gulp-sass-glob');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const gcmq = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const {SRC_PATH, DIST_PATH, STYLES_LIBS, JS_LIBS} = require('./gulp.config');
const gulpif = require('gulp-if');
sass.compiler = require('node-sass');

const env = process.env.NODE_ENV;




task('clean', () => {
  console.log(env);
  return src('dist/**/*', {read: false}).pipe(clean());
 
  });

task('copy:html', () => {
  return src('src/*.html')
  .pipe(dest('dist'))
  .pipe(reload({stream: true}));
});

task('copy:images', () => {
  return src('images/**/**')
  .pipe(dest('dist/images'))
  .pipe(reload({stream: true}));
})

task("copy:videos", () => {
  return src('videos/*')
  .pipe(dest('dist/videos'))
  .pipe(reload({stream: true}));
})

task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      open: true
  });
});

const styles = [
  "src/styles/layouts/normalize.css",
  "node_modules/bxslider/dist/jquery.bxslider.css",
  "src/styles/main.scss"
]


task('styles', () => {
  return src(styles)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env === "dev", 
    autoprefixer({ cascade: false})))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({stream: true}))
});

const JScripts = [
  'src/js-libs/*.js',
  "node_modules/bxslider/dist/jquery.bxslider.min.js",
  'src/js/*.js'
]

task('scripts', () => {
  return src(JScripts)
  .pipe(gulpif(env === 'dev', sourcemaps.init()))
  .pipe(concat('main.js', {newLine: ";"}))
  .pipe(gulpif(env === "prod", 
    babel({
    presets: ['@babel/env']})))
  .pipe(gulpif(env === 'prod', uglify()))
  .pipe(gulpif(env === 'dev', sourcemaps.write()))
  .pipe(dest('dist'))
  .pipe(reload({stream: true}))
})

task('watch', () => {
watch('./src/styles/**/*.scss', series('styles'));
watch('src/*.html', series('copy:html'));
watch('./src/js/*.js', series('scripts'));
})

task('default', series('clean', parallel('styles', 'copy:images', 'copy:videos', 'copy:html', 'scripts'), parallel('watch', 'server')));


task('build', series('clean', parallel('styles', 'copy:images', 'copy:videos', 'copy:html', 'scripts')));






