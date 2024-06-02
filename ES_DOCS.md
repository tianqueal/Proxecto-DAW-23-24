# Documentación parcial sobre la configuración del proyecto

> **Documentación en desarrollo***

## Índice
1. [Introducción](#introducción)
2. [Laravel](#laravel)
   - [¿Cómo está configurada la API?](#cómo-está-configurada-la-api)
   - [Acceso público](#acceso-público)
   - [Acceso autenticado](#acceso-autenticado)
   - [Rutas](#rutas)
   - [Controladores](#controladores)
   - [Migraciones y Seeders](#migraciones-y-seeders)
   - [Email](#email)
   - [Políticas](#políticas)
   - [Internacionalización](#internacionalización)
   - [Middlewares](#middlewares)
   - [Pruebas](#pruebas)
3. [Front-end](#front-end)
   - [ReactJS](#reactjs)
   - [React Router DOM](#react-router-dom)
   - [Editorjs](#editorjs)
   - [TailwindCSS](#tailwindcss)
4. [Cliente Discord](#cliente-discord)
   - [¿Qué funciones tiene el bot?](#qué-funciones-tiene-el-bot)

# Introducción

En este documento se intentará describir de manera muy resumida como se ha implementado cada tecnología en las funciones de la aplicación.

Adicionalmente, todos los comandos utilizados para crear el front-end como el back-end se encuentran en [Comandos](./ES_COMMANDS.md).

# Laravel

## ¿Cómo está configurada la API?

La API ha sido construida en Laravel, siguiendo la típica estructura Modelo-Controlador.
Para el servidor STMP, se ha usado Mailtrap, por lo que en un entorno de despliege, posiblemente no funcione correctamente.
Es importante recordar que los recursos y ficheros de Laravel se han creado mediante Artisan, siguiendo las convenciones de nomenclatura.

El acceso mediante otro cliente distinto al Front-end, necesita declarar el Header 'Accept' en 'application/json' para indicar a Laravel el formato correcto para acceder 
a los recursos.

Por ejemplo:

```bash
curl --location '{API_URL}/api/v1/' \
--header 'Accept: application/json' \
```

Las peticiones de controlan mediante Middlewares. Ejemplos son CORS, y i18n (Internacionalizacion).

Los ficheros de configuración ``config/*`` y ``.env`` son lugares importantes donde cambiar parámetros si se quiere cambiar el entorno de la API.
- ``conf/app.php``: Aquí se encuentran datos como la localización, zona horaria, fichero env por defecto, etc.
- ``config/default_roles.php``: Se encuentran los roles predeterminados de la aplicación.
- ``.env``: Nombre de la app, credenciales del SGBD, servidores SMTP, Redis, Vite plugin, etc.

### Acceso público

El Middleware que controla los accesos públicos se encuentra en la ruta ``app/Http/Middleware/PublicCors.php``
Se permite el acceso desde cualquier origen.

### Acceso autenticado

El Middleware que controla los accesos de autenticación se encuentra en la ruta ``app/Http/Middleware/Cors.php``
Solo se accede desde el origen especificado (CLIENT_URL) en el fichero .env

## Rutas

Las rutas están definidas en ``routes/api.php``
En ese fichero es posible agregar nuevos endpoints de la API para nuevas funcionalidades

Laravel no tiene una integración nativa con los filtros por parámetros, aunque existen diferentes librerías que facilitan su integración.
Para agregar nuevos filtros a la API, pueden incluirse en el directorio ``app/Filters``. Al no ser un estándar, se han seguido recomendaciones de la comunidad.

### Rutas de acceso público

| Método | URI | Descripción |
|---------|-----|-------------|
| ``GET`` | ``api/v1/public/communityNotes`` | Obtiene las notas públicas de forma descendente usando paginación |
| ``GET`` | ``api/v1/public/communityNotes/{noteId}`` | Obtiene el contenido completo de la nota pública |
| ``GET`` | ``api/v1/public/communityNotes?topicId[]={topicId}`` ``api/v1/communityNotes?topicId[]={topicId}&topicId[]={topicId}&...`` | Filtra las notas por temas (no excluyentes) |
| ``GET`` | ``api/v1/public/communityNotes?userId={userId}`` | Filtra las notas por autor |

### Rutas de autenticación

> Advertencia: Cors Middleware comentado (desabilitado) en el código fuente

Algunas de las rutas que requieren estar en el origen solicitado:

| Método | URI | Descripción |
|---------|-----|-------------|
| ``GET`` | ``api/v1/email/verify/{id}?{hash}`` | Ruta que permite verificar la cuenta de un usuario. La ruta se genera al momento de crear la cuenta y puede reenviarse manualmente mediante una  | 
| ``POST`` | ``api/v1/login`` | Permite iniciar sesión en la aplicación. Se devuelve el token de acceso e información del usuario identificado |
| ``POST`` | ``api/v1/register`` | Permite registrarse en la aplicación. Devuelve el token de acceso |
| ``GET`` | ``api/v1/email`` | Permite registrarse en la aplicación. Devuelve el token de acceso |

Ejemplo para autenticarse:

```bash
curl --location '{API_URL}/api/v1/login' \
--header 'Accept: application/json' \
--header 'Accept-Language: es' \
--header 'Content-Type: application/json' \
--data '{
    "email_or_username": "admin",
    "password": "Abcd12345$"
--header 'Cookie: XSRF- ... ' \
}'
```

## Controladores

Cada modelo está asociado por defecto a un controlador, y tener más de uno es normal dependiendo del tipo de proyecto. Además, las convenciones recomiendan encargar a un controlador a una funcionalidad en
concreto. Asi que si es posible separar lógica, mejor es hacerlo.

## Migraciones y Seeders

Siguiendo las convenciones de Laravel, todos los cambios sobre el SGBD deben generarse mediante migraciones ``database/migrations``. Esto permite almacenar los cambios y revertirlos con total control. 
Para este proyecto ya se tenía en mente la estructura de la base de datos, por lo que solo existe una migración registrada.

Además de las migraciones, para hacer mockups en desarrollo, se han usado Seeders y Factories, los cuales son clases que ayudan a generar datos ficticios sobre las tablas para pruebas. Estos se encuentran en ``database/factories``, ``database/seeders``.

## Email

Es uno de mis módulos favoritos de la API. La funcionalidad principal de implementar esto en el proyecto, es permitir a un usuario registrado en la plataforma verificar su cuenta para desbloquear nuevas funciones en la aplicación (en esta versión, publicar una nota en la comunidad).

Laravel intrega por defecto métodos que facilitan el envio de correos a través de plantillas Blade. Aunque naturalmente en el Framework, esta función es pensada para usarse en un monolito (todo sobre el mismo marco de trabajo), es posible adaptarlo a funcionalidades API.

En el desarrollo, se ha usado un SMTP de prueba (Mailtrap). Durante la fase de despliegue se cuenta con un hosting que permite el envío limitado de correos.

Ejemplo de lo que debería llegar mediante un correo temporal, idioma ES:

<img width="854" alt="Captura de pantalla 2024-05-20 a las 18 54 15" src="https://github.com/tianqueal/Proxecto-DAW-Borrador/assets/132884719/8ad11989-8d2f-4de0-b2b5-bba594cbbd93">

## Políticas

Cada acción sobre un recurso de controla mediante políticas. Por ejemplo, al momento de actualizar una nota, se comprueba que el usuario sea propietario del recurso y si es así, continúa con la operación.
Las políticas se definen en la ruta ``app/Policies``.

## Internacionalización

Tambien conocido como ***i18n***.
Los ficheros en la ruta ``resources/lang`` sirven para devolver respuestas i18n según el parámetro ``Accept-Language`` de una petición a la API.
Se ha seguido la normativa ISO 639-1 para los códigos de los idiomas.

Un ejemplo de uso de i18n sería el siguiente:

```bash
curl --location '{API_URL}/api/v1/public/test' \
--header 'Accept: application/json' \
--header 'Accept-Language: es' \
```

En este caso se está solicitando que los recursos sean devueltos en Español.

Por el momento, solo se han traducido 2 idiomas (en, es). Para continuar con la internacionalización, es necesario traducir los ficheros de ``resources/lang/{LANGUAGE}`` a otros idiomas. Laravel acepta ficheros JSON o PHP para la localización (prioriza ficheros PHP si hay conflicto).

Para autorizar nuevos lenguages en la API, se necesita modificar el array ``allowed`` en ``config/locales.php``.

## Middlewares

Como fue mencionado, las rutas están bajo middlewares que filtran el tráfico hacia la API.
Estos se pueden visualizar en ``app/Http/Middleware``

Algunos interesantes de mencionar pueden ser:
- CheckRole: verifica si el usuario tiene el rol solicitado, en caso contrario, se deniega la solicitud
- EnsureEmailIsVerified: verifica si un usuario tiene verificado su correo electrónico antes de publicar una nota
- PublicCors y Cors: Verifican si el tráfico de origen está autorizado
- SetLocale: Aplica i18n para las respuestas

## Pruebas

Se han programado pruebas de funcionalidad gracias a que Laravel introduce PHPUnit nativamente. Cada fichero de 'Test' comprueba un resultado esperado en cada llamada a las rutas de la API.

Como ejecutar todos los test del proyecto

```bash
cd ./backend
php artisan test
```
**¡Importante!**

Algunos tests trabajan directamente sobre la base de datos, como la prueba de migración; por lo que se recomienda no ejecutar ese test si ya se está trabajando sobre un entorno real con datos importantes. En cambio, en otros solo se instancia una 'Base de datos virtual' usando el trait ``DatabaseTransactions`` de Laravel.

Puede excluirse el test ``DatabaseTest`` mediante el siguiente comando:

```bash
php artisan test --exclude-group=database
```

# Front-end

## ReactJS

### Lazy Loading

Las aplicaciones SPA se caracterizan por cargar todo el contenido de la web al cargar la página y luego almacenarlo en caché. Esto puede ser bueno y malo a la vez, puede empeorar la primera experiencia de usuario aunque luego podrá acceder a diferentes sectores de la aplicación de manera casi instantánea. Angular tiene una forma de controlar esto mediante el uso de módulos descendientes y por la parte de React, también
proporciona su propia solucíón al patrón de diseño Lazy Loading. Lazy Loading es una técnica de optimización que permite cargar componentes de manera diferida, es decir, solo cuando se necesitan. Esto mejora significativamente el rendimiento de la aplicación, ya que reduce la cantidad de recursos que se cargan inicialmente, disminuyendo así el tiempo de carga de la página.

Los resultados de rendimiento sobre la página web en modo desarrollo, sin usuario autenticado; con y sin Lazy Loading son los siguientes:

```plaintext
Con Lazy Loading:
76 solicitudes
2.8 MB transferidos
2.8 MB recursos
Finalizar: 782 ms
DOMContentLoaded: 192 ms
Cargar: 228 ms

Sin Lazy Loading:
135 solicitudes
3.4 MB transferidos
3.4 MB recursos
Finalizar: 936 ms
DOMContentLoaded: 290 ms
Cargar: 591 ms
```

Como se puede observar, Lazy Loading reduce significativamente el número de solicitudes, la cantidad de datos transferidos y los tiempos de carga.

#### Beneficios de Lazy Loading

- **Mejora el rendimiento**: Reduce el tiempo de carga inicial de la aplicación al cargar componentes solo cuando son necesarios.
- **Optimiza la experiencia del usuario**: La página se carga más rápido y es más receptiva.
- **Reducción de datos transferidos**: Menos recursos se transfieren al inicio, lo cual es beneficioso para usuarios con conexiones lentas.

## React Router DOM

React Router DOM es una biblioteca utilizada para manejar la navegación en aplicaciones de React. Permite definir rutas en la aplicación, lo cual facilita la creación de una SPA (Single Page Application) con múltiples vistas y navegación entre ellas.

### Configuración básica

Para configurar React Router DOM, primero se debe instalar la biblioteca:

```bash

pnpm i react-router-dom

```

Luego, se puede configurar el enrutamiento en la aplicación:

```jsx

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'home', index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
])

export default router

```

En este ejemplo, se definen cuatro rutas que heredan de un componente `Layout`. Esto permite utilizar `Layout` como una plantilla para componer el resto de los elementos hijos, proporcionando un diseño base que se aplica consistentemente a los componentes que se muestran en la web. Este enfoque es útil para mantener una estructura y estilo coherentes en las diferentes secciones de la aplicación.

## Editorjs

Editor.js es una biblioteca de JavaScript para la creación de editores de texto enriquecido. Es modular, lo que permite agregar y quitar herramientas según las necesidades del proyecto.

### WYSIWYG

WYSIWYG (What You See Is What You Get) es un concepto que se refiere a editores de contenido donde el texto editado se muestra de forma muy similar a su apariencia final. Editor.js permite crear editores WYSIWYG altamente personalizables.

### Configuración básica de Editor.js

Para configurar Editor.js en un proyecto de React, primero se debe instalar la biblioteca:

```bash
pnpm i @editorjs/editorjs --save
```

Luego, se puede integrar en un componente de React:

```jsx
import { useEffect } from 'react'
import EditorJS from '@editorjs/editorjs'

export default function Editor() {
  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        // ...
      },
    })

    // La función de limpieza se asegura de que el editor se destruya cuando el componente se desmonte.
    return () => {
      editor.destroy()
    }
  }, [])

  return <div id="editorjs"></div>
}
```

### Desafíos al implementar Editor.js en React

#### Problemas de doble renderizado

Uno de los desafíos al integrar Editor.js en una aplicación React es manejar el doble renderizado. En el entorno de desarrollo, React Strict Mode puede causar que los efectos secundarios (como la inicialización de Editor.js) se ejecuten dos veces. Esto puede llevar a la creación de múltiples instancias del editor y potencialmente a errores inesperados. En el código se puede solucionar con el uso de una referencia (useRef).

#### Uso del `useEffect`

Para manejar la inicialización y limpieza del editor, se utiliza el hook `useEffect`. Este hook permite ejecutar código cuando el componente se monta y desmonta. Al especificar un array de dependencias vacío (`[]`), asegura de que el efecto se ejecute solo una vez, después del primer renderizado. Las dependencias pueden cambiar el en desarrollo, debido a que se tiene que controlar diferentes casos de uso.

#### Función de limpieza

La función de limpieza dentro del `useEffect` es necesario para evitar fugas de memoria y otros problemas relacionados con el ciclo de vida del componente. En este caso, `editor.destroy()` se llama cuando el componente se desmonta, asegurando que cualquier recurso asignado por Editor.js se libere correctamente.

## TailwindCSS

TailwindCSS es un framework CSS de utilidad que permite crear diseños personalizados de manera rápida y eficiente mediante clases predefinidas.

### Por qué TailwindCSS

- **Rapidez de desarrollo**: Permite crear estilos directamente en los componentes sin necesidad de escribir CSS adicional.
- **Consistencia**: Facilita mantener un diseño consistente en toda la aplicación.
- **Personalización**: Es altamente personalizable, permitiendo ajustar las clases de utilidad según las necesidades del proyecto.

### Estilos

Los estilos se aplican mediante clases de utilidad directamente en los elementos HTML:

```html
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Button
</button>
```

### Modo oscuro

TailwindCSS facilita la implementación de temas oscuros utilizando la clase `dark`.

Para habilitar el modo oscuro, primero se debe configurar TailwindCSS en el archivo de configuración (`tailwind.config.js`):

```javascript
module.exports = {
  darkMode: 'class', // or 'media' or false
  // ...
};
```

Luego, se pueden utilizar clases específicas para el modo oscuro:

```html
<div className="bg-white dark:bg-gray-800 dark:text-gray-200">
  <p>Texto que cambia con el modo oscuro.</p>
</div>
```

En este ejemplo, el fondo y el color del texto cambiarán cuando el modo oscuro esté activado.

# Cliente Discord

## ¿Qué funciones tiene el bot?

El bot ha sido programado utilizando la biblioteca `discord.js`, que permite interactuar con la API de Discord de manera sencilla y eficiente.
Actualmente proporciona contexto sobre las notas públicas en la comunidad. Esto es posible usando el endpoint público de las notas programado
en Laravel.

# Referencias

- [Lazy - Documentación oficial de React](https://react.dev/reference/react/lazy).
- [React Router DOM - Documentación oficial](https://reactrouter.com/web/guides/quick-start).
- [Editor.js - Documentación oficial](https://editorjs.io/).
- [TailwindCSS - Documentación oficial](https://tailwindcss.com/docs).
- [Discord.js - Documentación oficial](https://discord.js.org).
- [Implementar Editor.js en React](https://dev.to/sumankalia/how-to-integrate-editorjs-in-reactjs-2l6l)
