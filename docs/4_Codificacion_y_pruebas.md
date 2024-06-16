# Fase de codificación y pruebas

- [Fase de codificación y pruebas](#fase-de-codificación-y-pruebas)
  - [1- Codificación](#1--codificación)
  - [2- Prototipos](#2--prototipos)
  - [3- Innovación](#3--innovación)
  - [4- Pruebas](#4--pruebas)

## 1- Codificación

- Código fuente de la API: [Laravel - Backend](../src/backend)
- Código fuente del Front-end [React - Frontend](../src/frontend)
- Código fuente del cliente Discord [Discordjs - Backend](../src/discord-client)

## 2- Prototipos

La mayoría de interfaces aplicadas en la fase de diseño fueron implementadas en el Front-end. Algunas fueron necesarias cambiar el aspecto/disposición para mejorar la accesibilidad de la web.
Otras funcionalidades fueron pensadas e implementadas mientras de desarrollaba la web debido a que surgían nuevas necesidades o cambios necesarios para el correcto funcionamiento.

Por ejemplo, se implementó con TailwindCSS el modo oscuro para casi la totalidad de las vistas. Esto podría mejorar la legibilidad de la página para algunos usuarios.

Prototipo en Figma: [MasterNote Prototype](https://www.figma.com/design/XlZOYGJrZ836MshdTVzDhA/MasterNote-Web-App-Prototype?node-id=1-8&t=hSd4yztY04ZKb3wN-1)

## 3- Innovación

Para este proyecto, se ha optado por emplear tecnologías modernas con el objetivo de garantizar su escalabilidad. Desde hace tiempo, he estado profundizando en JavaScript, el primer lenguaje que aprendí y que me ha resultado de gran valor. Por ello, decidí utilizar ReactJS, una biblioteca que he estado estudiando durante meses, absorbiendo nuevos conceptos y funcionalidades. ReactJS es actualmente una de las bibliotecas más demandadas en el ámbito de la programación web, reconocida por su amplio uso global. Durante mi estancia en la empresa de prácticas, tuve la oportunidad de aprender nuevos frameworks web, entre ellos Laravel, y desde entonces no he cesado en mi estudio del mismo.

He comprendido que en el sector laboral no es práctico desarrollar aplicaciones web utilizando únicamente tecnologías nativas debido a factores como las diferencias en las prácticas de codificación y los tiempos extendidos de desarrollo. Se concluye que "reinventar la rueda" no es viable para empresas ni para individuos. Este proyecto es OpenSource, lo que permite que cualquier desarrollador pueda continuar con él. Aquí radica la importancia de utilizar frameworks; Laravel, al seguir el patrón de diseño Modelo-Vista-Controlador (MVC), promueve indirectamente las mejores prácticas de diseño de aplicaciones, resultando en un código más limpio, escalable y mantenible. Este framework ha sido fundamental para aprender conceptos y funcionalidades avanzadas como Seeders, Factories, migraciones, middlewares, políticas, internacionalización, envío de correos, traits en PHP, reglas, control y filtrado de consultas, eventos, entre otros.

En el Front-end, ReactJS ha sido una de las bibliotecas más versátiles e intuitivas que he estudiado desde el segundo año del ciclo formativo. Su capacidad de reactividad permite desarrollar interfaces de usuario dinámicas de manera eficiente. Esto se complementa con SWR (stale-while-revalidate), una biblioteca de React que, según su documentación, "el componente obtendrá constante y automáticamente el último flujo de datos, manteniendo la interfaz de usuario rápida y reactiva". SWR sigue el estándar HTTP RFC 5861, priorizando los datos en caché y revalidándolos en segundo plano.

Para el diseño y la experiencia del usuario (UX), he optado por TailwindCSS y Framer Motion. TailwindCSS es una de las bibliotecas de CSS más utilizadas actualmente, y he tenido experiencia previa con ella en proyectos personales y académicos. Además, he empleado Toastify para mejorar la experiencia de usuario sin aumentar significativamente el tiempo de desarrollo.

Los desafíos principales del proyecto han sido la integración y unificación efectiva de todas estas tecnologías, aplicando conocimientos adquiridos tanto en formación como en práctica. Todas las tecnologías elegidas fueron evaluadas y probadas exhaustivamente antes del desarrollo del proyecto. Se realizaron aproximadamente 10 pruebas de diferentes funcionalidades, algunas de las cuales incluyen:

- Inicio de sesión, registro, verificación de correo electrónico, cerrado de sesión actual y en todos los dispositivos y persistencia de sesiones usando Laravel 11 (Monolithic application) y el kit de inicio Laravel Breeze.
- Funcionalidad CRUD usando React Redux Toolkit, TypeScript y Tremor React Components, con el propósito de probar alternativas a API Context propio de React.
- Funcionalidad CRUD usando Express.js, React, Sequelize, TailwindCSS y Editor.js con una base de datos MariaDB sin registro ni control de usuarios con el propósito de probar la librería en un entorno familiarizado.
- Funcionalidad CRUD usando Laravel 11 (Monolithic application) y Editor.js con subida de ficheros (editorjs/image) usando una base de datos MariaDB sin registro ni control de usuarios. El propósito de esta prueba fue comprobar el funcionamiento de Editorjs con diferentes tipos de bloques y en un entorno fuera de JavaScript.
- Pruebas de consultas y respuestas usando Postman y Laravel 10 como API REST a una base de datos MariaDB de prueba.
- Carga diferida (Lazy Load) de componentes React en una aplicación SPA con React Router DOM. Se comprobó como funciona la carga progresiva de componentes en una aplicación web sencilla y como mejora el rendimiento de la misma (Diferencia de tiempo en milisegundos y diferencia de tamaño del total de recursos solicitados).
- Verificación de correos electrónicos usando Laravel 10 (API) a un servidor SMTP de pruebas MailTrap.
- Aplicación web sencilla SPA con React, SWR y usando Laravel 10 (API) en el Back-end. La finalidad era verificar la conexión entre el Front y el Back de las teconologías bases del proyecto, además, se comprobó la actualización de datos en tiempo real de SWR aplicando cambios manuales en la base de datos.
- Prueba de compilación y despliegue de una aplicación básica en React en un dominio web
- Recuperación y mostrado de datos de una API pública a través de un cliente Discord.js. Prueba de despliegue del cliente en un dominio web.
- Otras pruebas más pequeñas

## 4- Pruebas

### Back-end

En Laravel se han aplicado dos estratégias de testing para verificar la API.

Durante el desarrollo se han hecho pruebas unitarias mediante la herramienta Postman, gestionando peticiones en cada endpoint modificado.

Para la automatización de pruebas, se ha usado el integrado por Laravel: PHPUnit. Aquí solo se han programado las pruebas por funcionalidad y no por unidad a las principales rutas de la aplicación.
En primera instancia, las pruebas borraban todo el contenido de las tablas de la base de datos. Por lo que investigando, se ha optado por cambiar el trait encargado de hacer los Refresh por uno que ejecuta las operaciones en memoria mediante transacciones y luego son revertidas al finalizar las pruebas.

En total hay 11 ficheros de pruebas programadas de funcionalidad en el back-end. Cada uno con diferentes métodos que verifican peticiones y respuestas comunes que se tendrían que hacer a la API. Cada test es resuelto si el código de respuesta es el esperado según sea la acción y ruta llamada. En la [Wiki](https://github.com/tianqueal/Proxecto-DAW-23-24/wiki/ES_DOCS#pruebas) se describen los comandos a usar en caso de pruebas. Un ejemplo de uso:

```bash

# Todos los test
php artisan test

```

```bash

# Excluyendo el test de migración (persistente sobre la base de datos)
php artisan test --exclude-group=database

```

#### Descripciones de pruebas exitosas hechas en PHPUnit

- La aplicación responde en la ruta de incio
- Listado de notas comunitarias para usuario no autenticados
- Mostrado de una nota comunitaria específica para usuarios no autenticados
- Registro de un nuevo usuario
- Inicio de sesión de un usuario existente
- Obtención de datos de un usuario autenticado
- Finalizado de sesión de un usuario autenticado
- Permitir volver a reenviar el email de verificación a un usuario autenticado
- Verificar un email con una URL firmada
- Un usuario autenticado puede gestionar completamente sus notas (ver, mostrar, editar, eliminar y forzar su eliminado)
- Un usuario autenticado puede gestionar completamente su cuenta
- Obtener los temas de una nota en contreto
- Sincronizar los temas de una nota en contreto
- Listar los temas disponibles
- Mostrar un tema disponible
- Cambiar el estado de una nota
- Verificar que solo un usuario administrador puede acceder a las rutas `/admin` y gestionar los recursos

### Front-end

Verificar una aplicación con React puede llegar a ser un proceso realmente complejo.

Para ello existen librerías dedicadas que facilitan la automatización de pruebas sobre un DOM emulado.

Se ha tenido en cuenta la posibilidad de implementar esas pruebas automatizadas además de las pruebas manuales ejercidas sobre el software.

Estas pruebas automatizadas en esta versión se enfocan en verificar el correcto renderizado de las vistas a través de diferenes búsquedas sobre el documento. Estas pruebas pueden extenderse y establecer una complejidad con precisión.

Vitest es la principal librería usada, es compatible con el empaquetador Vite y proporciona compatibilidad con las librerías de testing propias de React.

Para ejecutar las pruebas automatizadas sobre el Frontend, se debe ejecutar el siguiente comando:

```bash
npm run test
```

Esto permite ejecutar las pruebas en cola, devolviendo un resumen de los tests hecho y el resultado de los mismos.

La idea a futuro es mejorar estos tests permitiendo una mejor precisión sobre las características del software.

### Cliente Discord

A pesar de no haber tenido experiencia previa en la programación de tests automatizados durante el desarrollo de bots, la intención de implementar pruebas automatizadas en este bot, ha sido un primer paso hacia la mejora de la calidad y fiabilidad del software. Se ha utilizado la librería `jest` para crear un entorno de pruebas que simula interacciones con el bot, permitiendo así verificar su comportamiento de manera automatizada.

```js
test("Ping Command Test", async () => {
    const interaction = {
      reply: jest.fn(),
    }

    await commandsMap.get("ping")(interaction)

    expect(interaction.reply).toHaveBeenCalledWith("Pong!")
  })
```

El código proporcionado muestra un test para el comando "ping" en el bot de Discord.

El test comienza con la creación de un mock del Client de discord.js usando jest.mock(). Esto permite simular la creación de un cliente de Discord sin necesidad de establecer una conexión real con el servicio de Discord. Luego, en el bloque beforeAll, se inicializa este cliente simulado. 

Se simula la ejecución del comando "ping" por parte del bot. Para ello, se crea un objeto interaction que simula una interacción de comando en Discord, con una función reply espiada (mockeada) para verificar si se llama correctamente. Al ejecutar el comando "ping" con este objeto de interacción, se espera que la función reply sea llamada con el argumento "Pong!", lo cual se verifica con expect(interaction.reply).toHaveBeenCalledWith("Pong!").

```bash
# El siguiente comando ejecuta los tests automatizados
npx jest
```

Aunque la experiencia previa en la programación de tests automatizados con Discord.js no era extensa, la implementación de estas pruebas representa un paso importante hacia el desarrollo de software más confiable.

Las prubeas manuales sobre el cliente fueron satisfactorias, lo que permite el despliegue a producción en la próxima versión estable.