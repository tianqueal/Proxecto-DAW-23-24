# Comandos usados en el desarrollo

> **Documentación en desarrollo***

## Back-end

### Crear el proyecto

```bash
# Crear un proyecto Laravel 10
composer create-project laravel/laravel:^10.0 <PROJECT_NAME>

# Normalmente Sanctum ya viene instalado, en caso contrario
composer require laravel/sanctum

# Implementar Sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### Crear los ficheros i18n

```bash
composer require laravel-lang/publisher laravel-lang/lang laravel-lang/attributes --dev
php artisan vendor:publish --provider="LaravelLang\Publisher\ServiceProvider"
```

### Crear las migraciones para la base de datos

```bash
# Aquí se crean los modelos de la base de datos
# Los argumentos -cmf --api generan un controlador con funciones destinadas a una API,
# -m la migración de la base de datos
# y -f crea un 'factory' del modelo para pruebas o sembrado de datos
# --api es un argumento para que solo genere las funciones necesarias para usarse como API
php artisan make:model Note --all --api

php artisan make:model Topic --all --api

php artisan make:model Role --all --api

php artisan make:controller NoteCommunityController --api
php artisan make:controller NoteTopicController --api

# El modelo User no trae por defecto ni un controlador ni un seeder
php artisan make:controller UserController --api
php artisan make:seeder UserSeeder

# Creación tablas intermedias
php artisan make:migration create_note_topic_table

php artisan make:migration create_role_user_table
```

### Controlador para la autenticación

```bash
# Aquí se gestiona el registro, inicio de sesión y cerrar sesión
php artisan make:controller AuthController
```

### Ficheros request

Los siguientes ficheros definen las reglas de tipos de datos que se reciben a la API

```bash
php artisan make:request StoreUserRequest
php artisan make:request UpdateUserRequest
php artisan make:request BaseUserRequest

php artisan make:request UpdateNoteRequest
php artisan make:request StoreNoteRequest
php artisan make:request BaseNoteRequest

php artisan make:request UpdateNoteTopicRequest
php artisan make:request StoreNoteTopicRequest
php artisan make:request BaseNoteTopicRequest

php artisan make:request LoginRequest
php artisan make:request RegisterRequest

php artisan make:request EmailVerificationRequest
```

### Ficheros Resources

Permiten una salida ordenada, controlada y personalizada de datos en formato JSON

```bash
php artisan make:resource UserCollection
php artisan make:resource UserResource

php artisan make:resource TopicCollection
php artisan make:resource TopicResource
php artisan make:resource TopicWithoutNameResource

php artisan make:resource NoteCollection
php artisan make:resource NoteResource
php artisan make:resource NoteCommunityResource
php artisan make:resource NoteContentResource
php artisan make:resource NoteTopicResource

php artisan make:resource RoleCollection
php artisan make:resource RoleResource
```

### Políticas

Las políticas sirven para controlar quien puede acceder a un recurso en concreto. Aparte, también disminuye la carga de lógica en
los controladores, permitiendo tener un código más limpio.

```bash
# En caso de que los ficheros no se incluyan con el parámetro --all al crear el modelo
# Si se siguen las convenciones de nombres, no es necesario indicar cuál es el modelo a referirse
php artisan make:policy UserPolicy
php artisan make:policy NotePolicy
php artisan make:policy TopicPolicy
```

### Reglas

```bash
# Regla para verificar el email o el nombre de usuario en el inicio de sesión
php artisan make:rule EmailOrUsername
```

### Middlewares

Se tiene la intención de crear diferentes Middlewares para desarrollar la aplicación de 
manera óptima, filtrando el tráfico HTTP y dividiendo lógica del código, siguiendo el patrón que
usa el Framework:

- Verificación de roles
- Rate limiting
- CORS
- Verificación de propiedad

```bash
# Ejemplo para crear un middleware que pueda verificar el rol de un usuario
php artisan make:middleware CheckUser
php artisan make:middleware EnsureEmailIsVerified
php artisan make:middleware CorsMiddleware
php artisan make:middleware PublicCorsMiddleware
```

### Mail

#### Controlador para la verificación de la cuenta

```bash
php artisan make:controller VerificationController
```

#### Obtener la vista predeterminada de las notificaciones de Laravel

```bash
# En ese caso, se requiere para modificar la vista Blade del mensaje de verificación de correo electrónico
php artisan vendor:publish --tag=laravel-notifications
php artisan vendor:publish --tag=laravel-mail
```

#### Crear una notificación para el envío de correos

```bash
php artisan make:notification CustomVerifyEmail
```

#### Simular el envio de correos de prueba

Se necesita ese fichero para probar la vista de los correos de verificación

```bash
php artisan make:mail TestMail
```

Y para ello se usará Tinker
```bash
# php artisan tinker
\Mail::to('test@example.com')->send(new \App\Mail\TestMail())
```
### Migración
Tras generar y completar los ficheros de migraciones y de Factories, se procede a
migrar la base de datos con el siguiente comando

```bash
php artisan migrate --seed

