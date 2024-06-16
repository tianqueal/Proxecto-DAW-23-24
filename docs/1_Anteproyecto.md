# Anteproyecto fin de ciclo

- [Anteproyecto fin de ciclo](#anteproyecto-fin-de-ciclo)
  - [1- Descripción del proyecto](#1--descripción-del-proyecto)
  - [2- Empresa](#2--empresa)
    - [2.1- Idea de negocio](#21--idea-de-negocio)
    - [2.2- Justificación de la idea](#22--justificación-de-la-idea)
    - [2.3- Segmento de clientes](#23--segmento-de-clientes)
    - [2.4- Competencia](#24--competencia)
    - [2.5- Propuesta de valor](#25--propuesta-de-valor)
    - [2.6- Forma jurídica](#26--forma-jurídica)
    - [2.7- Inversiones](#27--inversiones)
      - [2.7.1- Costes](#271--costes)
      - [2.7.2- Ingresos](#272--ingresos)
    - [2.8- Viabilidad](#28--viabilidad)
      - [2.8.1- Viabilidad técnica](#281--viabilidad-técnica)
      - [2.8.2- Viabilidad económica](#282--viabilidad-económica)
      - [2.8.3- Conclusión](#283--conclusión)
  - [3- Requerimientos técnicos](#3--requerimientos-técnicos)
  - [4- Planificación](#4--planificación)

## 1- Descripción del proyecto

El proyecto consiste en el desarrollo de una aplicación web que permita a los usuarios crear y organizar sus propias notas personales. Además, se busca fomentar la creación de una comunidad en torno a la distribución y colaboración de notas, lo que añade un aspecto social y colaborativo al proceso de aprendizaje y organización personal.

Esta aplicación es adecuada para su uso por parte de estudiantes de todos los niveles de educación, profesionales y cualquier persona que busque una solución conveniente para administrar sus ideas, notas y proyectos. También se puede personalizar para ser implementado en un entorno de trabajo que requiera una eficiencia en la gestión de la información.

El propósito principal de esta aplicación es mejorar la experiencia de aprendizaje y la organización personal. Permitirá a los usuarios crear, editar y compartir notas de manera sencilla, lo que facilitará la revisión de contenido y el seguimiento de progresos académicos o profesionales.

Aunque existen en el mercado algunas aplicaciones similares, muchas de ellas son complejas de usar, carecen de características específicas o no están centradas en la colaboración comunitaria. Esta aplicación se diferenciará al ofrecer una interfaz amigable y funcionalidades diseñadas específicamente para cubrir las necesidades de los usuarios, incluyendo la posibilidad de compartir notas con la comunidad. Esto permitirá a los usuarios destacar sus notas más relevantes y útiles para otros miembros, fomentando así un ambiente colaborativo y de intercambio de conocimientos.

En cuanto al modelo de negocio, la aplicación se distribuirá inicialmente de forma gratuita y de código abierto, lo que permitirá a los usuarios acceder a todas sus funciones básicas sin coste alguno. Sin embargo, se contempla la posibilidad de ofrecer características premium o servicios adicionales a través del modelo "Freemium", donde los usuarios podrán acceder a funcionalidades avanzadas mediante una suscripción o pagos individuales.

Para la realización de este proyecto, se utilizarán tecnologías como JavaScript y sus librerías derivadas para la creación de la interfaz de usuario, así como PHP con el framework Laravel para el desarrollo del backend y la creación de una API escalable que facilite la interacción entre el cliente y el servidor. Adicionalmente, se desarrollará un cliente de la API de Discord, que tiene como propósito integrar la aplicación en una red comunitaria muy usada actualmente. Estas tecnologías han sido seleccionadas por su amplia adopción, su capacidad para trabajar en entornos web y su soporte para el desarrollo ágil y eficiente de aplicaciones web modernas.

## 2- Empresa

### 2.1- Idea de negocio

El producto central es una aplicación web de toma de notas y organización personal con características colaborativas. El valor añadido reside en su interfaz amigable y en las funcionalidades específicas diseñadas para facilitar la colaboración comunitaria y el intercambio de conocimientos. Uno de los productos aumentados es el desarrollo de la API, la cual puede ser usada en otros entornos y no necesariamente en la web. Un ejemplo es el cliente Discord, trabaja consultando datos de la API para ser mostrados en otras aplicaciones. Las funcionalidades 'premium' serán principalmente la fuente de ingresos.

### 2.2- Justificación de la idea

La idea de desarrollar esta aplicación web surge de la necesidad personal de mejorar la organización y el proceso de estudio. Como estudiante, enfrenté dificultades para gestionar eficientemente grandes volúmenes de información y sintetizar conceptos complejos durante mi formación académica. Esta experiencia me llevó a reflexionar sobre la importancia de contar con herramientas que faciliten la creación, organización y revisión de contenido educativo de manera más efectiva.

La aplicación tiene como objetivo principal proporcionar a los usuarios una plataforma intuitiva para la gestión de notas, abordando así la dificultad de sintetizar información y organizar ideas durante lo aprendizaje. Al permitir compartir notas con la comunidad, se promueve la colaboración y el intercambio de conocimientos entre los usuarios, enriqueciendo la experiencia educativa de manera colectiva.

Actualmente, existen aplicaciones que intentan dar respuesta la esta necesidad, como Evernote, OneNote, Google Keep y Notion. Con todo, muchas de estas aplicaciones son complejas de usar, carecen de características específicas o no están centradas en la colaboración comunitaria. La aplicación se diferenciará al ofrecer una interfaz amistosa y funcionalidades diseñadas específicamente para cubrir las necesidades de los usuarios, incluyendo la posibilidad de compartir notas con la comunidad. Esto permitirá a los usuarios destacar las suyas notas más relevantes y útiles para otros miembros, fomentando así un ambiente colaborativo y de intercambio de conocimientos.

Análisis DAFO:

- **Debilidades**: Recursos limitados para la promoción y el desarrollo a largo plazo. Dependencia de financiamiento externo para expansión y mantenimiento.
- **Amenazas**: Competencia de grandes empresas establecidad. Posible falta de adopción por parte de los usuarios
- **Fortalezas**: Interfaz amigable y funcionalidades diseñadas para la colaboración comunitaria. Posibilidad de expandir el entorno gracias al desarrollo de una API. Modelo de negocio Freemium que permite acceso gratuito a las funciones básicas.
- **Oportunidades**: Mercado creciente de herramientas de gestión de información y colaboración. Posibilidad de captar usuarios insatisfechos con aplicaciones complejas o poco centradas en la colaboración.

### 2.3- Segmento de clientes

El público objetivo incluye a estudiantes de todos los niveles educativos, profesores, profesionales y cualquier persona que necesite una herramienta eficiente para tomar notas y organizar información. Estos usuarios buscan una solución fácil de usar que les permita mejorar su productividad y eficiencia en la gestión de la información.

- **Estudiantes**: De todos los niveles educativos, desde secundaria hasta estudios superiores, que necesiten organizar sus notas y recursos de estudio
- **Profesores**: Que buscan herramientas para organizar sus clases, materiales educativos y compatir recursos con estudiantes y compañeros.
- **Entusiastas de la organización**: Personas interesadas en mejorar su organización personal y la gestión de información.

El perfil del cliente ideal es aquel que valora la **organización y la productividad**, está dispuesto a adoptar nuevas tecnologías para mejorar su eficiencia y aprecia la colaboración y el intercambio de conocimientos con otras personas. La aplicación se dirije especialmente a personas que desean **simplificar** su gestión de notas y beneficiarse de un entorno colaborativo.

#### 2.4- Competencia

Estas son algunas de las principales empresas competidoras en el mercado de las aplicaciones de gestión de notas:

- **Evernote**:
  - Aplicación de notas y de organización personal con funcionalidades avanzadas como recorte de contenido web, sincronización en múltiples dispositivos y etiquetado de notas.
  - Fortalezas: Gran base de usuarios, integración con múltiples plataformas y herramientas de terceros, amplia gama de funcionalidades
  - Debilidades: Interfaz compleja para nuevos usuarios, modelo de negocio basado en subscripciones que puede resultar costoso.
- **OneNote**:
  - Aplicación de notas de Microsoft integrada en el ecosistema Office 365, que permite crear, organizar y compartir notas.
  - Fortalezas: Integración total con otras herramientas de Microsoft, disponibilidad en múltiples plataformas, funcionalidad avanzada.
  - Debilidades: Complejidad en la interfaz, dependencia del ecosistema de Microsoft para obtener todas las funcionalidades.
- **Google Keep**:
  - Aplicación de notas simple e intuitiva de Google que permite crear notas rápidas, listas y recordatorios.
  - Fortalezas: Interfaz amigable y fácil de usar, integración con otros servicios de Google, gratuito.
  - Debilidades: Funcionalidad limitada en comparación con otras aplicaciones más avanzadas, menos adecuada para usuarios avanzados
- **Notion**:
  - Plataforma de productividad y colaboración que permite crear notas, bases de datos, listas de tareas, etc.
  - Fortalezas: Alta flexibilidad y personalización, gran variedad de funcionalidades, integración con múltiples herramientas.
  - Debilidades: Curva de aprendizaje elevada, puede resultar compleja para usuarios nuevos, coste de subscripción elevado

#### 2.5- Propuesta de Valor

La aplicación ofrece una solución integral para la gestión de notas y la organización personal, destacándose por su interfaz amigable y simplificada, así como por sus funcionalidades de colaboración comunitaria. Permite a los usuarios crear, organizar y compartir sus notas, facilitando el intercambio de conocimientos y mejorando la productividad.

Las principales necesidades que cubre la aplicación son:

- Mejorar la organización y gestión de información personal y educativa.
- Facilitar la colaboración y el intercambio de conocimientos entre usuarios.
- Proporcionar una herramienta sencilla e intuitiva para la toma de notas y la síntesis de información.

Los usuarios deberían elegir esta aplicación porque ofrece una combinación única de facilidad de uso y funcionalidades de colaboración que otras aplicaciones no proporcionan. Además, el modelo de negocio freemium permite a los usuarios acceder a las funciones básicas de forma gratuita, con la opción de actualizar a características premium a un costo accesible. Este enfoque garantiza que tanto los usuarios casuales como los avanzados encuentren valor en la aplicación, adaptándose a sus necesidades específicas y potenciando su productividad y eficiencia.

#### 2.6- Forma jurídica

La forma jurídica elegida para el proyecto es la de autónomo. Esta elección se basa en varios factores. 

La simplicidad de y rapidez en la contitución, hacen que el proceso de alta como autónomo sea más sencillo y rápido en comparación con la consitución de una sociedad. Además, los costes reducidos son un factor importante, ya que no hay cotes iniciales aosciados a la creación de una empresa, como el capital inicial. Esto permite reducir los gatos iniciales y centrarse en los costes operativos y de desarrollo del proyecto. 

La flexibilidad en la gestión es otra ventaja significativa, ya que la forma de autónomo permite una mayor flexibilidad en la toma de decisiones y en la gestión diaria del proyecto, sin la necesidad de establecer órganos de gobierno o estatutos complejos. 

La fiscalidad más sencilla también es un aspecto relevante, ya que la gestión fiscal y contable como autónomo es menos compleja que la de una sociedad, lo que facilita el cumplimiento de las obligaciones fiscales y reduce la necesidad de contratar servicios externos de contabilidad. 

Además, la compatibilidad con ayudas y subvenciones es un beneficio clave, ya que existen numerosas ayudas y subvenciones destinadas a autónomos que pueden ser aprovechadas para el desarrollo del proyecto, así como bonificaciones en las cotizaciones a la seguridad social durante los primeros años de actividad.

#### 2.7- Inversiones

Para llevar a cabo el proyecto durante el primer año, serán necesarios las siguientes inversiones:

- Ordenadores y dispositivos: 700€
- Suministros: Hasta 400€

##### 2.7.1- Costes

- Costes fijos
  - Salario bruto 14.000€
  - Servidores e infraestructuras: Entre 120€ y 130€
  - Nombre de dominio: Entre 10€ y 20€
  - Certificado SSL: Hasta 50€
  - Servicio de monitoreo: Hasta 200€
- Costes variables
  - Marketing y publicidad: 2.000€
  - Otros gastos operativos: 500€

| Costes | Anual en euros |
|--------|-------|
| Inversiones | 1.100 |
| C. Fijos | 14.400 |
| C. Variables | 2.500 |
| Total | 18.500 |

##### 2.7.2- Ingresos

La estructura de ingresos y los beneficios esperados para el primer año de actividad se estiman basados en un modelo Freemium que combina funcionalidades gratuitas con características premium de pago. Se estima captar 3.000 usuarios en el primer año, de los cuales un 10% optará por las características premium.

Ingresos por subscripción premium:

- Número de usuarios premium: 300
- Precio de la subscripción anual: 50€
- Ingresos totales por subscripción: 15.000€

En total, los ingresos estimados para el primer año son de aproximadamente 15.000 €, lo que dejará un déficit inicial de 3.500€, que deberá ser cubierto mediante inversión inicial, financiación externa o posibles ayudas públicas.

##### 2.7.3- Beneficios

Dado el costo inicial y los ingresos estimados, no se espera obtener beneficios netos en el primer año de actividad. El déficit estimado de 3.500€ deberá ser cubierto a través de fuentes de financiación externa y ayudas. La previsión a largo plazo es que, con el crecimiento de la base de usuarios y el incremento de los ingresos por suscripción, el proyecto comience a generar beneficios netos en los próximos años.

De todas formas, se ha calculado que se necesitarían al menos 70 subscripciones adicionales (370 total) para llegar a la rentabilidad en el primer año.

#### 2.8- Viabilidad

##### 2.8.1- Viabilidad técnica

**Recursos humanos y medios de producción**: Se cuenta con los recursos humanos necesarios para llevar a cabo el desarrollo y mantenimiento de la aplicación web y su posterior despliegue. Al manetener la aplicación en funcionamiento después del período inicial de despliegue, se requerirá una evaluación adicional de los recursos necesarios, debido a que podría ser necesario actualizar o ampliar la infraestructura tecnológica.

**Impedimentos técnicos**: A priori, no se identifican impedimentos técnicos significativos que puedan dificultar el proceso produtivo. Las tecnologías escogidas han sido y están constamente siendo estudiadas para el correcto uso de las mismas.

##### 2.8.2- Viabilidad económica

Se estima que los costes asociados al desarrollo inicial de la aplicación durante los tres meses previstos serán cubiertos por los recursos personales disponibles.

El total estimado de costes anuales está estimado sobre 18.500€, dependiendo de las necesidades específicas de la aplicación (al volumen de usuarios) podría aumentar o disminuir. Se evaluará de que los ingresos generados por la aplicación, sean suficientes para cubrir estos costes operativos y garantizar la viabilidad económica del proyecto a largo plazo. En caso contrario, se tomarán medidas para ajustar la estrategia de negocio y garantizar la sostenibilidad del proyecto.

<img width="649" alt="image" src="https://github.com/tianqueal/Proxecto-DAW-23-24/assets/132884719/d680a064-9545-4862-80f6-3be0ea9a4a21">

##### 2.8.3- Conclusión

El análisis de viabilidad técnica y económica demuestra que el proyecto es factible tanto desde el punto de vista tecnológico cómo financiero. Se cuentan con las habilidades y recursos necesarios para desarrollar y mantener la aplicación, y el análisis financiero indica que, aunque habrá un déficit inicial, las previsiones de ingresos y la captación de financiación externa permitirán alcanzar la viabilidad a medio plazo. La estrategia de marketing y distribución también está diseñada para atraer y retener usuarios, lo que contribuirá al éxito del proyecto.

## 3- Requerimientos técnicos

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

## 4- Planificación

| Fase                   | Fecha de inicio | Duración   | Descripción de tareas                                                          |
|------------------------|-----------------|------------|--------------------------------------------------------------------------------|
| Estudio preliminar     | 01/04/2024      | 2 semanas  | Investigación de aplicaciones similares, análisis de requisitos.               |
| Análisis               | 15/04/2024      | 1 semanas  | Identificación de funcionalidades, definición de objetivos.                    |
| Diseño                 | 22/04/2024      | 1 semanas  | Diseño de la interfaz de usuario, definición de la arquitectura.               |
| Codificación y pruebas | 29/04/2024      | 3 semanas  | Desarrollo del backend y frontend, implementación de funcionalidades, pruebas. |
| Evaluación y ajustes   | 20/05/2024      | 1 semana   | Revisión final del proyecto, corrección de errores.                            |
| Implantación           | 03/06/2024      | -          | Preparación para el lanzamiento, despliegue de la aplicación.                  |
