import Chevron from '../../assets/heroicons/solid/Chevron'
import Check from '../../assets/heroicons/solid/Check'

export default function PreviewEditorContent() {
  return (
    <article className="mt-8 flex flex-col items-center justify-between gap-8 md:flex-row">
      <section className="mx-auto w-full">
        <figure className="relative mx-auto h-[calc(100vh/1.8)] w-[calc(100vw/1.2)] rounded-[2rem] border border-gray-800 bg-gray-800 dark:border-slate-500 dark:bg-black dark:shadow-sm md:w-[80vw] lg:w-[60vw] 2xl:w-[40vw]">
          <div className="absolute inset-4 overflow-y-auto rounded-[1rem] bg-neutral-50 dark:bg-neutral-900">
            <div className="mx-auto w-full flex-1 p-4">
              <Header />
              <Content />
            </div>
          </div>
        </figure>
      </section>
    </article>
  )
}

function Header() {
  return (
    <section className="my-6 flex items-center justify-between">
      <span
        className="flex items-center gap-2 text-gray-700 transition-colors duration-300 hover:text-indigo-500 focus:text-indigo-500 focus:outline-none dark:text-gray-300 dark:hover:text-indigo-300 dark:focus:text-indigo-300"
        aria-label="Volver a las notas"
      >
        <Chevron className="size-6 -rotate-90" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Volver atrás</h2>
      </span>
      <section>
        <Check
          className="size-8 text-green-500 dark:text-green-400"
          aria-label="Guardado con éxito"
        />
      </section>
    </section>
  )
}

function Content() {
  return (
    <div className="mx-auto h-full w-full text-left md:w-3/5">
      <div className="h-full w-full p-4 text-gray-800 dark:text-gray-200">
        <h2 className="text-2xl font-bold">
          Lorem ipsum dolor sit amet consectetur.
        </h2>
        <p className="mt-2 text-lg">
          Lorem ipsum dolor sit amet consectetur adip elit. Voluptate, quod?
        </p>
        <p className="mt-2 text-lg">Lorem ipsum dolor sit amet consectetur.</p>
      </div>
    </div>
  )
}