# O si se necesita borrar el contenido de las tablas y volver a completarlas
php artisan migrate:refresh --seed
```

### Administrador

Para el rol de un usuario administrador, lo mejor es separar la lógica de los controladores para cada acción de un usuario con diferentes privilegios.

Se han creado controladores adicionales que efectuan las acciones sobre los usuarios, notas (eliminación y cambio de estado de las notas públicas) y temas.

```bash
php artisan make:controller AdminUserController
php artisan make:controller AdminTopicController
...
```

Además de controlar los datos de entrada mediante reglas Request

```bash
php artisan make:request BaseTopicRequest
php artisan make:request UpdateAdminNoteRequest
...
```

Y reglas adicionales para proteger la privacidad de los usuarios
```bash
php artisan make:rule NoteIsPublic
```

### Pruebas

Durante la creación y desarrollo de la aplicación, se irán generando pruebas unitarias y por características

```bash
# Pruebas unitarias
php artisan make:test UserTest --unit

# Pruebas por características (Features)
php artisan make:test UserModelTest

# Para los controladores
php artisan make:test AuthControllerTest
```

### Estándar

```bash
mkdir -p tools/php-cs-fixer  
composer require --working-dir=tools/php-cs-fixer friendsofphp/php-cs-fixer

tools/php-cs-fixer/vendor/bin/php-cs-fixer fix .
```

## Front-end

### Crear el proyecto

Se utilizará Vite.js para la parte front-end del proyecto. En pocas palabras, Vite es un entorno de desarrollo que facilita la creación de aplicaciones web, proporcionando tiempos de arranque instantáneos y recargas de página rápidas, gracias a su aprovechamiento del soporte nativo del navegador para los módulos ES (ECMAScript)

```bash
# En este proyecto se está usando pnpm como gestor de paquetes al ser más optimizado que npm. De todas formas
# es posible usar npm sin problema, simplemente cambiando pnpm por npm en cada comando
pnpm create vite@latest
# React -> JavaScript + SWC

# Ubicarse en la carpeta del proyecto generada por Vite y ejecutar e instalar las dependencias faltantes
pnpm i
```

SWC es un compilador similar a Babel, pero escrito en Rust (más rápido) que convierte JSX en código JavaScript entendible por un navegador. Además, amplía la compatibilidad con otros navegadores web antiguos. Este proyecto garantiza la compatibilidad con navegadores web modernos.

### Instalación de dependencias

Es posible instalar todas las dependencias separando por espacios cada una; aunque algunas se necesitan solo en modo desarrollo

```bash
pnpm i -D tailwindcss postcss autoprefixer

# Esto publica los ficheros de configuración que se deberán completar
pnpx tailwindcss init -p

pnpm i prop-types
pnpm i react-router-dom
pnpm i editorjs
pnpm i axios
pnpm add swr
pnpm i react-toastify
pnpm i framer-motion
pnpm i react-content-loader --save

# Dependencias para el editor
pnpm i prettier-plugin-tailwindcss -D
```
Posiblemente aquí la desconocida es SWR. 

SWR es una librería de React desarrollada por Vercel que se utiliza para la gestión de datos remotos. El uso se justifica por sus principales ventajas:
- Rendimiento: SWR primero devuelve los datos de la caché (stale), luego envía la solicitud de fetch (revalidate), permitiendo que una aplicación se mantenga rápida y reactiva.
- Sincronización en tiempo real: SWR realiza automáticamente la revalidación de los datos en el fondo cuando el navegador recupera el foco o se recupera la conexión a internet, manteniendo los datos siempre sincronizados.
- Retries automáticos: SWR utiliza una estrategia de reintento exponencial para las solicitudes fallidas, por lo que puede ser útil en entornos de red inestables.

### Instalación de bloques de Editorjs

Editorjs tiene la ventaja de que es completamente modular, por lo que instalar nuevos componenetes es realmente fácil. 
En el GitHub oficial [GitHub codex-team/editor.js](https://github.com/codex-team/editor.js) se pueden listar algunos de los bloques compatibles, tanto creados por los mismo desarrolladores como algunos hechos por la comunidad. Por lo que sí, es posible crear bloques personalizados y realmente es una de las posibles mejoras futuras de este proyecto. La API está muy bien documentada y se refuerza con la amplia comunidad existente.

Para el proyecto, se van a usar los siguientes bloques:
- Heading
- Marker
- Checklist

```bash
pnpm i @editorjs/editorjs --save
pnpm i --save @editorjs/header
pnpm i --save @editorjs/paragraph
pnpm i --save @editorjs/marker
pnpm i --save @editorjs/inline-code
pnpm i --save @editorjs/code
pnpm i --save @editorjs/simple-image
pnpm i --save @editorjs/checklist

...

```
