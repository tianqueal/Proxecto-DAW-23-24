# Estándares y autoformateadores

## PSR-12

PSR-12 es una guía de estilo de código y una especificación de estándares de codificación para PHP, desarrollada por
PHP Framework Interop Group (PHP-FIG). PSR son las siglas de PHP Standard Recommendation.

El objetivo de PSR-12 es proporcionar un conjunto de reglas de codificación estándar para PHP que promuevan la legibilidad
y la coherencia del código en diferentes proyectos y equipos. Algunas de las reglas en PSR-12 incluyen cómo deben formatearse
los espacios en blanco, cómo deben nombrarse las variables y las clases, cómo deben organizarse los archivos y las clases, entre otras cosas.

El código del back-end está verificado y cumple con los estándares mencionados.

<img
  src="https://github.com/tianqueal/Proxecto-DAW-Borrador/assets/132884719/80e1785c-1ebf-4f9f-b520-ee5574fec3c1"
  width="400px"
  alt="PHP FIG Logo"
  title="PHP FIG Logo"
/>

## ESLint + JSX A11y

En el desarrollo de React, aunque no existen reglas estrictas para el estilo de código, se han adoptado ciertos estándares ampliamente
reconocidos para garantizar la calidad y la accesibilidad del código.

ESLint es una herramienta de linting para JavaScript que se utiliza para identificar y reportar patrones en el código ECMAScript/JavaScript
que podrían llevar a errores o inconsistencias. ESLint es altamente personalizable, permitiendo a los desarrolladores activar o desactivar 
reglas específicas según las necesidades de su proyecto.

JSX A11y es un plugin de ESLint que se utiliza específicamente para mejorar la accesibilidad en el código JSX de React.
Este plugin incluye una serie de reglas que ayudan a identificar y corregir posibles problemas de accesibilidad.

Además de ESLint y JSX A11y, existen otros estándares de estilo de código como Standard y Airbnb. Sin embargo, la elección de las reglas
a seguir depende en gran medida de las necesidades específicas de cada proyecto y las preferencias del equipo de desarrollo.
En este proyecto, se ha optado por utilizar esta combinación para garantizar un código limpio, accesible y de alta calidad.

<img
  src="https://github.com/tianqueal/Proxecto-DAW-Borrador/assets/132884719/bebed28d-6f80-44f0-87c7-4f8d4faa2d98"
  width="500px"
  alt="ESLint and React Logos"
  title="ESLint and React Logos"
/>

## Prettier TailwindCSS Plugin

Este plugin mejora la compatibilidad entre Prettier y Tailwind CSS. Prettier puede formatear el código que utiliza las clases de utilidad 
de Tailwind CSS de manera efectiva. Esto asegura que el formateo de código de Prettier y las utilidades de diseño de Tailwind CSS trabajen en
armonía, mejorando la legibilidad del código y manteniendo la funcionalidad de Tailwind CSS intacta.

<img
  src="https://github.com/tianqueal/Proxecto-DAW-Borrador/assets/132884719/f280a354-5f9a-4404-8fdb-808ba5516a99"
  width="500px"
  alt="Prettier TailwindCSS Class Sorting"
  title="Prettier TailwindCSS Class Sorting"
/>

## WCAG AA

Las WCAG (Web Content Accessibility Guidelines) son un conjunto de directrices diseñadas para hacer el contenido web más accesible para todas las personas, incluidas aquellas con discapacidades. El nivel AA de las WCAG es uno de los tres niveles de conformidad, que garantiza una accesibilidad significativa sin ser demasiado restrictivo para el diseño.

El nivel AA se centra en mejorar la accesibilidad en áreas clave como el contraste de colores, la navegación del sitio, y la funcionalidad del contenido sin depender exclusivamente de elementos visuales. Por ejemplo, asegura que el texto tenga un contraste suficiente con el fondo para que sea legible para personas con baja visión, y que la navegación del sitio sea clara y operable usando tanto el teclado como tecnologías asistivas.

Cumplir con el nivel AA de las WCAG no solo es un imperativo ético, sino también legal en muchos países. Esto asegura que el proyecto sea accesible para una mayor audiencia, proporcionando una experiencia inclusiva y equitativa para todos los usuarios.

<img
  src="https://github.com/tianqueal/Proxecto-DAW-Borrador/assets/132884719/8872ca6b-7a0e-4588-820a-910418d31429"
  width="300px"
  alt="W3C WCAG AA"
  title="W3C WCAG AA"
/>

# Referencias

- [GitHub ESLint Puglin JSX A11y: Instalación y documentación del plugin](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
- [PHP-FIG PSR-12: Estándar documentado](https://www.php-fig.org/psr/psr-12/)
- [McLibre PHP CS Fixer: Reglas y apartados del estándar](https://www.mclibre.org/consultar/php/otros/vsc-php-cs-fixer.html)
- [GitHub PHP CS Fixer: Instalación y documentación de la herramienta que facilita la verificación del estándar en el proyecto de manera local](https://github.com/PHP-CS-Fixer/PHP-CS-Fixer)
- [TailwindCSS: Inicio rápido del formateador automático de clases](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)
- [W3C WCAG2AA](https://www.w3.org/WAI/WCAG2AA-Conformance)
