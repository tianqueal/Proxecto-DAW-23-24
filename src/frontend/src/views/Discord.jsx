import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import { AppName, DiscordClientURL } from '../helpers/constants'
import { motion } from 'framer-motion'
import XMark from '../assets/heroicons/solid/XMark'
import DiscordMark from '../assets/discord-section/DiscordMark'
import MasternoteMarkBot from '../assets/discord-section/MasternoteMarkBot'

const Header = () => (
  <header role="banner" className="mb-8 text-center">
    <motion.h1
      className="text-3xl font-bold text-gray-900 dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      Te presentamos a {AppName} Bot
    </motion.h1>
  </header>
)

const Feature = ({ title, description }) => (
  <article
    role="article"
    className="rounded-lg bg-white p-6 shadow dark:bg-gray-800"
  >
    <motion.h3
      className="mb-2 text-xl font-semibold text-gray-800 dark:text-white"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {title}
    </motion.h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </article>
)

const Embed = () => (
  <section role="complementary" className="flex items-center gap-5">
    <DiscordMark className="size-14 fill-gray-800 dark:fill-white" />
    <XMark className="size-8" />
    <MasternoteMarkBot className="size-14" />
  </section>
)

Feature.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

const InviteSection = () => (
  <section role="complementary" className="mt-12 text-center">
    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
      Invita a {AppName} a tu servidor de Discord
    </h2>
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-8 flex flex-col items-center justify-between gap-8 md:flex-row"
    >
      <Embed />
      <Link
        to={DiscordClientURL()}
        target="_blank"
        className="inline-block rounded-md border bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        Únete a Discord
      </Link>
    </motion.div>
  </section>
)

export default function Discord() {
  return (
    <main className="flex flex-col items-center justify-center p-4 sm:p-8">
      <Header />
      <section
        role="region"
        aria-labelledby="features-heading"
        className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <h2 id="features-heading" className="sr-only">
          Características del Bot
        </h2>
        <Feature
          title="Visualiza las notas con otros usuarios"
          description="Comparte las notas de la comunidad con otros usuarios a través de servidores de Discord."
        />
        <Feature
          title="Lista las notas de la comunidad"
          description="Consulta las últimas notas de la comunidad de Discord en tiempo real con navegación intuitiva."
        />
        <Feature
          title="Encuentra aquello que buscas"
          description="Filtra las notas de la comunidad por contenido, temas e incluso por usuarios."
        />
        <Feature
          title="Integración nativa con Discord"
          description="Disfruta de una integración nativa con las últimas tecnologías de la API de Discord."
        />
        <Feature
          title="Compatible con Slash Commands"
          description="Usa los comandos de barra que te permiten interactuar con el bot de una manera más rápida y sencilla."
        />
        <Feature
          title="Vista rápida de las notas"
          description="Visualiza el contenido de una nota en Discord o en la web con un solo clic."
        />
      </section>
      <InviteSection />
    </main>
  )
}
