# Fase de implantación

- [Fase de implantación](#fase-de-implantación)
  - [1- Manual técnico](#1--manual-técnico)
    - [1.1- Instalación](#11--instalación)
    - [1.2- Administración del sistema](#12--administración-del-sistema)
  - [2- Manual de usuario](#2--manual-de-usuario)
  - [3- Mejoras futuras](#3--mejoras-futuras)

## 1- Manual técnico

### 1.1- Instalación

#### Obtención del software

Es posible obtener el código de varias formas. En el siguiente listado se explicará cada una y los pasos a seguir:

1. **Vista previa**. Durante la fase de desarrollo se estará probando la aplicación en un entorno real de despligue mediante el uso de hostings gratuitos. Antes de cada prueba de
despligue, se prueba la aplicación para que cumpla con unos mínimos de funcionalidad establecidos a criterio. El enlace a la vista previa se encuentra en la página inicial del repositorio,
en la esquina superior derecha. Esa sección se irá actualizando en caso de novedades. Se recomienda utilizar el servicio de vista previa con responsabilidad, para evitar problemas con su
funcionamiento.
2. **Código fuente**. La manera más recomendada de seguir con el proyecto es a través de software de control de versiones como Git. De todas formas es posible también descargar el código
en un fichero zip o la última Release estable a través de la portada del repositorio.
1. **Contenedor**. CI/CD está implementado en este proyecto gracias a Google Cloud y GitHub Actions. Esta es una forma de replicar el proyecto y asegurar su correcto
funcionamiento en diversos entornos. Pueden usarse herramientas avanzadas como [Docker](https://www.docker.com) para desplegar una imagen del programa en sistemas compatibles. Por lo tanto, es incorporar los ficheros ``Dockerfile`` para crear una imagen local y ser lanzada en cualquier contenedor deseado. Se debe tener en cuenta que la aplicación necesita de unas configuraciones
previas para su correcto funcionamiento:
   - Pasar las variables, asignarlas directamente o escribir un fichero `.env` para la configuración de Laravel.
   - Pasar las variables (o completar el fichero `.env.local`) con la ruta del servidor (Backend) y el identificador del cliente Discord al Frontend en el momento de la compilación o usar un fichero .env manual
   - Pasar las variables o completar la plantilla `.env.example` del directorio del cliente Discord.
   - Debido a la naturaleza del propósito de la app, en el contenedor no se incluye una conexión con un sistema gestor de bases de datos, por lo que las credenciales deben ser proporcionadas en el momento de la creación de la imagen.
   - Configurar cualquier proveedor de servicio SMTP, por ejemplo, existen alternativas gratuitas como MailTrap. Es necesario proveer esas credenciales para pasar los tests funcionales.
  
   Esta configuración se puede personalizar completamente a través de los ficheros Dockerfile. Se puede priorizar por automatización, comodidad, separación de estructuras, etc.

#### Docker Composer

Primero crear un fichero de variables en la raíz con las credenciales personales de acceso o usar el fichero `.env.docker-compose.example` de plantilla

```bash

vim .env

```

**Un posible resultado**

```plaintext

# .env en la raíz del repositorio

MASTERNOTE_DB_HOST=tu_db_host
MASTERNOTE_DB_DATABASE=tu_db_database
MASTERNOTE_DB_USERNAME=tu_db_username
MASTERNOTE_DB_PASSWORD=tu_db_password
MASTERNOTE_MAIL_MAILER=tu_mail_mailer
MASTERNOTE_MAIL_HOST=tu_mail_host
MASTERNOTE_MAIL_PORT=tu_mail_port
MASTERNOTE_MAIL_USERNAME=tu_mail_username
MASTERNOTE_MAIL_PASSWORD=tu_mail_password
MASTERNOTE_MAIL_FROM_ADDRESS=tu_mail_from_address
MASTERNOTE_MAIL_FROM_NAME=tu_mail_from_name
MASTERNOTE_CLIENT_URL=tu_client_url
MASTERNOTE_API_URL=tu_api_url
MASTERNOTE_CLIENT_DISCORD_TOKEN=tu_client_discord_token
MASTERNOTE_CLIENT_DISCORD_ID=tu_client_discord_id

```

**Ejemplo de docker-compose.yaml**

```yaml

# docker-compose.yaml
# Un resultado simplificado, se pueden agregar las variables y configuraciones adicionales necesarias
# Existe un ejemplo más completo en la raíz del repositorio
# Todas las variables de entorno se encuentran en .env.docker-compose.example
# Adicionalmente, se puede usar el fichero docker-compose.yaml.example como plantilla

services:
  api:
    container_name: masternote_api
    build:
      context: .
      dockerfile: Dockerfile-api
      args:
        MASTERNOTE_DB_HOST: ${MASTERNOTE_DB_HOST}
        MASTERNOTE_DB_DATABASE: ${MASTERNOTE_DB_DATABASE}
        MASTERNOTE_DB_USERNAME: ${MASTERNOTE_DB_USERNAME}
        ...
    environment:
      MASTERNOTE_DB_HOST: ${MASTERNOTE_DB_HOST}
      MASTERNOTE_DB_DATABASE: ${MASTERNOTE_DB_DATABASE}
      MASTERNOTE_DB_USERNAME: ${MASTERNOTE_DB_USERNAME}
      ...
    ports:
      - "8080:80"

  frontend:
    container_name: masternote_frontend
    build:
      context: .
      dockerfile: Dockerfile-frontend
      args:
        MASTERNOTE_API_URL: ${MASTERNOTE_API_URL}
        MASTERNOTE_DISCORD_CLIENT_ID: ${MASTERNOTE_DISCORD_CLIENT_ID}
    environment:
      MASTERNOTE_API_URL: ${MASTERNOTE_API_URL}
    ports:
      - "8081:80"

  discord-client:
    container_name: masternote_discord_client
    build:
      context: .
      dockerfile: Dockerfile-discord-client
      args:
        MASTERNOTE_DISCORD_CLIENT_TOKEN: ${MASTERNOTE_DISCORD_CLIENT_TOKEN}
        MASTERNOTE_API_URL: ${MASTERNOTE_API_URL}
        ...
    environment:
      MASTERNOTE_DISCORD_CLIENT_TOKEN: ${MASTERNOTE_DISCORD_CLIENT_TOKEN}
      MASTERNOTE_API_URL: ${MASTERNOTE_API_URL}
      ...
    ports:
      - "8082:80"

```

Por último se compilan los contenedores con el siguiente comando:

```yaml

docker-compose up --build

```

<img width="469" alt="image" src="https://github.com/tianqueal/Proxecto-DAW-23-24/assets/132884719/9428616f-fffc-47d3-80c4-aa7e32c204e3">

#### Modo desarrollo del proyecto

Posiblemente la opción recomendada si se quiere seguir con el desarrollo del software. Puede hacerse un 'Fork' del repositorio o descargar el código fuente comprimido.
Se deben tener una serie de herramientas, interfaz de comandos (CLI) y dependencias de software para 'lanzar en local' la aplicación:

- Editor de código o IDE
- Un navegador web moderno
- [PHP 8.2](https://www.php.net/releases/8.2/en.php)
- [Composer](https://getcomposer.org). Gestor de paquetes de PHP
- [Node.js 20.14 LTS](https://nodejs.org/en/)
- NPM u otro gestor de paquetes de Node.js
- Sistema Gestor De Bases de Datos. Puede ser MariaDB, MySQL, SQLite, PostgreSQL o SQLServer. Todos estos son [compatibles nativamente](https://laravel.com/docs/10.x/database) con [Eloquent ORM](https://laravel.com/docs/10.x/eloquent). Otros SGBD pueden intregrarse con paquetes de terceros, aunque no se garantiza una compatiblididad íntegra.

Primero se recomienda crear las variables de entorno según las plantillas dispuestas en los directorios de cada servicio

```bash

cp src/backend/.env.example src/backend/.env
cp src/frontend/.env.local.example src/frontend/.env.local
cp src/discordjs-client/.env.example src/discordjs-client/.env

```

#### Backend


**Descargar dependencias**

```bash

cd backend
composer install

```

**Generar clave**

Clave necesaria para cifrar las cookies de sesión, los datos de las contraseñas y otros datos sensibles. Es una medida de seguridad obligatoria en el Framework.

```bash

php artisan key:generate

```

Este comando generará una nueva clave y la colocará automáticamente en el fichero `.env`. Es importante que esta clave se mantenga segura y no se comparta públicamente.

**Pruebas**

Mediante los comandos integrados de Artisan se puede instanciar las pruebas programadas con PHPUnit.
Es importante recordar que si se ejecutan todas las pruebas, también se incluye la de migración, en la cual se
verifica si el SGBD está preparado para el funcionamiento con Laravel. Información adicional en [4. Codificación y pruebas](4_Codificacion_y_pruebas.md#4--pruebas)

```bash

php artisan test # Ejecuta las pruebas del sistema

```

**Migración base de datos**

Durante la prueba de migración se generan datos sobre la base de datos. Es posible replicar esto con el uso manual de los 'Seeders'. Esto es una forma eficiente, controlada y
personalizada de generar datos tanto para pruebas como para visualizar rápidamente datos en el sistema. Esto es beneficioso sobre todo en la parte de desarrollo donde trabajar con
datos existentes mejora el pulido de las funcionalidades y encuentran posibles errores. Los 'Seeders' trabajan en Laravel con las 'Factories', que se encargan de brindar datos de los
modelos instanciados. Los datos que proporcionan las 'Factories' pueden personalizarse a un nivel muy avanzado. Laravel viene preparado con todo eso.

```bash

# Ejecuta la migración sobre la BD. Laravel trabaja con un sistema de control de migraciones
# por lo que registrará cada nueva migración en una tabla
# Es importante seguir las convenciones al crear nuevas funcionalidades, porque el sistema beneficia con un control
# intuitivo de la aplicación con total seguridad de los cambios
php artisan migrate

# Puedes complementar el comando anterior generando datos de prueba sobre las tablas
php artisan migrate --seed

# Este comando limpia la base de datos e integra nuevos datos
php artisan migrate:refresh --seed

```

**Puesta en marcha**

Se instancia un servidor propio de PHP en un puerto local. Es posible cambiar esto con el uso de parámetros.

```bash

php artisan serve

```

#### Frontend

Pasos muy similares al del backend

**Instalación de dependencias**

```bash

cd ./frontend

npm i

```

**Ejecución de pruebas (Opcional)**

```bash

npm run test

```

**Puesta en marcha**

```bash

npm run dev

```

#### Cliente Discord

Para instanciar el cliente Discord en un entorno de desarrollo es necesario seguir con unos pasos diferentes y posiblemente un poco más largos que los anteriores.

**Variables de entorno**

El cliente Discord desarrollado funciona con simplemente estas variables que se tienen que asignar antes de ejecutarlo en modo desarrollo:

- **Token de acceso**: Este es un token proporcionado por la API de Discord. Necesario para conectarse al WebSocket de Discord.
- **Cliente ID**: Identificador proporcionado por la API de Discord. Necesario para registrar los comandos y para crear el enlace de invitación en el Front-end.
- **API URL**: La dirección de la API de MasterNote. Debe tener también incluida los prefijos API `api` y versión `v[N]`, siendo `[N]` la versión actual desarrollada. Ejemplo: `http://localhost:8000/api/v1`.
- **Front-end URL**: Dirección del cliente Front (Aplicación web). En algunos comandos se hace uso de la dirección del Front para facilitar la redirección a las zonas principales de la App. Por ejemplo, en el footer de una nota, se agrega un botón de tipo enlace que permite ver la nota completa en la web.

**Discord API**

Es necesario obtener las credenciales mencionadas antes a través de https://discord.com/developers.

El primer paso es registrarse en la plataforma y tras obtener acceso, se procederá a crear una nueva aplicación en https://discord.com/developers/applications.

![image](https://github.com/tianqueal/Proxecto-DAW-23-24/assets/132884719/e3b8c1be-0045-4cb2-a0da-1e99700cae78)

<img width="511" alt="image" src="https://github.com/tianqueal/Proxecto-DAW-23-24/assets/132884719/c87a4da2-1d8d-486e-a015-39cd029940a0">

En el menú lateral, se encuentran las principales opciones para obtener las credenciales necesarias.

<img width="361" alt="image" src="https://github.com/tianqueal/Proxecto-DAW-23-24/assets/132884719/aed71663-e744-42da-a787-1a2293f28526">

El ID del cliente se encuentra en esta sección:

<img width="500" alt="imagen" src="https://github.com/tianqueal/Proxecto-DAW-23-24/assets/132884719/aaf11838-1db9-4f2c-ac3c-61d8733e8886">

El Bot es público en este caso, no existe ningún problema en mostrar el identificador.

Con el token pasa algo diferente. Se recomienda tenerlo a resguardo. Discord tiene medidas de seguridad, como por ejemplo, cada vez que generas uno, invalidas automaticamente el
anterior.

![image](https://github.com/tianqueal/Proxecto-DAW-23-24/assets/132884719/d7e0715f-ecee-4c0f-8962-e6421070d649)

**Instalación de dependencias**

En el `package.json` se encuentra una dependencia que no se esperaba instalar en este proyecto; `Express.js`. Fue necesario instalarla para el 'correcto' funcionamiento del
contenedor en Google Cloud. `Express.js` es un Framework para desarrollar aplicaciones web con JavaScript desde el lado del servidor. En este caso, se lanza un servicio web en el puerto 80 del contenedor para pasar las verificaciones de tráfico de Cloud Run. Realmente al ser (Discord.js) un WebSocket, es posible ejecutar el bot sin `Express.js`, omitiendo el contenedor y conectar al cliente mientras se tenga la terminal en segundo plano.

```bash
cd src/discord-client
npm i
```

**Pruebas (Opcional)**

El siguiente comando ejecuta las pruebas automatizadas desarrolladas en el cliente Discord.

```bash

npx jest

```

**Puesta en marcha**

```bash
npm start
```

<img width="322" alt="image" src="https://github.com/tianqueal/Proxecto-DAW-23-24/assets/132884719/af40c24e-4cb1-439f-8aaa-c0780d0431a1">

Es posible cambiar el puerto por defecto desde las variables de entorno.

**Sobre la localización o internacionalización**

Discord asigna la localización según los ajustes del usuario. Esta es obtenida del objeto `interaction`, que es el enviado por el usuario. Por lo que en cada llamada a la API se
envía el Header `Accept-Language` del usuario.

El funcionamiento se puede probar por ejemplo en la búsqueda de temas. Si se busca un tema en inglés o en un idioma compatible (allowedLocales), la API devuelve las coincidencias de los temas traducidas.

<img width="383" alt="image" src="https://github.com/tianqueal/Proxecto-DAW-23-24/assets/132884719/4e8f0d62-711d-483e-aaed-cce487739c95">

<img width="383" alt="image" src="https://github.com/tianqueal/Proxecto-DAW-23-24/assets/132884719/6596d825-fc0a-48d6-80c3-16f44366c4c3">

#### Usuarios por defecto de la aplicación

Durante las migraciones y sembrado de datos, se ha dispuesto varios usuarios para pruebas. Algunos de los siguientes usuarios se utilizan
en los test para verificar la aplicación.

Puede modificarse la cantidad, contraseñas, roles, usuarios por defecto, etc., desde el fichero ``database/seeders/UserSeeder.php``.

**Administrador**

Existe inicialmente un usuario con rol 'Admin' en la aplicación. Este puede gestionar los recursos usados en la plataforma

*Crendenciales*

Puede usarse tanto en la 'Vista previa' como al hacer sembrado de datos sobre la aplicación

```json

{
  "email": "admin@masternote.com",
  "username": "admin",
  "password": "Abcd12345$",
  "roles": ["Admin"],
  "emailVerifiedAt": "[FECHA_MIGRACION]"
}

```

**Usuarios test**

Son usados para algunas pruebas de funcionalidad. Se recomienda no eliminarlos al menos que sea necesario.

*Credenciales*

```json

{
  "email": "test_verified@masternote.com",
  "username": "test_verified",
  "password": "Abcd12345$",
  "roles": ["User"],
  "emailVerifiedAt": "[FECHA_MIGRACION]"
}

```

```json

{
  "email": "test@masternote.com",
  "username": "test",
  "password": "Abcd12345$",
  "roles": ["User"],
  "emailVerifiedAt": "NULL"
}

```

**Otros usuarios**

Existen muchos otros usuarios generados aleatoriamente por el sembrado. Se les asigna un número de notas y temas (a cada nota) entre 0 y 5, y si el usuario está verificado, tiene un 50% de probabilidad de que la nota sea pública. Tienen todos por defecto la contraseña ``password``.

### Uso de la API

La API ha sido creada con Laravel, un framework flexible que permite crear grandes aplicaciones de manera eficiente y escalable. A continuación se detallan los endpoints disponibles en la API, sus métodos, niveles de acceso y una breve descripción de su funcionalidad.

### Endpoints

| Método  | URI                                   | Nivel de acceso | Descripción |
|---------|---------------------------------------|-----------------|-------------|
| `GET`   | `sanctum/csrf-cookie`                 | All             | Obtener la Cookie XSRF-TOKEN, que es necesaria para manejar la protección contra CSRF (Cross-Site Request Forgery) |
| `GET`   | `api/v1`                              | All             | Página de bienvenida con información básica de la API. |
| `GET`   | `api/v1/public/test`                  | All             | Prueba de acceso público. |
| `GET`   | `api/v1/public/communityNotes`        | All             | Listar notas de la comunidad. |
| `GET`   | `api/v1/public/communityNotes/{id}`   | All             | Mostrar una nota específica de la comunidad. |
| `POST`  | `api/v1/register`                     | Guest           | Registro de un nuevo usuario. |
| `POST`  | `api/v1/login`                        | Guest           | Inicio de sesión para usuarios. |
| `GET`   | `api/v1/topics`                       | All             | Listar temas disponibles. |
| `GET`   | `api/v1/topics/{id}`                  | All             | Mostrar un tema específico. |
| `GET`   | `api/v1/auth/test`                    | User            | Prueba de acceso autenticado. |
| `POST`  | `api/v1/logout`                       | User            | Cerrar sesión del usuario autenticado. |
| `GET`   | `api/v1/email/resend`                 | User            | Reenviar correo de verificación. |
| `GET`   | `api/v1/notes/trashed`                | User            | Listar notas eliminadas (en papelera). |
| `GET`   | `api/v1/notes/trashed/{trashedNote}`  | User            | Mostrar una nota eliminada específica. |
| `DELETE`| `api/v1/notes/{trashedNote}/force`    | User            | Eliminar permanentemente una nota. |
| `POST`  | `api/v1/notes/{trashedNote}/restore`  | User            | Restaurar una nota eliminada. |
| `GET`   | `api/v1/notes`                        | User            | Listar todas las notas del usuario. |
| `POST`  | `api/v1/notes`                        | User            | Crear una nueva nota. |
| `GET`   | `api/v1/notes/{id}`                   | User            | Mostrar una nota específica. |
| `PUT`   | `api/v1/notes/{id}`                   | User            | Actualizar una nota específica. |
| `DELETE`| `api/v1/notes/{id}`                   | User            | Eliminar una nota específica. |
| `GET`   | `api/v1/notes/{note}/topics`          | User            | Listar temas de una nota específica. |
| `POST`  | `api/v1/notes/{note}/topics`          | User            | Añadir temas a una nota. |
| `PUT`   | `api/v1/notes/{note}/topics`          | User            | Actualizar temas de una nota. |
| `DELETE`| `api/v1/notes/{note}/topics`          | User            | Eliminar temas de una nota. |
| `GET`   | `api/v1/user`                         | User            | Mostrar información del usuario autenticado. |
| `PATCH` | `api/v1/user`                         | User            | Actualizar información del usuario autenticado. |
| `DELETE`| `api/v1/user`                         | User            | Eliminar cuenta del usuario autenticado. |
| `POST`  | `api/v1/user/logout-other-devices`    | User            | Cerrar sesión en otros dispositivos. |
| `GET`   | `api/v1/verified/test`                | User (Verified) | Prueba de acceso para usuarios con email verificado. |
| `POST`  | `api/v1/notes/{note}/publish`         | User (Verified) | Publicar una nota. |
| `POST`  | `api/v1/notes/{note}/unpublish`       | User (Verified) | Despublicar una nota. |
| `GET`   | `api/v1/admin/test`                   | Admin           | Prueba de acceso para administradores. |
| `GET`   | `api/v1/admin/users`                  | Admin           | Listar todos los usuarios. |
| `GET`   | `api/v1/admin/users/{id}`             | Admin           | Mostrar un usuario específico. |
| `PUT`   | `api/v1/admin/users/{id}`             | Admin           | Actualizar un usuario específico. |
| `DELETE`| `api/v1/admin/users/{id}`             | Admin           | Eliminar un usuario específico. |
| `GET`   | `api/v1/admin/notes`                  | Admin           | Listar todas las notas que sean públicas. |
| `GET`   | `api/v1/admin/notes/{id}`             | Admin           | Mostrar una nota pública específica. |
| `PUT`   | `api/v1/admin/notes/{id}`             | Admin           | Actualizar el estado de una nota pública específica. |
| `DELETE`| `api/v1/admin/notes/{id}`             | Admin           | Eliminar una nota pública específica. |
| `GET`   | `api/v1/admin/topics`                 | Admin           | Listar todos los temas. |
| `GET`   | `api/v1/admin/topics/{id}`            | Admin           | Mostrar un tema específico. |
| `POST`  | `api/v1/admin/topics`                 | Admin           | Crear un nuevo tema. |
| `PUT`   | `api/v1/admin/topics/{id}`            | Admin           | Actualizar un tema específico. |
| `DELETE`| `api/v1/admin/topics/{id}`            | Admin           | Eliminar un tema específico. |
| `GET`   | `api/v1/admin/roles`                  | Admin           | Listar todos los roles. |
| `GET`   | `api/v1/admin/roles/{id}`             | Admin           | Mostrar un rol específico. |
| `POST`  | `api/v1/admin/roles`                  | Admin           | Crear un nuevo rol. |
| `PUT`   | `api/v1/admin/roles/{id}`             | Admin           | Actualizar un rol específico. |
| `DELETE`| `api/v1/admin/roles/{id}`             | Admin           | Eliminar un rol específico. |
| `GET`   | `api/v1/admin/stats`                  | Admin           | Obtener las principales estadísticas de la aplicación |

En los endpoints que no sean públicos es obligatorio el paso de una credencial de autorización brindada por la API al momento de registrase o iniciar sesión, y cada nueva operación sobre las rutas protegidas deberá ser enviado como parámetro en el *Header* de la solicitud.

Todas las peticiones a la API pasan por diferentes Middlewares, de los cuales se encargan de verificar el lenguaje solicitado, el rol del usuario o el Token de acceso en caso de *Request* sobre endpoints protegidos.

De esto se habla en más detalle en la Wiki del repositorio.

### 1.2- Administración del sistema

Un usuario administrador tiene la capacidad de gestionar numerosos recursos de la plataforma. En este proyecto, se ha priorizado tanto la funcionalidad como la escalabilidad en el desarrollo de nuevas características. No obstante, se asegura que se cuenten con los controles mínimos indispensables para gestionar la aplicación de manera efectiva.

La API incluye funciones que no estarán disponibles en la primera versión del Frontend de la plataforma. Esto permite la administración del sistema sin depender exclusivamente de la interfaz de usuario del Frontend. La intención principal del proyecto es evitar la dependencia de un sistema monolítico, permitiendo así la incorporación de nuevas soluciones mediante sistemas modernos, ya sea a través del desarrollo propio o implementando alternativas creadas por la comunidad de desarrolladores.

La API está abierta a implementar procesos de automatización, como copias de seguridad y otras tareas administrativas esenciales, aprovechando los beneficios del framework Laravel, que incluye robustez, seguridad y flexibilidad para la integración con otros servicios.

## 2- Manual de usuario

## MasterNote - Guía de usuario

Esta aplicación de notas ha sido diseñada pensando en la simplicidad y la funcionalidad. Permite a los usuarios registrados crear, organizar y gestionar notas de manera eficiente. Las características principales incluyen la capacidad de agregar texto, imágenes y enlaces a las notas, organizar notas en temas específicos, y buscar notas rápidamente a través de una función de filtros.

### Guía Rápida de Uso Web

**Inicio de Sesión y Registro:**

Para comenzar a usar la aplicación, el usuario debe registrarse proporcionando un correo electrónico, un nombre de usuario y creando una contraseña segura. La aplicación informará cualquier error en los campos.

Después de registrarse, el usuario puede empezar a crear sus propias notas. Tras el registro, se puede revisar la bandeja de entrada (o SPAM si
fuera posible) para verificar el correo usado y permitir acceder a nuevas funcionalidades.

**Creación de Notas:**

Una vez dentro de la aplicación, en la sección 'Mis Notas', el usuario puede crear una nueva nota haciendo clic en el botón "Crear Nota".
Se abrirá una vista donde el usuario puede escribir su nota, agregando encabezados, párrafos, líneas de código, listas de verificación, imágenes u otros bloques disponibles.

Las notas se guardan automaticamente tras dejar de escribir durante un breve periodo.

**Organización de Notas:**

Las notas se pueden organizar en temas para facilitar su gestión.
El usuario puede asignar hasta 5 temas por nota.
Los usuarios verificados pueden publicar una nota en la comunidad.

**Búsqueda y Filtrado:**

La aplicación ofrece una función de búsqueda avanzada que permite a los usuarios encontrar notas rápidamente.
El usuario puede buscar por palabras clave o temas asignados a las notas.

**Compartir Notas:**

Las notas se pueden compartir en la comunidad si se tiene verificado el correo usado en el registro.
El usuario puede configurar los temas de la nota y todos los cambios se ven reflejados al instante

Los usuarios pueden personalizar la interfaz de la aplicación cambiando el tema a modo claro, oscuro o por defecto a tu dispositivo.

### Comandos del bot de Discord

Estos comandos pueden ser usados tras añadir el bot a un servidor de Discord. Es necesario tener una cuenta en [Discord](https://discord.com) e invitar al bot mediante el enlace dispuesto en la web.

<img width="500" alt="image" src="https://github.com/tianqueal/Proxecto-DAW-23-24/assets/132884719/2e1de923-277c-45d1-9462-6f80d858f704">

- `/community`. Comando principal para visualizar las notas de la comunidad
  - `list`. Lista las últimas notas en un embed con botones interactivos para navegar entre las páginas obtenidas. Es posible asignar diferentes combinaciones de filtros, además de uno adicional con respecto a la web.
    - `content`. Filtra las notas por un contenido en específico
    - `topics-ids`. Filtra las notas por temas en específico. Los temas deben ser introducidos en formato `1,2,3,4`. Solo se contemplarán los códigos correctos.
    - `username`. Filtra las notas por un nombre de usuario en específico.
  -  `note`. Muestra una nota comunitaria específica en un embed y un enlace para visualizarlo en la web de MasterNote. No se mostrarán las notas donde el contenido sea superior al permitido por el elemento.
-  `/info`. Muestra información relevante sobre el proyecto.
-  `/ping`. Comando de prueba del bot.
-  `/topics`. Permite listar los temas, con identificador y nombre.
   - `name`. Filtra los temas por búsqueda parcial de nombres. Puede usarse tanto el nombre original (inglés) como los permitidos en la localización de la API. La localización es asignada automáticamente por la API de Discord y asignada desde el bot hacía la API de MasterNote.

### Preguntas Frecuentes (FAQ)

1. **¿Cómo puedo recuperar mi contraseña?**
   De momento la aplicación no tiene dicha funcionalidad.
   Si tienes algún problema con respecto a tu cuenta, por favor, comunícate al siguiente correo
   <a href="mailto:masternote@alwaysdata.com">masternote@alwaysdata.com</a> y trataremos de resolverlo lo antes posible

2. **¿Es posible importar notas desde otra aplicación?**
   La funcionalidad de importar notas estará disponible en futuras versiones. De momento, puedes probar nuestro Bot de Discord,
   tiene implementación nativa con servidores en Discord, donde podrás compartir notas comunitarias con otras comunidades.

3. **¿Cómo puedo sincronizar mis notas en múltiples dispositivos?**
   Las notas se sincronizan automáticamente en todos los dispositivos donde el usuario haya iniciado sesión con su cuenta.

4. **¿Existe una versión premium de la aplicación?**
   Sí, la aplicación ofrece una versión premium en fase beta, la cual permite ampliar el actual límite del número de notas. ¡Comunicaremos
   más adelante futuras novedades!

## 3- Mejoras futuras

Tras casi terminar la fase de desarrollo, he podido comprender que el reto es mucho mayor al determinado en la fase del anteproyecto. Sin embargo, esto también ha abierto la puerta a muchas oportunidades de mejora y expansión del sistema. A continuación, se detallan algunas de las mejoras futuras previstas para la plataforma.

### Funcionalidades del Cliente de Discord

- **Integrar comandos adicionales al cliente de Discord**:
  - **Autentificación y gestión de notas**: Permitir a los usuarios autentificarse y listar las notas personales que tengan en su cuenta directamente desde Discord.
  - **Gestión de notas personales**: Permitir a los usuarios crear, editar y eliminar notas personales desde el cliente de Discord.
  - **Publicación de notas a la comunidad**: Permitir a los usuarios publicar notas en la comunidad desde Discord.
  - **Filtrado de notas de la comunidad**: Permitir a los usuarios filtrar y buscar notas de la comunidad por temas específicos.

### Mejoras en las Notas

- **Nuevas herramientas de bloques en el editor**: Integrar herramientas como `editorjs/image` para incluir imágenes en las notas, mejorando así la capacidad de formato y presentación de las notas.
- **Exportación de notas**: Permitir la exportación de notas a formatos populares como Markdown y PDF, facilitando la portabilidad y el uso de las notas fuera de la plataforma.
- **Pasarela de pago para funciones Freemium**: Establecer un sistema de pago que permita a los usuarios acceder a funciones premium, como el almacenamiento adicional, herramientas avanzadas de edición y la capacidad de colaborar en tiempo real.
- **Colaboración en tiempo real**: Implementar características que permitan la colaboración entre usuarios registrados, permitiendo la edición colaborativa de notas compartidas. Esto incluirá la capacidad de invitar a otros usuarios a colaborar en una nota específica, ver los cambios en tiempo real y realizar comentarios o sugerencias.

### Sistema de Votación

- **Implementación de un sistema de votación por estrellas**: Añadir un sistema de calificación para cada nota, permitiendo a los usuarios votar con estrellas. Esto ayudará a destacar las notas más útiles y populares dentro de la comunidad.

### Roles y Permisos

- **Aumento de los roles actuales**: Extender el sistema de roles para incluir más niveles de permisos y responsabilidades. Por ejemplo, crear roles como Moderador, Editor, y Super Administrador, cada uno con permisos específicos para gestionar diferentes aspectos de la plataforma.
  - **Moderador**: Capacidad para moderar contenido y usuarios, gestionar reportes y mantener la calidad del contenido.
  - **Editor**: Permisos para revisar y aprobar contenido antes de su publicación, colaborar en la edición de notas y gestionar categorías de temas.
  - **Super Administrador**: Acceso a todas las funcionalidades administrativas, incluidas las configuraciones avanzadas del sistema y la gestión de usuarios y contenido a gran escala.

### Migración del Back-End

Aunque PHP y Laravel han demostrado ser herramientas eficaces para el desarrollo de esta aplicación, se considera una posible migración futura hacia un stack más moderno y escalable. 

- **Next.js**:
  - **Renderizado del lado del servidor (SSR) nativo**: Optimizar y reducir el tiempo de carga de la web, mejorando la experiencia del usuario.
  - **Estandarización del stack tecnológico**: Simplificar y acelerar el desarrollo con un stack unificado.
  - **Compatibilidad con SEO**: Mejorar la visibilidad y el posicionamiento en motores de búsqueda gracias a las capacidades avanzadas de SEO de Next.js.
  - **Extenso ecosistema de plugins**: Facilitar el desarrollo de nuevas funcionalidades con una amplia gama de plugins y herramientas.
  - **Inspiración en la facilidad de uso de PHP**: Aprovechar la simplicidad y eficacia de PHP mientras se beneficia de las ventajas de un entorno moderno.

Estas mejoras no solo incrementarán la funcionalidad y la usabilidad de la plataforma, sino que también asegurarán su crecimiento y relevancia a largo plazo, proporcionando una experiencia de usuario enriquecida y adaptable a las necesidades futuras.
