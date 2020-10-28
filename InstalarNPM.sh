# - Instalaciones únicas
npm install --global gulp-cli
# -- Este comando lo teneis que ejecutar una sola vez. Sirve para instalar gulp de forma global en el equipo para tenerlo disponible en todos los proyectos

# Instalaciones que se han de ejecutar en cada proyecto en el que querais incluir gulp
npm init
npm install --save-dev gulp
npm install --save-dev @babel/core @babel/register @babel/preset-env

# -- El proyecto debe contener:
# -- Un archivo .babelrc donde pondremos la configuración de babel
# -- Dentro de el archivo creado copar el siguiente contenido optenido de La docuentacion https://babeljs.io/setup#installation
  
    # {
    #     "presets": ["@babel/preset-env"]
    # }

#  Un archivo gulpfile.babel.js donde pondremos la configuración de gulp (en el caso de usar babel 6 el archivo deberá llamarse gulpfile.js)

#-- Transpilar JavaScript
    # gulp-babel:
    # Este el módulo que usará gulp para convertir el código a es5
npm install --save-dev gulp-babel

    # rgulp-terser:
    # Es la nueva versión de uglify, sirve para ofuscar el código
    npm install --save-dev gulp-terser
    
    # gulp-concat:
    # Une todos nuestros archivos js en uno solo
    npm install --save-dev gulp-concat

# -- HTML
    npm install --save gulp-htmlmin
    # Minifica y limpia nuestro HTML
    # https://github.com/kangax/html-minifier

# -- CSS
    npm install --save-dev gulp-postcss cssnano autoprefixer
 
    # Da un error por lo que hay que borrar y reinstalar el postcss
    # Para que quede en la vercion 8
 
    npm uninstall postcss
    npm install postcss --save-dev


    # Para utilizar autoprefixer hay dos opciones, o añadir los navegadores a los que quieres dar soporte al package.json o hacerlo en un archivo separado.
    # .browserslistrc

    # postCSS: https://github.com/postcss/postcss/blob/master/docs/plugins.md

# -- PUG
     npm install --save-dev gulp-pug
    
# -- SASS
    npm install --save-dev gulp-sass

# -- purgar/limpiar CSS
    npm install --save-dev gulp-purgecss

# -- Limpiar caché navegador 
    npm install --save-dev gulp-cache-bust

# -- Comprimir imágenes
    npm install --save-dev gulp-imagemin

# -- Browser Sync Crea un servidro local 
    npm install --save-dev browser-sync

# -- Gulp Plumber evita que si el codigo tiene error caiga el servidor localgi
    npm install --save-dev gulp-plumber