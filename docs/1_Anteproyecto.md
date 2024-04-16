# Anteproyecto fin de ciclo

- [Anteproyecto fin de ciclo](#anteproyecto-fin-de-ciclo)
  - [1- Descripción del proyecto](#1--descripción-del-proyecto)
  - [2- Justificación del proyecto](#2--justificación-del-proyecto)
  - [3- Ayudas y financiación](#3--ayudas-y-financiación)
  - [4- Prevención de riesgos laborales](#4--prevención-de-riesgos-laborales)
  - [5- Modelo de negocio](#5--modelo-de-negocio)
    - [5.1- Viabilidad](#51--viabilidad)
      - [5.1.1- Viabilidad técnica](#511--viabilidad-técnica)
      - [5.1.2- Viabilidad económica](#512--viabilidad-económica)
    - [5.2- Competencia](#52--competencia)
    - [5.3- Promoción](#53--promoción)
  - [6- Requerimientos](#6--requerimientos)
  - [7- Planificación](#7--planificación)

## 1- Descripción del proyecto

El proyecto consiste en el desarrollo de una aplicación web que permita a los usuarios crear y organizar sus propias notas personales. Además, se busca fomentar la creación de una comunidad en torno a la distribución y colaboración de notas, lo que añade un aspecto social y colaborativo al proceso de aprendizaje y organización personal.

Esta aplicación es adecuada para su uso por parte de estudiantes de todos los niveles de educación, profesionales y cualquier persona que busque una solución conveniente para administrar sus ideas, notas y proyectos. También se puede personalizar para ser implementado en un entorno de trabajo que requiera una eficiencia en la gestión de la información.

El propósito principal de esta aplicación es mejorar la experiencia de aprendizaje y la organización personal. Permitirá a los usuarios crear, editar y compartir notas de manera sencilla, lo que facilitará la revisión de contenido y el seguimiento de progresos académicos o profesionales.

Aunque existen en el mercado algunas aplicaciones similares, muchas de ellas son complejas de usar, carecen de características específicas o no están centradas en la colaboración comunitaria. Esta aplicación se diferenciará al ofrecer una interfaz amigable y funcionalidades diseñadas específicamente para cubrir las necesidades de los usuarios, incluyendo la posibilidad de compartir notas con la comunidad. Esto permitirá a los usuarios destacar sus notas más relevantes y útiles para otros miembros, fomentando así un ambiente colaborativo y de intercambio de conocimientos.

En cuanto al modelo de negocio, la aplicación se distribuirá inicialmente de forma gratuita y de código abierto, lo que permitirá a los usuarios acceder a todas sus funciones básicas sin coste alguno. Sin embargo, se contempla la posibilidad de ofrecer características premium o servicios adicionales a través del modelo "Freemium", donde los usuarios podrán acceder a funcionalidades avanzadas mediante una suscripción o pagos individuales.

Para la realización de este proyecto, se utilizarán tecnologías como JavaScript y sus librerías derivadas para la creación de la interfaz de usuario, así como PHP con el framework Laravel para el desarrollo del backend y la creación de una API escalable que facilite la interacción entre el cliente y el servidor. Adicionalmente, se desarrollará un cliente de la API de Discord, que tiene como propósito integrar la aplicación en una red comunitaria muy usada actualmente. Estas tecnologías han sido seleccionadas por su amplia adopción, su capacidad para trabajar en entornos web y su soporte para el desarrollo ágil y eficiente de aplicaciones web modernas.

## 2- Justificación del proyecto

La idea de desarrollar esta aplicación web surge de la necesidad personal de mejorar la organización y el proceso de estudio. Como estudiante, enfrenté dificultades para gestionar eficientemente grandes volúmenes de información y sintetizar conceptos complejos durante mi formación académica. Esta experiencia me llevó a reflexionar sobre la importancia de contar con herramientas que faciliten la creación, organización y revisión de contenido educativo de manera más efectiva.

La aplicación tiene como objetivo principal proporcionar a los usuarios una plataforma intuitiva para gestión de notas, abordando así la dificultad de sintetizar información y organizar ideas durante el aprendizaje. Al permitir compartir notas con la comunidad, se promueve la colaboración y el intercambio de conocimientos entre los usuarios, enriqueciendo la experiencia educativa de manera colectiva.

## 3- Ayudas y financiación

Para la puesta en marcha de este proyecto, se requieren diversos recursos materiales, así como una estimación de los costos asociados al despliegue y mantenimiento del sistema en un entorno real.

En cuanto a los recursos materiales, se utilizarán herramientas y tecnologías de código abierto y gratuitas. Se contempla el uso de un hosting gratuito para la presentación del proyecto y pruebas iniciales. Sin embargo, para un despliegue general y uso constante, se necesitará un hosting de mayor capacidad y fiabilidad.

| Concepto                           | Costo estimado (anual) |
|------------------------------------|------------------------|
| Hosting en la nube (VPS)           | 120€ - 300€            |
| Nombre de dominio                  | 10€ - 20€              |
| Certificado SSL                    | 0€ - 50€               |
| Servicio de monitoreo              | 0€ - 200€              |
| Posibles actualizaciones y mejoras | 0€ - 500€              |
| **Total estimado**                 | **130€ - 1070€**       |

Algunos proveedores ofrecen servicios gratuitos durante un período inicial o en ciertas condiciones, lo que podría reducir los costos en el primer año de despliegue.

Dado que el desarrollo del proyecto será realizado personalmete y utilizando recursos propios, no se contemplan costos adicionales relacionados con el personal o la contratación de servicios externos.

## 4- Prevención de riesgos laborales

Dado que el proyecto se centra en el desarrollo de una aplicación web, no se identifican riesgos laborales significativos asociados con actividades físicas o manipulación de equipos peligrosos. Sin embargo, se consideran aspectos relacionados con la seguridad informática y la protección de datos, que son fundamentales para garantizar la integridad y confidencialidad de la aplicación y la información de los usuarios. A continuación, se detallan las medidas que se tomarán en cuenta:

- **Seguridad de los datos**: Se implementarán medidas para garantizar la seguridad y la integridad de los datos almacenados en la base de datos y durante la transmisión de información entre el cliente y el servidor. Esto incluye el uso de cifrado SSL para proteger la comunicación, el almacenamiento seguro de contraseñas y la implementación de políticas de acceso y control de datos.

- **Cumplimiento normativo**: Se asegurará de que la aplicación cumpla con las regulaciones de privacidad y protección de datos vigentes, como el Reglamento General de Protección de Datos (GDPR) en la Unión Europea. Esto implica obtener el consentimiento explícito de los usuarios para la recopilación y el procesamiento de sus datos personales, así como proporcionarles opciones claras para controlar su información y eliminarla si así lo desean.

- **Seguridad de la aplicación**: Se prestará especial atención a la seguridad de la aplicación en sí misma, incluyendo la protección contra ataques informáticos como inyecciones SQL, cross-site scripting (XSS). Para mitigar estos riesgos, se implementarán prácticas de desarrollo seguro y se realizarán pruebas de seguridad regulares.
  
- **Control del contenido**: La aplicación incluirá mecanismos para controlar de manera limitada que el contenido de las notas no sea explícito ni inapropiado, especialmente considerando que habrá una comunidad de usuarios. Esto se hará mediante el uso de filtros de contenido y la moderación por parte de administradores de la comunidad para garantizar que se cumplan los estándares éticos y legales. Se establecerán políticas claras y términos de uso que prohíban la difusión de contenido ilícito o inapropiado, y se tomarán medidas contra aquellos usuarios que infrinjan estas normas.

## 5- Modelo de negocio

**Modelo de negocio: Freemium**

1. **Necesidades detectadas**: El sistema a desarrollar ofrece una solución práctica para la redacción y gestión de notas personales. La versión gratuita de la aplicación permitirá a los usuarios acceder a las funciones básicas, satisfaciendo así la necesidad de una herramienta simple y funcional para organizar ideas y proyectos. Las funcionalidades premium, como la capacidad de resumir texto en una nota, se ofrecerán como opciones adicionales para aquellos usuarios que requieran características avanzadas y personalizadas.

2. **Posibilidades de comercialización**: El modelo freemium se presenta como una opción viable para generar ingresos, ya que permite monetizar la aplicación sin excluir a los usuarios que prefieren utilizar la versión gratuita. Al ofrecer características premium, se pueden generar ingresos recurrentes a largo plazo. Aunque existen competidores en el mercado, la implementación de un modelo freemium puede diferenciar nuestra aplicación al ofrecer una combinación de funcionalidades gratuitas y premium.

3. **Ideas para su comercialización**: Se promocionará la versión gratuita de la aplicación resaltando su simplicidad y utilidad para la organización personal. Para fomentar la adopción de las características premium, se ofrecerán períodos de prueba gratuitos y descuentos para suscripciones anuales. Además, se podría considerar la inclusión de publicidad no intrusiva en la versión gratuita como una fuente adicional de ingresos.

### 5.1- Viabilidad

#### 5.1.1- Viabilidad técnica

**Recursos humanos y medios de producción**: Se cuenta con los recursos humanos necesarios para llevar a cabo el desarrollo y mantenimiento de la aplicación web y su posterior despliegue. Si se desea mantener la aplicación en funcionamiento después del período inicial de despliegue, se requerirá una evaluación adicional de los recursos necesarios, debido a que podría ser necesario actualizar o ampliar la infraestructura tecnológica.

**Impedimentos técnicos**: A priori, no se identifican impedimentos técnicos significativos que puedan dificultar el proceso produtivo. Las tecnologías escogidas han sido y están constamente siendo estudiadas para el correcto uso de las mismas.

#### 5.1.2- Viabilidad económica

Se estima que los costos asociados al desarrollo inicial de la aplicación durante los tres meses previstos serán cubiertos por los recursos personales disponibles.

El total estimado de costos anuales oscila entre 130€ y 1070€, dependiendo de las necesidades específicas de la aplicación (al volumen de usuarios). Se evaluará de que los ingresos generados por la aplicación, sean suficientes para cubrir estos costos operativos y garantizar la viabilidad económica del proyecto a largo plazo. En caso contrario, se tomarán medidas para ajustar la estrategia de negocio y garantizar la sostenibilidad del proyecto.

### 5.2- Competencia

**Identificación de la competencia**

- **Competidores directos**: Se identifican varias aplicaciones de notas y gestión de contenido que compiten directamente en el mismo espacio de mercado. Ejemplos incluyen Evernote, OneNote, Google Keep y Notion. Cada una de estas aplicaciones ofrece características similares de creación, organización y compartición de notas.

- **Características y posición en el mercado**: Cada competidor tiene sus propias características distintivas y una posición establecida en el mercado. Por ejemplo, Evernote es conocido por su capacidad de organización avanzada y compatibilidad multiplataforma, mientras que Notion destaca por su flexibilidad y capacidades de colaboración en equipo.

**Existencia de productos/servicios sustitutos**

- **Productos/servicios sustitutos**: Además de las aplicaciones de notas tradicionales, existen productos y servicios alternativos que pueden actuar como sustitutos en ciertos casos. Por ejemplo, algunas personas pueden optar por utilizar documentos de Google o Microsoft Word como alternativa a las aplicaciones de notas para ciertos tipos de contenido. Las plataformas de gestión de proyectos como Trello o Asana pueden ser consideradas como sustitutos en situaciones donde la organización y colaboración son prioritarias sobre la toma de notas.

### 5.3- Promoción

- **Redes sociales**: Se priorizará la promoción a través de plataformas como Instagram, Discord, Twitter (X) debido a su accesibilidad y capacidad para llegar a una amplia audiencia de manera rápida y efectiva. Estas redes sociales permiten compartir contenido relevante, interactuar con los usuarios y generar interés en la aplicación de manera orgánica y económica.

- **Repositorio del proyecto**: Se utilizará el repositorio del proyecto para alojar la documentación y recursos sobre el uso de la aplicación, descarga y soporte. Esto permitirá a los usuarios acceder a la información relevante directamente desde el repositorio, facilitando la navegación entre páginas Markdown y proporcionando una experiencia completa para los usuarios interesados en aprender más sobre la aplicación.

Estas técnicas se seleccionaron por su facilidad de implementación. Las redes sociales ofrecen una plataforma accesible y económica para promover la aplicación y generar interés entre los usuarios. Además, utilizar el repositorio del proyecto proporcionará una manera rápida de compartir información relevante y facilitar el acceso a la documentación y recursos relacionados con la aplicación. Al centrarse en estas dos técnicas principales, se puede maximizar el alcance de la promoción y asegurar una mayor visibilidad para la aplicación desde el principio.

## 6- Requerimientos

La aplicación se desplegará de manera provisional en el siguiente dominio web: [MasterNote*](https://masternote.alwaysdata.net/)

**Infraestructura**:
  - Servidor web Apache 2.4
  - Al menos 100MB de almacenamiento
  - 1GB - 2GB de memoria

**Backend**:
  - Framework Laravel 10:
      - PHP 8.2
      - Eloquent ORM
      - API RESTful
      - Sanctum Auth
      - Programación Orientada a Objetos
      - Patrón de diseño Modelo-Vista-Controlador
  - SGBS:
      - MariaDB 10.11
      - Otro *(Por decidir, sistema NoSQL)*
  - Node.js 20:
      - Discord.js v14

**Frontend**:
  - JavaScript (ES11):
      - React Router DOM
      - Editor.js
      - Axios HTTP
      - SWR
  - TailwindCSS
  - Framer Motion

---

> \* Nombre de marca aún en estudio

## 7- Planificación

| Fase                   | Fecha de inicio | Duración   | Descripción de tareas                                                          |
|------------------------|-----------------|------------|--------------------------------------------------------------------------------|
| Estudio preliminar     | 01/04/2024      | 2 semanas  | Investigación de aplicaciones similares, análisis de requisitos.               |
| Análisis               | 15/04/2024      | 1 semanas  | Identificación de funcionalidades, definición de objetivos.                    |
| Diseño                 | 22/04/2024      | 1 semanas  | Diseño de la interfaz de usuario, definición de la arquitectura.               |
| Codificación y pruebas | 29/04/2024      | 3 semanas  | Desarrollo del backend y frontend, implementación de funcionalidades, pruebas. |
| Evaluación y ajustes   | 20/05/2024      | 1 semana   | Revisión final del proyecto, corrección de errores.                            |
| Implantación           | 03/06/2024      | -          | Preparación para el lanzamiento, despliegue de la aplicación.                  |
