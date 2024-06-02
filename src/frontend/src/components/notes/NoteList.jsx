import PropTypes from 'prop-types'
import NoteCard from './NoteCard'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const NoteList = ({
  notes,
  lastNoteElementRef,
  handleActionsNote,
  isActionNoteLoading,
}) => {
  return (
    <motion.div
      className="3xl:grid-cols-5 grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      /* version 1 className="flex flex-wrap gap-4 items-center justify-center" */
      /* version 2 className="grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" */
      variants={container}
      initial="hidden"
      animate="show"
    >
      {notes.map((note, index) => (
        <motion.div
          key={note.id}
          variants={item}
          className="flex h-full w-full justify-center"
        >
          <NoteCard
            handleActionsNote={handleActionsNote}
            ref={notes.length === index + 1 ? lastNoteElementRef : null}
            note={note}
            isActionNoteLoading={isActionNoteLoading}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  lastNoteElementRef: PropTypes.func,
  handleActionsNote: PropTypes.func,
  isActionNoteLoading: PropTypes.number,
  errorActionNote: PropTypes.any,
}

export default NoteList
