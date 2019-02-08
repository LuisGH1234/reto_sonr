# ![Linio](/readme-sources/logo.png)

E-commerce el cual cuenta con cuatro categorias de productos como Linea Blanca, Ropa, Juguetes y Computo. Ademas, tiene un apartado administrativo para listar, agregar, editar y eliminar productos. 

## Caracteristicas

El proyecto esta desarrollador en Node.js con el gestor de paquetes de dependecia `npm`. Utiliza el micro-framework Express.js para el lado del servidor. Por otra parte, en el lado del front-end utiliza React con Typescript y Webpack para transpilar el codigo a javascript del mas bajo nivel para que, en la medida de lo posible, cualquier navegador pueda interpretarlo. Ademas, se utilizo SASS como preprocesador de css para una mejor codificacion en la construccion de estilos de la pagina.

## Instalacion de dependencias

Instalara tanto las dependencias de desarrollo como de despliegue.
```bash
npm install
```

### Dependencias de Produccion

- [mysql](https://github.com/mysqljs/mysql#readme)
- [express](https://github.com/expressjs/express)
- [express-myconnection](https://github.com/pwalczyszyn/express-myconnection)
- [dotenv](https://github.com/motdotla/dotenv)
- [morgan](https://github.com/expressjs/morgan)
- [colors](https://github.com/Marak/colors.js)

### Dependencias de Desarrollo

- [webpack](https://github.com/webpack/webpack)
- [webpack-cli](https://github.com/webpack/webpack-cli)
- [react](https://github.com/facebook/react)
- [react-dom](https://github.com/facebook/react/tree/master/packages/react-dom)
- [react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)
- [reactjs-popup](https://github.com/yjose/reactjs-popup)
- [sass](https://github.com/sass/dart-sass)
- [nodemon](https://github.com/remy/nodemon)
- [typescript](https://link)
- [awesome-typescript-loader](https://link)
- [source-map-loader](https://link)
- @types/
    1. [react](https://www.npmjs.com/package/@types/react)
    2. [react-dom](https://www.npmjs.com/package/@types/react-dom)
    3. [react-router-dom](https://www.npmjs.com/package/@types/react-router-dom)

## Comandos de Despliegue

Por defecto se despliega en `127.0.0.1:3000` si no se especifica el puerto como variable de entorno (Por ejemplo, `PORT=6666`).

Para desplegar en modo produccion.
```bash
npm start
```
Para desplegar en modo desarrollo (se quedara escuchando a cambios).
```bash
npm run start:dev
```

## Comando Front-end

Un solo comando para hacer un build de todo el front-end para produccion
```bash
npm run build:front
```

## Comandos de Front-end de Desarrollo

Los siguientes comandos se quedaran escuchando por cambios.

Para ejecutar el build de webpack en modo de desarrollo.
```bash
npm run webpack:dev
```

Para ejecutar el build de dart-sass en modo de desarrollo.
```bash
npm style:dev
```
## Comandos de Front-end de Produccion

Para ejecutar el build de webpack con estilo comprimido.
```bash
npm run webpack
```

Para ejecutar el build de dart-sass con estilo comprimido.
```bash
npm run style
```

## Despliegue

#### Configuracion del Proyecto

![Heroku](/readme-sources/heroku.png)

Para desplegar el proyecto en Heroku es necesario haber especificado en el archivo `package.json` el comando `"start": "node src/index.js"` (para este caso) y tener una cuenta.

> Si se desea eligir una opcion de paga, se debe crear un archivo `Procfile` en la raiz del proyecto detallando el comando y ruta del archivo main. Por ejemplo, `web: node index.js`.
En el apartado de `Resources` aparecera el Dyno y se selecciona el plan.

Luego de haber iniciado sesion este redireccionara a el Dashboard y en la esquina superior derecha se selecciona `New` y `Create new app`.

Una vez encontrado en el proyecto y en la seccion de `Deploy` espacificamos el `Deploy method`, en este caso, con [Github](https://github.com/) y vinculamos el proyecto. En el momento que se trate de desplagar utilizara el proyecto del repositorio remoto.

Finalmente, se selecciona la rama a desplegar y se da click a `Deploy Branch`. Este mostrara una pequeña "consola" que muestra el estado durante el proceso.

#### Configuracion Base de Datos

El manual para realizar la configuracion de base de datos se encuentra en este [link](https://upcedupe-my.sharepoint.com/:b:/g/personal/u201516808_upc_edu_pe/EWH-3wtd7ENNkuX-rEsl2ZEB9osBEHNL_Xv6G7ysIhMhDQ?e=5tnsKS)
