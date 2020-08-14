const gulp = require("gulp")
const uglify = require("gulp-uglify")
const imagemin = require("gulp-imagemin")
const svg2png = require("gulp-svg2png")
const svgmin = require("gulp-svgmin")
const concat = require("gulp-concat")
const clean = require("gulp-clean-dir")
const cssnano = require("gulp-cssnano")
const autoprefixer = require("gulp-autoprefixer")

gulp.task('clean', function () {
    return gulp.src('./build', {
            allowEmpty: true,
            read: false
        })
        .pipe(clean("./build"))
})

gulp.task("scripts", function () {
    gulp.src("./js/*.js")
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest("build"))
})

gulp.task("images", function () {

    gulp.src("./images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("build"))

})

gulp.task("svg", function () {

    gulp.src("./icons/*")
        .pipe(svgmin())
        .pipe(svg2png())
        .pipe(gulp.dest("build"))

})

gulp.task("css", function () {

    gulp.src("./css/*")
        .pipe(autoprefixer())
        .pipe(concat("all.css"))
        .pipe(cssnano())
        .pipe(gulp.dest("build"))

})

gulp.task(
    "default",
    gulp.series(
        "clean",
        gulp.parallel("scripts", "images", "svg", "css")
    )
)