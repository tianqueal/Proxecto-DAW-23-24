import { motion } from 'framer-motion'
import notes from '../data/notesCarousel.json'
import Slider from '../components/home-components/Slider'
import NoteCardSlider from '../components/home-components/NoteCardSlider'
import CustomLink from '../components/home-components/CustomLink'
import DiscordSection from '../components/home-components/DiscordSection'
import './Home.css'
import PreviewEditor from '../components/home-components/PreviewEditor'
import CookieConsent from '../components/home-components/CookieConsent'

export default function Home() {
  return (
    <main className="min-h-screen">
      <header
        className="mx-auto mt-24 flex flex-col justify-center text-center sm:max-w-xl md:w-screen md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl"
        aria-labelledby="main-heading"
      >
        <motion.h1
          id="main-heading"
          className="text-4xl font-bold text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Más que organización,{' '}
          <motion.span
            className="gradient__green"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          >
            es simplicidad
          </motion.span>
        </motion.h1>
        <motion.h2
          className="mt-4 text-lg text-gray-600 dark:text-gray-300 sm:text-xl lg:text-2xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Descubre una nueva forma de alcanzar tus metas
        </motion.h2>
        <motion.section
          className="mt-8 flex flex-col justify-center gap-4 px-2 md:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 6 }}
          role="navigation"
        >
          <CustomLink
            to="/register"
            className="bg-blue-600  text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            text="Empieza ahora"
          />
          <CustomLink
            to="/community"
            className="bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            text="Ver la comunidad"
          />
        </motion.section>
      </header>
      <PreviewEditor />
      {/* md:rounded-tr-xl md:rounded-tl-xl */}
      <section className="mt-20 bg-black py-8 text-white">
        <h2 className="mb-3 text-center text-2xl font-bold leading-8">
          Una comunidad global
        </h2>
        <p className="mb-8 text-center text-lg font-extralight leading-8">
          Comparte tus ideas y aprende de los demás
        </p>
        <div className="flex flex-col">
          <Slider>
            {notes.slice(0, 20).map((note) => (
              <NoteCardSlider key={note.id} note={note} />
            ))}
          </Slider>
          <Slider rtl={true}>
            {notes.slice(20, 40).map((note) => (
              <NoteCardSlider key={note.id} note={note} />
            ))}
          </Slider>
          <Slider>
            {notes.slice(40, 55).map((note) => (
              <NoteCardSlider key={note.id} note={note} />
            ))}
          </Slider>
        </div>
      </section>
      <section className="bg-gray-900 py-8 text-center text-white">
        <DiscordSection />
      </section>
      <CookieConsent />
    </main>
  )
}
