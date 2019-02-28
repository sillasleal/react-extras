const gulp = require('gulp');
const babel = require('gulp-babel');
const minify = require("gulp-babel-minify");
const strip = require('gulp-strip-comments');
const replace = require('gulp-replace');
const fs = require('fs-extra');
const orig = "./src";
const src = `${orig}/**/*.js`;
const index = "./index.js";
const dest = "./dist";



/**
 * Function that remove a directory
 * @param {type} path
 * @returns {undefined}
 */
const deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

/**
 * Builda o projeto a cada alteração
 * @returns {undefined}
 */
const watch = () => {
    gulp.watch(src, ["build"]);
};

/**
 * Build do projeto
 * @returns {undefined}
 */
const build = () => {
    console.log("Building");
    process.env.NODE_ENV = "production";
    /**/
    gulp
            .src(src)
            .pipe(babel({
                presets: ['env', 'react', 'es2015', 'es2016'],
                plugins: ["transform-class-properties",
                    "transform-object-rest-spread"]
            }))
            .pipe(gulp.dest(dest));
};

/**
 * Gera o index em dist
 * @returns {undefined}
 */
const genIndex = () => {
    console.log("Gerando o index!");
    /**/
    let imports = `/**\n${fs.readFileSync('./LICENSE')}**/\n\n`;
    const listFiles = (dir) => {
        fs.readdirSync(dir).forEach((file) => {
            let tmp = `${dir}/${file}`;
            if (fs.statSync(tmp).isDirectory()) {
                listFiles(tmp);
            } else {
                if (tmp.substr(tmp.lastIndexOf(".")) === ".js") {
                    let imp = file.replace(".js", "");
                    let exp = tmp.replace(".js", "").replace(orig, '.').
                            replace('./', '');
                    if (exp !== 'index') {
                        imports += `module.exports = require('./dist/${exp}');\n`;
                    }
                }
            }
        });
    };
    /**/
    if (fs.existsSync(index)) {
        fs.removeSync(dest);
        fs.removeSync(index);
    }
    listFiles(orig);
    fs.writeFileSync(index, `${imports}`);
    build();
};

/**
 * Função que limpa o projeto
 * @returns {undefined}
 */
const clean = function () {
    if (fs.existsSync(`${__dirname}/node_modules`)) {
        deleteFolderRecursive(`${__dirname}/node_modules`);
    }
    if (fs.existsSync(`${__dirname}/dist`)) {
        deleteFolderRecursive(`${__dirname}/dist`);
    }
};

/**/
//gulp.task('build', genIndex);
gulp.task('clean', clean);
gulp.task('build', build);
gulp.task('watch', watch);
