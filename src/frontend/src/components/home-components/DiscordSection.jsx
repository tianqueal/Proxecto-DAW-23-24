import CustomLink from './CustomLink'

const DiscordSection = () => {
  return (
    <>
      <section className="container mx-auto sm:max-w-xl md:w-screen md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
        <article className="flex flex-col items-center justify-center">
          <h2 className="mb-3 text-center text-2xl font-bold leading-8">
            Expandiendo nuestras ideas
          </h2>
          <p className="mb-8 text-center text-lg font-extralight leading-8">
            Nuestro bot de Discord te permite integrar las notas de la comunidad
            en otras plataformas comunitarias. Intégralo en tu servidor para
            descubrir nuevas posibilidades de interacción y colaboración.
          </p>
          <CustomLink
            to="/discord"
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            text="Únete a Discord"
          />
        </article>
      </section>
    </>
  )
}

export default DiscordSection
