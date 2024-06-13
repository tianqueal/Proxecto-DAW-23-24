import { PropTypes } from 'prop-types'
import { motion } from 'framer-motion'
import NoteContent from '../notes/propierties/NoteContent'
import NoteDetails from '../notes/propierties/NoteDetails'

export default function NoteCardSlider({ note }) {
  const noteContent = JSON.parse(note.content).blocks
  return (
    <motion.article
      className="relative flex h-80 w-96 cursor-pointer justify-between gap-2 rounded-lg border p-4 shadow-lg transition-all hover:bg-gray-700 md:h-72"
      whileHover={{ scale: 1.02 }}
    >
      <section className="flex flex-col items-start gap-2">
        <NoteContent content={noteContent} />
        <section className="mt-4 flex w-full flex-col items-center justify-evenly gap-4 md:grid md:grid-cols-2 md:items-end">
          <NoteDetails
            user={note.user}
            createdAt={note.createdAt}
            updatedAt={note.updatedAt}
            className="text-gray-300"
          />
          <section className="flex flex-wrap justify-center gap-2 md:justify-end">
            {note.topics.map((topic) => (
              <span
                key={topic.id}
                className="max-h-full max-w-full rounded-lg bg-gray-200 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              >
                &#35;{topic.name.replace(/\s/g, '-')}
              </span>
            ))}
          </section>
        </section>
      </section>
    </motion.article>
  )
}

NoteCardSlider.propTypes = {
  note: PropTypes.object.isRequired,
}
