# Proyecto fin de ciclo

- [Proyecto fin de ciclo](#proyecto-fin-de-ciclo)
  - [Documentación oficial del proyecto](#documentación-oficial-del-proyecto) 
  - [Tablero del proyecto](#tablero-del-proyecto)
  - [Descripción](#descripción)
  - [Instalación - Puesta en servicio](#instalación---puesta-en-servicio)
  - [Uso](#uso)
  - [Acerca del autor](#acerca-del-autor)
  - [Licencia](#licencia)
  - [Índice](#índice)
  - [Guía de contribución](#guía-de-contribución)
  - [Enlaces](#enlaces)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![GitHub branch check runs](https://img.shields.io/github/check-runs/tianqueal/Proxecto-DAW-23-24/main?style=for-the-badge)](https://github.com/tianqueal/Proxecto-DAW-23-24/actions)

![Uptime Robot status](https://img.shields.io/uptimerobot/status/m797098405-8a0c09ca4319d92cd5afb791?style=for-the-badge&logo=Laravel&logoColor=white&label=API%20Status)
![Uptime Robot status](https://img.shields.io/uptimerobot/status/m797098402-419f5d2255d7c69601234274?style=for-the-badge&logo=React&logoColor=white&label=Frontend%20Status)
![Uptime Robot status](https://img.shields.io/uptimerobot/status/m797091153-4f3e9d38b7d4ea1f7f436b6e?style=for-the-badge&logo=Discord&logoColor=white&label=Bot%20Status)


## Documentación oficial del proyecto
- [Documentación simplificada](docs)
- [MasterNote Wiki](https://github.com/tianqueal/Proxecto-DAW-23-24/wiki)

## Tablero del proyecto

**Fase actual**: Despliegue

[![Laravel API](https://img.shields.io/badge/Laravel%20API%20REST-Deploy-FF2D20?style=for-the-badge&logo=Laravel&logoColor=white)](https://laravel.com/)
[![React App](https://img.shields.io/badge/React%20App-Deploy-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Discord Client](https://img.shields.io/badge/Discord%20Client-Deploy-5865F2?style=for-the-badge&logo=Discord&logoColor=white)](https://discord.js.org/)

## Descripción

El siguiente proyecto presenta una aplicación web de notas diseñada para mejorar la organización personal y la productividad, con un enfoque en la colaboración comunitaria. Diseñada para estudiantes, profesionales y cualquier persona interesada en organizar sus ideas; la aplicación facilitará la creación, edición y distribución de notas. 

La aplicación será inicialmente de forma gratuita y de código abierto, con la posibilidad de acceder a funciones premium a través del modelo "Freemium". Se han usado tecnologías como: JavaScript; PHP; y la API de Discord para integrar la aplicación en una red comunitaria.

## Instalación - Puesta en servicio

### Vista previa

Se garantiza el despligue temporal de la aplicación durante al menos tres meses después de la finalización del desarrollo inicial y superada la fase de pruebas. Puede probarse de manera instantánea el funcionamiento completo del software mediante el enlace en la esquina superior derecha, en la descripción del proyecto. Se recomienda utilizar el servicio con responsabilidad.

#### Software necesario para la Vista Previa

- Un navegador web [compatible](docs/2_Analisis.md#4--entorno-operacional)
- Conexión a Internet

### Servicio de contenedores

Mediante un fichero `docker-compose` pueden ejecutarse las tres imágenes de la aplicación de manera local o incluso desplegarlos en un servicio de contenedores en la nube; algo que se hace en este proyecto mediante Google Cloud.

Puede usarse el fichero de ejemplo `docker-compose.yaml.example` para crear las respectivas imágenes usando los `Dockerfile` escritos en la raíz del repositorio.

Antes de ejecutar el script, es necesario declarar las variables de entorno en un fichero `.env` en la raíz usando de ejemplo el fichero `.env.docker-compose.example`. Se ha hecho de esta forma para trabajar correctamente con los llaveros de secretos de Google Cloud, proporcionando una interfaz y distribución segura.

De todas formas, puede personalizarse la forma en como se compilan los contenedores, ya sea incluyendo directamente las variables de entorno usando cada fichero `.env` de ejemplo incluido en los directorios de los servicios y así evitar pasar todas las variables mediante el `docker-compose` o creando imágenes adicionales si fuera necesario. El único servicio indispensable es la API, por lo que se puede omitir, por ejemplo, el contenedor del cliente Discord; sobre todo porque es necesario seguir pasos adicionales descritos en [Implantación](docs/5_Implantación.md#cliente-discord).

#### Variables de entorno

Todas las variables declaradas en `.env.docker-compose.example` son obligatorias para el funcionamiento completo del software.

| Variable | Servicios | Descripción | Ejemplo |
|----------|-----------|-------------|---------|
| `MASTERNOTE_DB_HOST` | `API` | URL del Sistema Gestor de Bases de Datos | `localhost` |
| `MASTERNOTE_DB_DATABASE` | `API` | Nombre de la base de datos | `myapp_db` |
| `MASTERNOTE_DB_USERNAME` | `API` | Usuario para acceder a la base de datos | `admin` |
| `MASTERNOTE_DB_PASSWORD` | `API` | Contraseña para acceder a la base de datos | `securePassword123!` |
| `MASTERNOTE_MAIL_MAILER` | `API` | Protocolo de envío de correos | `smtp` |
| `MASTERNOTE_MAIL_HOST` | `API` | Host del servicio de correo | `smtp.mailtrap.io` |
| `MASTERNOTE_MAIL_PORT` | `API` | Puerto del servicio de correo | `2525` |
| `MASTERNOTE_MAIL_USERNAME` | `API` | Usuario del servicio de correo | `mailtrapUsername` |
| `MASTERNOTE_MAIL_PASSWORD` | `API` | Contraseña del servicio de correo | `mailtrapPassword` |
| `MASTERNOTE_MAIL_FROM_ADDRESS` | `API` | Dirección de correo del remitente | `info@myapp.com` |
| `MASTERNOTE_MAIL_FROM_NAME` | `API` | Nombre del remitente de correo | `MyApp` |
| `MASTERNOTE_CLIENT_URL` | `API` `Discord Client` | URL del cliente (frontend) | `http://localhost:5173` |
| `MASTERNOTE_API_URL` | `API` `Frontend` `Discord Client` | URL de la API | `http://localhost:8000/api/v1` |
| `MASTERNOTE_DISCORD_CLIENT_TOKEN` | `Discord Client` | Token del cliente de Discord | `discordClientToken123` |
| `MASTERNOTE_APP_NAME` | `API` `Frontend` `Discord Client` | Nombre de la aplicación | `MyApp` |
| `MASTERNOTE_DISCORD_CLIENT_ID` | `Frontend` `Discord Client` | ID del cliente de Discord | `discordClientId123` |

En caso de no proporcionar credenciales válidas para el servicio de correos, la API no podrá enviar correctamente los correos de verificación, aún así, la aplicación debería funcionar sin problemas; se ha tenido en cuenta la posibilidad de no depender de un servicio de correos externo.

#### Software necesario para el servicio de contenedores

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Composer](https://docs.docker.com/compose/install/) (Opcional, pero se debe ejecutar cada fichero Dockerfile por separado)
- Proveedor de servicio de Mail SMTP. ([Técnicamente es posible utilizar otros](https://laravel.com/docs/10.x/mail) diferentes a SMTP, sin embargo, no se garantiza la compatibilidad en esta versión del proyecto) 
- Un SGBD compatible con [Eloquent ORM](https://laravel.com/docs/10.x/database#introduction)
- Conexión a Internet

#### Puesta en marcha - Servicio de contenedores

Tras completar las credenciales en el fichero `.env`, el `docker-compose` e instalar el software necesario, iniciar los contenedores es tan sencillo como ejecutar el siguiente comando:

```bash
docker-compose up --build
```

<img width="469" alt="image" src="https://github.com/tianqueal/Proxecto-DAW-23-24/assets/132884719/9428616f-fffc-47d3-80c4-aa7e32c204e3">

<img width="752" alt="image" src="https://github.com/tianqueal/Proxecto-DAW-23-24/assets/132884719/774e9df8-9dcf-4c57-bb57-8502ad3bbbc6">

### Código fuente

Puede obtenerse el código fuente mediante los enlaces proporcionados por GitHub en el botón superior `Code` o la última versión estable en las [Releases](https://github.com/tianqueal/Proxecto-DAW-23-24/releases), o incluso haciendo un **Fork** del repositorio si se quiere seguir con el desarrollo del mismo.

Al igual que con el servicio de contenedores, es necesario declarar las variables de entorno, aunque en este caso, se deben usar las plantillas que se encuentran en cada servicio.

| Fichero necesario | Ruta | Ruta al fichero de ejemplo |
|-------------------|------|----------------------------|
| `.env` | `src/backend/.env` | `src/backend/.env.example` |
| `.env.local` | `src/frontend/.env.local` | `src/frontend/.env.local.example` |
| `.env` | `src/discord-client/.env` | `src/dicord-client/.env.example` |

#### Software necesario para lanzar el código fuente en modo desarrollo

- Editor de código, IDE o bloc de notas
- Un navegador web [compatible](docs/2_Analisis.md#4--entorno-operacional)
- [PHP 8.2](https://www.php.net/releases/8.2/en.php)
- [Composer](https://getcomposer.org). Gestor de paquetes de PHP
- [Node.js 20.14 LTS](https://nodejs.org/en/)
- NPM, PNPM u otro gestor de paquetes de Node.js
- Sistema Gestor De Bases de Datos. Compatibilidad igual al descrito en los servicios de contenedores.

#### Puesta en marcha - Código fuente en modo desarrollo

##### Paso 1. Instalación de dependencias

```bash
# Desde src/backend
composer install

# Desde src/frontend
npm i # Si se está utilizando otro gestor de paquetes, deberá ser algo similar

# Desde src/discord-client
npm i
```

##### Paso 1.A. Generación de claves (solo Backend)

```bash
# Desde src/backend
php artisan key:generate
```

##### Paso 2. Pruebas (Opcional)

```bash
# Desde src/backend
php artisan test

# Desde src/frontend
npm run test

# Desde src/discord-client
npx jest
```

##### Paso 3. Lanzamiento

```bash
# Desde src/backend
php artisan serve

# Desde src/frontend
npm run dev

# Desde src/discord-client
npm start
```

##### Paso 3.A. Compilación (solo Frontend)

El código del Frontend puede llevarse como ficheros estáticos a cualquier otra instancia, como servidores, proveedores de hostings de sitios estáticos (Vercel, GitHub), etc.

```bash
# Desde src/frontend
npm run build
```

Para información adicional, puede consultarse [Modo desarrollo del proyecto](docs/5_Implantación.md#modo-desarrollo-del-proyecto)

## Uso

La aplicación dispone de diferentes usuarios con distintos niveles de acceso:

1. Usuario invitado
   - Navegar por las principales rutas públicas
   - Listar, filtrar y visualizar las notas de la comunidad
   - Invitar a MasterNote Bot a un servidor
     - Un usuario registrado en Discord.com y en un servidor con MasterNote Bot podrá:
       - Listar, filtrar y ver (las compatibles) notas comunitarias
       - Listar y buscar temas
   - Registrarse
2. Usuario autenticado
   - Iniciar sesión
   - Crear, listar, actualizar y eliminar sus notas personales
   - Asignar temas a sus notas
   - Verificar su cuenta con el correo usado en el registro
   - Cerrar sesión en otros dispositivos
   - Cerrar sesión en la sesión actual
   - Eliminar su cuenta permanentemente
3. Usuario autenticado y verificado
   - Publicar notas en la comunidad
4. Usuario administrador
   - Visualizar las principales estadísticas de la aplicación
   - Crear, listar, actualizar y eliminar usuarios
   - Listar, cambiar el estado y eliminar notas públicas
   - Listar y eliminar temas

El manual de usuario y otras referencias se pueden visualizar en [Manual de Usuario](docs/5_Implantación.md#2--manual-de-usuario)

## Acerca del autor

Hola, soy Christian, artesano de software y hasta hace poco, integrante en el equipo de desarrollo de aplicaciones a medida en una empresa del sector. Desde que tengo uso de razón, me ha gustado estar al tanto de las últimas novedades tecnológicas, especialmente aquellas que prometen cambiar la manera en la que se resuelven las problemáticas actuales, simplificando el tiempo sin afectar a la idea inicial.

A lo largo de mi aprendizaje, he trabajado con una amplia gama de tecnologías web, incluyendo React y Angular en aplicaciones SPA; Laravel como aplicación monolítica y también con enfoque a APIs. He podido aplicar los conocimientos aprendidos mediante creación de diferentes proyectos personales, usando tanto tecnologías nativas como Frameworks que permiten extender la compatibilidad de soluciones a todo tipo de usuarios finales.

Puedes contactárme personalmente a través de tianqueal@gmail.com para cualquier pregunta sobre este proyecto u otros o simplemente para conectar. Estoy siempre abierto a nuevas ideas y oportunidades que pongan en práctica mis habilidades y me permitan crecer tanto personal como profesionalmente.


## Licencia

El software se distribuye bajo la licencia MIT. En resumen, esta permite hacer lo que se desee con el software. Ya sea ejecutarlo, estudiarlo, modificarlo, redistribuido, e inclusive, sub-licenciar.

Las únicas restricciones son:
  - Mantener los derechos de autor.
  - El autor original se deslinda de cualquier daño o mal uso resultado del código licenciado.
  - En las copias generadas se debe mantener la licencia MIT.

## Índice

1. [Anteproyecto](docs/1_Anteproyecto.md)
2. [Análisis](docs/2_Analisis.md)
3. [Diseño](docs/3_Diseño.md)
4. [Codificación y pruebas](docs/4_Codificación-y-pruebas.md)
5. [Implantación](docs/5_Implantación.md)
6. [Referencias](docs/6_Referencias.md)

## Guía de contribución

¿Estás interesado en seguir con el desarrollo de este proyecto? Adivina que, ¡es de código abierto!

En [MasterNote Project](https://github.com/tianqueal/Proxecto-DAW-23-24/projects) existen algunas problemáticas reportadas que pueden convertirse en [Issues](https://github.com/tianqueal/Proxecto-DAW-23-24/issues) del repositorio.

### Cómo contribuir

1. **Fork del repositorio**: Haz un fork del repositorio en tu cuenta de GitHub.
2. **Clona el repositorio**: Clona el repositorio fork a tu máquina local.
   ```bash
   git clone https://github.com/tu-usuario/nombre-del-repositorio.git
   ```
3. **Crea una rama**: Crea una nueva rama para tu contribución.
   ```bash
   git checkout -b nombre-de-tu-rama
   ```
4. **Realiza tus cambios**: Realiza los cambios necesarios en tu rama. Asegúrate de seguir las convenciones de codificación del proyecto descritos en [MasterNote Wiki](https://github.com/tianqueal/Proxecto-DAW-23-24/wiki), sección **Estándares**.
5. **Prueba tus cambios**: Antes de enviar tus cambios, asegúrate de que todo funcione correctamente ejecutando las pruebas existentes y añadiendo nuevas pruebas si es necesario. Recuerda que todos los cambios sobre la rama `main` pasan una serie de pruebas automáticas mediante GitHub Actions. Más información en [Pruebas](docs/4_Codificacion_y_pruebas.md#4--pruebas).
6. **Haz commit de tus cambios**: Haz commit de tus cambios con un mensaje descriptivo. Puedes seguir las convenciones clásicas de mensajes en commits.
   ```bash
   git commit -m "Accion: Descripción de tus cambios"
   ```
7. **Envía tu rama**: Envía tu rama a GitHub.
   ```bash
   git push origin nombre-de-tu-rama
   ```
8. **Abre un Pull Request**: En GitHub, abre un Pull Request desde tu rama hacia la rama `main` del repositorio original. Proporciona una descripción detallada de los cambios y del problema que solucionan.

### Reporte de bugs

Si encuentras un error, abre un issue en GitHub. Incluye la mayor cantidad de detalles posible:
- Descripción del error.
- Pasos para reproducir el error.
- Entorno de desarrollo (sistema operativo, versiones de software, etc.).
- Logs o capturas de pantalla que puedan ayudar a identificar el problema.

### Solicitud de nuevas funcionalidades

Si tienes una idea para una nueva funcionalidad, abre un issue en GitHub. Incluye:
- Descripción detallada de la funcionalidad.
- Justificación de por qué debería añadirse al proyecto.
- Ejemplos de cómo funcionaría la funcionalidad.

### Estilo de código

Por favor, sigue las guías de estilo del proyecto para asegurar la consistencia del código. Utilizamos Pretttier, ESLint en React y PSR-12 en PHP. Antes de enviar tus cambios, asegúrate de que tu código cumple con estas guías. Más información en [MasterNote Wiki](https://github.com/tianqueal/Proxecto-DAW-23-24/wiki).

### Código de conducta

Este proyecto sigue un [Código de conducta - EN](CODE_OF_CONDUCT.md). Al participar, te comprometes a respetar estos estándares en todas las interacciones del proyecto.

Apreciamos cada contribución, ya sea pequeña o grande. ¡Gracias por ayudar a mejorar este proyecto!

## Enlaces

Todos los enlaces y referencias que han ayudado al desarrollo se encuentran en [MasterNote - Sources](https://github.com/tianqueal/Proxecto-DAW-23-24/wiki/SOURCES).

Un gran agradecimiento a la comunidad DEV que ha permitido que este proyecto se haga realidad.
