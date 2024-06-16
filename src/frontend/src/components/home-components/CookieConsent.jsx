import { useEffect, useState } from 'react'
import XMark from '../../assets/heroicons/solid/XMark'
import { Link } from 'react-router-dom'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    let idSetTimeout = null
    if (!consent) {
      setIsVisible(true)
      idSetTimeout = setTimeout(() => {
        handleAccept()
      }, 5 * 1000)
    }
    return () => clearTimeout(idSetTimeout)
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
  }

  if (!isVisible) {
    return null
  }

  return (
    <section
      id="cookies-with-stacked-buttons"
      className="fixed bottom-0 end-0 z-[9] mx-auto w-full p-6 sm:max-w-sm"
      role="dialog"
      aria-labelledby="cookie-settings-title"
    >
      <article className="rounded-xl bg-white/60 p-4 shadow-2xl backdrop-blur-lg dark:bg-neutral-900/60 dark:shadow-black/70">
        <header className="flex items-center justify-between gap-x-5 sm:gap-x-10">
          <h2
            id="cookie-settings-title"
            className="font-semibold text-gray-800 dark:text-white"
          >
            Configuración de cookies
          </h2>
          <button
            type="button"
            className="inline-flex rounded-full p-2 text-gray-500 hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50 dark:text-neutral-300 dark:hover:bg-neutral-800"
            onClick={() => setIsVisible(false)}
          >
            <span className="sr-only">Dismiss</span>
            <XMark className="size-6" aria-hidden="true" />
          </button>
        </header>
        <p className="mt-2 text-sm text-gray-800 dark:text-neutral-200">
          Usamos cookies para mejorar tu experiencia en nuestro sitio web y
          mientras navegas por este sitio, aceptas automáticamente el uso de
          cookies. Visita el apartado{' '}
          <Link
            to="/cookies"
            className="inline-flex items-center gap-x-1.5 font-medium text-blue-600 decoration-2 hover:underline dark:text-blue-500"
          >
            Política de cookies
          </Link>{' '}
          para obtener más información.
        </p>
      </article>
    </section>
  )
}
