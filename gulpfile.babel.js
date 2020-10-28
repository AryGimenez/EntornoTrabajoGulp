

import gulp from 'gulp';

// Impide que el codigo caiga si hay un error en la sintaccis 
// pero me da un mensaje de error
import plumber from 'gulp-plumber';


// Variables Babel Para el codigo JavaScript de produccion
import babel from 'gulp-babel';
import terser from 'gulp-terser';
import concat from 'gulp-concat';

// Para html
import htmlmin from 'gulp-htmlmin';

// SASS
import sass from 'gulp-sass';

// Para Css
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';

// Purga el codigo css
import PurgarCss from 'gulp-purgecss';


// Limpiar ache navegador ?
import cacheBust from 'gulp-cache-bust';

// Optimisacion imagenes 
import imagemin from 'gulp-imagemin';


//brouwser sync 
 //  server - me permite crear un servidor de desarollo
 //  stream - me inyecta el css  
 //  reload - me recarga la pagina cuando cambiamos el html
import { init as server, stream, reload} from 'browser-sync'


const cssPlugins = [
    cssnano(),
    autoprefixer()
]






// Tarea para JavaScript
gulp.task('babel', ()=>{
    return gulp
    .src('./src/js/*.js') // Directorio de donde voy obtener los archivos
    // .papa para concatenar metodos que no pertenescan a gulp
    .pipe(plumber()) // Para impedir que el codigo caiga 
    .pipe(concat('Script-index.js')) // Cocatena todo el contenido de el sirectorio seleccionado en el archivo pasado por parametro
    .pipe(babel())
    .pipe(terser()) // esto sirve para ofuscar el codigo 
    .pipe(gulp.dest('./public/js')) // Destino donde guarda el contendo de el archivo
});

// Tarea para trabajar con SASS
gulp.task('sass', ()=>{
    return gulp
    .src('./src/scss/styles.scss')
    .pipe(plumber()) // impide que el codigo caiga
    .pipe(
        sass({
            outputStyle: 'compact'
        })
    )
    .pipe(stream()) // Es para inhectar el css en el codigo
    .pipe(gulp.dest('./public/scss'))

});

// Tarea para Purgar Css Es decir que busca las classes que no se utilisan
// y las borra de el css de produccion  -> npm install --save-dev gulp-purgecss 
// (Esto creo me es util para Bustrpat)
gulp.task('purgCss', () => {
    return gulp
    .src ('./src/scss/styles.scss')
    .pipe(PurgarCss({
        content: ['./public/*.html'] // Analiza el html para ver las clases que no se utilizan  
    })) 
})


// Formatear imagenes para el navegador 
gulp.task('imagen', ()=>{
    console.log("Entro");
    return gulp.src('./src/images/*.*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 30, progressive: true}),
        imagemin.optipng({optimizationLevel: 1})
    ]))
    .pipe(gulp.dest('./public/images'));

})



// metodos para formatear css 
gulp.task('styles', ()=> {
   return gulp
   .src('./src/css/*.css')
   .pipe(plumber()) // impide que el codigo caiga
   .pipe(concat('sytle-min.css')) // Concatena el CSS en un solo archivo
   .pipe(postcss(cssPlugins)) // aca le pasamos lo Plugins
   .pipe(stream()) // Es para inyectar el css en el codigo 
   .pipe(gulp.dest('./public/css')) // Destino 
});


// Accion para mejorar el hml
gulp.task('html-min', ()=> {
    return gulp
    .src('./src/*.html')
    .pipe(plumber()) // impide que el codigo caiga
    .pipe(
        htmlmin({
            collapseWhitespace: true, // Colapsa todas las lineas en 1
            removeComments: true // Remuebe los comentarios
        })
    )
    .pipe(cacheBust({  // limpia el cache para no utilizar el archivo en cache 
        type: 'timestamp'
    }))
    .pipe(gulp.dest('./public'))
});

// defino un Vijilante que es un metodo que escucha por defecto 
gulp.task('default', () => {
    // levanta un servidor con los datos que se encuentran en public
    server({
        server: './public'
    })

    // on('change', reload) toma los cambios en el servidor a medida que se va ejecutando
    gulp.watch('./src/js/*.js', gulp.series('babel'))// Escucha si hay cambi en diriectorio Js
    gulp.watch('./src/*.html', gulp.series('html-min')).on('change', reload);
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass')).on('change', reload);
    gulp.watch('./src/css/*.css', gulp.series('styles')).on('change', reload);
});
