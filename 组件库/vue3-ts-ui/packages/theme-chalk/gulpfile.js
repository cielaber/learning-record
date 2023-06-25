const { series, src, dest } = require('gulp')
const sass = require('gulp-dart-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')

// 处理css
function complie() {
    return src('./src/*.scss')
        .pipe(sass.sync())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(dest('./lib'))
}

// 拷贝字体样式文件
function copyFont() {
    return src('./src/fonts/**')
        .pipe(cssmin())
        .pipe(dest('./lib/fonts'))
}

exports.build = series(complie, copyFont)