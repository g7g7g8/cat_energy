const { task }    = require("gulp");
const gulp        = require("gulp");
const browserSync = require("browser-sync").create();
const sass        = require("gulp-sass")(require("sass"));

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "dist",
    }
  });
});

gulp.task("sass", function() {
  return gulp
      .src("./src/scss/**/*.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest("dist"))
      .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  gulp.watch("./src/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("dist/*.html").on("change", browserSync.reload);
});

gulp.task("default", gulp.series(gulp.parallel("watch", "browser-sync")));