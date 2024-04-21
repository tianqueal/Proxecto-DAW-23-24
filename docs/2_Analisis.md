# Requerimientos del sistema

- [Requerimientos del sistema](#requerimientos-del-sistema)
  - [1- Descripción general](#1--descripción-general)
  - [2- Funcionalidades](#2--funcionalidades)
  - [3- Tipos de usuarios](#3--tipos-de-usuarios)
  - [4- Entorno operacional](#4--entorno-operacional)
  - [5- Normativa](#5--normativa)
  - [6- Mejoras futuras](#6--mejoras-futuras)

## 1- Descripción general

Recordando el proyecto; la aplicación tiene como función principal crear y organizar notas personales accesibles desde cualquier navegador web moderno.
Se ha tenido en cuenta lo importante que es la comunidad en el ámbito del aprendizaje e innovación, por lo que es posible compartir notas que se tengan guardadas en la cuenta.

## 2- Funcionalidades

**Actor**: Cliente Discord (Bot)
| Acción   |  Descripción               | Proceso                |
|----------|---------------------------|------------------------|
| Listar la(s) última(s) nota(s) | Mediante un slash command personalizado (proporcionado por la API de Discord) se listará en el servidor donde se ejecutó el comando la última nota publicada en la comunidad | Se ejecuta una petición GET a Laravel mediante la ruta(*) ``'api/notes'``, se obtiene el JSON de la nota y se lista en un ``MessageEmbed`` propio de Discord |

---

**Actor**: Usuario invitado
| Acción   |  Descripción               | Proceso                |
|----------|---------------------------|------------------------|
| Visualización de notas comunitarias | Visualizar y filtrar notas compartidas públicamente por otros usuarios. Las notas pueden ser filtradas por temas específicos | Consulta a la base de datos de las últimas notas y filtrarlas si existe uno o más temas seleccionados |
| Registro | Poder registrarse en la plataforma mediante un nombre de usuario, correo electrónico y una contraseña | Obtener datos del formulario y enviarlos al backend. Laravel se encarga de registrar al nuevo usuario si el nombre de usuario y el correo son únicos; y envía al frontend una respuesta |
| Invitar al bot a un servidor | Mediante un enlace proporcionado por la API de Discord, se puede incluir en un servidor del usuario invitado. Es necesario que el usuario invitado tenga una cuenta en la plataforma Discord | Enlace con un evento ``onClick`` en la sección de notas de la comunidad |

---

**Actor**: Usuario registrado
| Acción   |  Descripción               | Proceso                |
|----------|---------------------------|------------------------|
| Visualización de notas personales | Leer todas las notas almacenadas con el usuario registrado | Consulta de las notas asociadas a un usuario en concreto y listarlas por fecha de manera descendente. Para optimizar el rendimiento de la aplicación, se obtendrá notas de manera dinámica mientras el usuario se desplace por la interfaz. Se intentará solo obtener el encabezado de la nota para evitar cargar todos los datos de las notas mediante una función propia del sistema gestor de bases de datos |
| Crear nota | Crear una nueva en su cuenta | Un usuario registrado podrá crear una nueva nota usando una instancia de la librería Editor.js, la cual devuelve un JSON con los datos introducidos. Se asignará un identificador a la nota y se crearán los registros de los temas seleccionados (en caso de ser elegidos por el usuario). Los datos serán enviados al servidor mediante HTTP. Para evitar constantes envíos de datos al servidor, se usará un tiempo de espera (debounce) en el frontend durante ciertos milisegundos |
| Editar una nota | Poder modificar una nota personal existente | Consulta a la base de datos de la nota completa devolviendo el JSON almacenado. Se renderizará el objeto de la nota mediante una función propia de la librería que permite un valor por defecto; en este caso la nota devuelta y permite actualizar su contenido |
| Eliminar una nota | Suprimir una nota de la cuenta | Se establece la fecha de eliminación de la nota en la base de datos. Por defecto no se listan las notas eliminadas |
| Verificar correo electrónico | Permitir al usuario verificar su identidad mediante un correo electrónico a la dirección brindada en el momento del registro para acceder a más funciones en la aplicación | Si aún no se verificó al usuario, se le permitirá hacerlo. Para el envío de correos es necesario un proveedor de servicios de email. En la etapa de desarrollo se usarán los logs en consola para comprobar el correcto envío de correos; para el despliegue, se usará provisionalmente el SMTP gratuito del hosting |

---

**Actor**: Usuario registrado y verificado
| Acción   |  Descripción               | Proceso                |
|----------|---------------------------|------------------------|
| Publicar una nota en la comunidad | Permitir compartir una nota en la zona de notas de la comunidad | Cambiar el estado de una nota para permitirla listarla en la zona de notas comunitarias. Si la nota no tiene un tema, se le recomendará al usuario seleccionar una. |

---

**Actor**: Administrador
| Acción   |  Descripción               | Proceso                |
|----------|---------------------------|------------------------|
| Panel de administración - Administrar usuarios | Poder revocar el acceso a un usuario en específico | Si un usuario es administrador (consulta a la tabla admins) podrá eliminar a un usuario en específico |
| Panel de administración - Eliminar una nota de la comunidad | Suprimir la visualización de una nota en la sección de comunidad | Solicitud HTTP a Laravel que modifica el estado de la nota |

## 3- Tipos de usuarios

- **Usuario invitado**: Acceso a visualizar las últimas notas de la comunidad; invitar al bot de Discord a un servidor propio; poder registrarse en la aplicación web.
- **Usuario registrado**: Gestionar notas personales; verificar su identidad mediante su correo electrónico.
- **Usuario registrado y verificado**: Publicar notas en la comunidad.
- **Administrador**: Administrar usuarios registrados y notas publicadas en la comunidad.

## 4- Entorno operacional

- Conectividad a internet
- Tener habilitado JavaScript en el navegador

Debido a que se va a usar ReactJS y algunas características del estándar lanzadas en el 2020, es necesario tener al menos la versión mínima compatible de los siguientes navegadores:
- Navegador web compatible con ECMAScript 2020 (ES11):
  - Google Chrome 80+
  - Microsoft Edge 80+
  - Safari 13.1+ (13.4+ iOS)
  - Firefox 74+
  - Opera 67+
  - IE (no compatible)
  - Samsung Internet 13.0+

Debido a la limitación de compatibilidad, el alcance de usuarios está estimado entre el 94.97% y el 96.94%.

---
Fuentes:
- [Can I Use](https://caniuse.com/sr_es11)
- [ECMAScript compatibility table](https://compat-table.github.io/compat-table/es2016plus/)

## 5- Normativa

Este proyecto cumplirá las exigencias de las normativas actuales, incluyendo la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales (LOPDPGDD) y el Reglamento General de Protección de Datos (GDPR). Además, se tomarán en cuenta las siguientes normativas:

- **Normativas sobre propiedad intelectual:** Antes de publicar una nota en la comunidad, se notificará al usuario sobre las regulaciones relacionadas con los derechos de autor y la propiedad intelectual. Esto incluye asegurarse de que se respeten los derechos de autor de terceros y establecer políticas claras sobre el uso y la distribución de contenido protegido. Las fuentes y atribuciones de contenido protegido se señalarán para garantizar el cumplimiento de las leyes de propiedad intelectual.

- **Normativas de privacidad y protección de datos:** Además de cumplir con LOPDPGDD y GDPR, se implementarán políticas de privacidad claras y transparentes que informen a los usuarios sobre cómo se recopilan, almacenan y utilizan sus datos personales. Se proporcionará a los usuarios un control total sobre sus datos y se solicitará su consentimiento explícito antes de cualquier procesamiento de información personal. Las medidas de seguridad adecuadas se implementarán para proteger la confidencialidad y la integridad de los datos del usuario. Las políticas de privacidad serán fácilmente accesibles desde la aplicación para garantizar la transparencia y el cumplimiento normativo.

---
Fuentes:
- [LOPDPGDD](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673)
- [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [LPI](https://www.boe.es/buscar/act.php?id=BOE-A-1996-8930)

## 6- Mejoras futuras

Principales mejoras futuras:

- Integrar comandos adicionales al cliente de Discord:
  - Permitir la autentificación y listar las notas personales que se tengas en la cuenta personal
  - Permitir gestionar notas personales
  - Permitir publicar una nota a la comunidad
  - Permitir filtrar notas de la comunidad por un tema en concreto

- Notas:
  - Integrar nuevas herramientas de bloques al editor; por ejemplo 'editorjs/image', que incluye imágenes en las notas
  - Exportar notas a formatos populares: Markdown o PDF
  - Establecer una pasarela de pago para acceder a las funciones Freemium
  - Implementar características de colaboración entre usuarios registrados, lo que permitiría una edición colaborativa de notas compartidas. Esto
    incluiría la capacidad de invitar a otros usuarios a colaborar en una nota específica, ver los cambios en tiempo real y realizar comentarios o
    sugerencias para mejorar el contenido. La colaboración en tiempo real facilitaría el trabajo en equipo y promovería la creatividad y
    productividad de los usuarios.

Migración del Back-End:

PHP tiene su tiempo en la web y a pesar de eso, es uno de los lenguajes más usados actualmente. Además, Laravel hace que desarrollar una aplicación con PHP sea lo más eficiente, cómodo y rápido posible. Sin embargo, se incluye la siguiente mejora pensando en la escalabilidad de la aplicación:

- Next.js:
  - Renderizado del lado del servidor (SSR) nativo: Optimiza y reduce el tiempo de carga de una web, mejorando la experiencia del usuario
  - Estandarizar el stack tecnológico, simplificando el tiempo de desarrollo
  - Amplia compatibilidad con SEO
  - Extenso ecosistema de plugins pensado para desarrollar cualquier web
  - Está inspirado en la facilidad de uso de PHP
