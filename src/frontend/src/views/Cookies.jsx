export default function Cookies() {
  return (
    <>
      <section className="my-8 rounded-md bg-white shadow-md p-8 dark:bg-neutral-800">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Política de Cookies
        </h1>
        <p className="mt-4 text-gray-800 dark:text-neutral-200">
          Nuestro sitio web utiliza cookies para mejorar la experiencia del
          usuario y analizar el tráfico de la web. Las cookies son pequeños
          archivos de texto que se almacenan en tu dispositivo cuando visitas
          nuestro sitio.
        </p>
        <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
          Tipos de Cookies
        </h3>
        <ul className="mt-2 list-disc pl-6 text-gray-800 dark:text-neutral-200">
          <li>
            <strong>Cookies esenciales:</strong> Necesarias para el
            funcionamiento del sitio web.
          </li>
          <li>
            <strong>Cookies de funcionalidad:</strong> Permiten recordar tus
            preferencias y proporcionar funciones mejoradas y personalizadas.
          </li>
        </ul>
        <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
          Gestión de Cookies
        </h3>
        <p className="mt-2 text-gray-800 dark:text-neutral-200">
          Puedes controlar y/o eliminar las cookies como desees. Para más
          información, visita{' '}
          <a
            href="http://www.aboutcookies.org"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            www.aboutcookies.org
          </a>
          . Puedes eliminar todas las cookies que ya están en tu ordenador y
          configurar la mayoría de los navegadores para impedir que se coloquen.
          Sin embargo, si haces esto, es posible que tengas que ajustar
          manualmente algunas preferencias cada vez que visites un sitio y
          algunos servicios y funcionalidades pueden no funcionar.
        </p>
        <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
          Cambios en la Política de Cookies
        </h3>
        <p className="mt-2 text-gray-800 dark:text-neutral-200">
          Podemos actualizar esta Política de Cookies de vez en cuando para
          reflejar cambios en nuestras prácticas y servicios. Te notificaremos
          sobre cualquier cambio publicando la nueva política en nuestro sitio
          web. Te recomendamos revisar esta página periódicamente para estar
          informado sobre nuestra gestión de cookies.
        </p>
        <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
          Contacto
        </h3>
        <p className="mt-2 text-gray-800 dark:text-neutral-200">
          Si tienes alguna pregunta sobre nuestra política de cookies, por favor{' '}
          <a
            href="mailto:masternote@alwaysdata.net"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            contáctanos
          </a>
          .
        </p>
      </section>
    </>
  )
}
