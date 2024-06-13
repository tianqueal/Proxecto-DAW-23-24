import { AppName, Language as LanguageConstant } from '../../helpers/constants'
import Language from '../../assets/heroicons/solid/Language'
import AtSymbol from '../../assets/heroicons/solid/AtSymbol'
import { Link } from 'react-router-dom'
import MasternoteLogo from '../../assets/MasternoteLogo'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black py-10 text-white" role="contentinfo">
      <section className="container mx-auto px-4">
        <section className="flex flex-col md:flex-row md:justify-between">
          <section className="mb-6 md:mb-0" aria-labelledby="about-heading">
            <article>
              <section className="flex items-center gap-2">
                <figure
                  className="size-8 rounded-lg bg-white p-1.5"
                  aria-label="Logo de Masternote"
                >
                  <MasternoteLogo className="h-full w-full" />
                </figure>
                <h2 id="about-heading" className="text-xl font-bold">
                  {AppName}
                </h2>
              </section>
              <p className="mt-2 max-w-xs text-sm text-gray-400">
                Proyecto web para la organización de notas y tareas personales.
              </p>
            </article>
            <article className="mt-4">
              <h2 className="text-xl font-bold">Idioma</h2>
              <label
                htmlFor="language"
                className="mt-2 inline-flex items-center gap-2"
              >
                <p aria-hidden="true" className="hidden">
                  Seleccionar idioma
                </p>
                <Language className="size-5" />
                <select
                  name="language"
                  id="language"
                  className="rounded-lg border-neutral-700 bg-neutral-900 px-2 py-2 text-sm text-neutral-400 placeholder-neutral-500 disabled:pointer-events-none disabled:opacity-50"
                  defaultValue={LanguageConstant.CURRENT}
                >
                  <option disabled>Seleccionar idioma</option>
                  <option defaultValue={LanguageConstant.ES}>Español</option>
                </select>
              </label>
            </article>
          </section>

          <nav className="mb-6 md:mb-0" aria-labelledby="quick-links-heading">
            <h2 id="quick-links-heading" className="text-xl font-bold">
              Enlaces Rápidos
            </h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:underline" aria-label="Inicio">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="community"
                  className="hover:underline"
                  aria-label="Comunidad"
                >
                  Comunidad
                </Link>
              </li>
              <li>
                <Link
                  to="discord"
                  className="hover:underline"
                  aria-label="Cliente Discord"
                >
                  Cliente Discord
                </Link>
              </li>
              <li>
                <Link
                  to="/my-notes"
                  className="hover:underline"
                  aria-label="Mis Notas"
                >
                  Mis Notas
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="hover:underline"
                  aria-label="Política de Cookies"
                >
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </nav>

          <address className="not-italic">
            <h2 className="text-xl font-bold" aria-labelledby="contact-heading">
              Contacto
            </h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-center gap-1">
                <AtSymbol className="size-5" aria-hidden="true" />
                <a
                  href="mailto:masternote@alwaysdata.net"
                  className="hover:underline"
                  aria-label="Correo Electrónico"
                >
                  masternote@alwaysdata.net
                </a>
              </li>
            </ul>
          </address>
        </section>
        <section className="mt-8 border-t border-gray-700 pt-6 text-center text-sm font-medium text-gray-400">
          <p>
            {currentYear} | {AppName} | MIT License
          </p>
        </section>
      </section>
    </footer>
  )
}
