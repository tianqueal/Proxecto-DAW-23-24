import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import NoteContent from './propierties/NoteContent'
import NoteDetails from './propierties/NoteDetails'
import NoteActions from './propierties/NoteActions'
import './NoteCard.css'

const item = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -100 },
}

const NoteCard = forwardRef(
  ({ note, handleActionsNote, isActionNoteLoading }, ref) => {
    const navigate = useNavigate()

    const handleOnClick = () => {
      navigate(`/notes/${note.id}`)
    }

    const noteContent = JSON.parse(note.content).blocks

    return (
      <motion.article
        ref={ref}
        className="relative flex h-full w-full cursor-pointer justify-between gap-2 rounded-lg border p-4 shadow-lg transition-all hover:bg-slate-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        whileHover={{ scale: 1.02 }}
        variants={item}
        initial="hidden"
        animate="show"
        exit="exit"
        onClick={handleOnClick}
        role="link"
        aria-label="Navegar a la nota seleccionada"
      >
        <section className="flex flex-col items-start gap-2">
          <NoteContent content={noteContent} />
          <section className="mt-4 flex w-full flex-col items-center justify-evenly gap-4 md:grid md:grid-cols-2 md:items-end">
            <NoteDetails
              user={note.user}
              createdAt={note.createdAt}
              updatedAt={note.updatedAt}
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
        {!note.user && (
          <NoteActions
            note={note}
            handleActionsNote={handleActionsNote}
            isActionNoteLoading={isActionNoteLoading}
          />
        )}
      </motion.article>
    )
  },
)

NoteCard.displayName = 'NoteCard'

NoteCard.propTypes = {
  note: PropTypes.object.isRequired,
  handleActionsNote: PropTypes.func,
  isActionNoteLoading: PropTypes.number,
}

export default NoteCard
