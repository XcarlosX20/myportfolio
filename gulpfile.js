const { src, dest, watch } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
//src: fn para encontar el archivo a compilar
//dest: funcion para definir archivo destino a compilar
const sass = require("gulp-sass")(require("sass"));
function compileSASS() {
  return src("./src/scss/app.scss")
    .pipe(sass())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(dest("./dist/"));
}

function watching() {
  watch("./src/scss/**/*.scss", compileSASS);
  watch("./src/js/*.js", js);
}
function js() {
  return src("src/js/*.js").pipe(babel()).pipe(uglify()).pipe(dest("./dist/"));
}
function build() {
  return compileSASS(), js();
}
exports.compileSASS = compileSASS;
exports.js = js;
exports.watching = watching;
exports.build = build;
