import MasternoteMarkBot from '../../assets/discord-section/MasternoteMarkBot'
import CustomLink from './CustomLink'

const DiscordSection = () => {
  return (
    <>
      <section className="container mx-auto sm:max-w-xl md:w-screen md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
        <article className="flex flex-col items-center justify-center p-5">
          <h2 className="mb-3 text-center text-2xl font-bold leading-8">
            Expandiendo grandes ideas
          </h2>
          <p className="mb-8 max-w-3xl text-center text-lg font-extralight leading-8">
            MasterNote Bot te permite integrar las notas de la comunidad en
            otras plataformas comunitarias. Intégralo en tu servidor para
            descubrir nuevas posibilidades de interacción y colaboración.
          </p>
          <section className="relative mb-8 inline-block">
            <figure
              className="size-20 rounded-full border border-gray-500 p-3 border-opacity-70"
              aria-label="Logo del Bot de MasterNote"
            >
              <MasternoteMarkBot className="h-full w-full" />
            </figure>
            <span className="absolute bottom-0 right-0 block size-5 rounded-full bg-green-400"></span>
          </section>
          <CustomLink
            to="/discord"
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            text="Únete a Discord"
          />
        </article>
      </section>
    </>
  )
}

export default DiscordSection
