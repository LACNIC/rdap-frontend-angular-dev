# Proyecto cliente web Angular para RDAP

#### Bajar codigo y ejecutar:
>npm install

*Instala las dependencias necesarias para correr la app*

#### Agregar dentro del archivo *.git/info/exclude* las siguientes lineas:
  - node_modules/
  - dist/


#### Para probar el código localmente ejecutar:
>npm run start

*Arma la app y la sirve localmente para pruebas*

## Subir a producción:
1. Ejecutar
>npm run build-prod

*Empaqueta la app para subir a producción. Crea una carpeta "dist" con los archivos resultantes.*

2. Subir al Repo de producción:
    - De la carpeta "dist" subir solamente: app.js, polyfills.js, vendor.js, /assets.
    - De la carpeta "src" subir solamente:  /css, /fonts, /i18n, /img, /js


**NOTA!**
- No subir index.html generado en carpeta "dist"!
- No borrar 404.html del reposoitorio
