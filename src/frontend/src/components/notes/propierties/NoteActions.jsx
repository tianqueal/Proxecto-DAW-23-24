import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import ChevronLeft from '../../../assets/heroicons/ChevronLeft'
import Ping from '../../loaders/Ping'
import Hashtag from '../../../assets/heroicons/Hashtag'
import SignalSlash from '../../../assets/heroicons/SignalSlash'
import Signal from '../../../assets/heroicons/Signal'
import Trash from '../../../assets/heroicons/Trash'

const ChevronIcon = () => {
  return (
    <motion.figure className="hidden md:absolute md:right-0 md:top-1/2 md:block md:-translate-y-1/2">
      <ChevronLeft className="size-7 transform text-gray-500 transition-all dark:text-white md:size-6 md:text-opacity-50 md:opacity-100 md:group-hover:opacity-0" />
    </motion.figure>
  )
}

const LoadingIcon = () => {
  return (
    <motion.figure
      aria-label="Acción de la nota en proceso"
      whileHover={{ scale: 1.2 }}
    >
      <Ping className="size-5 transition-all hover:text-opacity-100 group-hover:opacity-100 md:size-6 md:text-opacity-50 md:opacity-0 md:group-hover:opacity-100" />
    </motion.figure>
  )
}

const ActionIcon = ({ ariaLabel, onClick, icon: Icon, colorClass }) => {
  return (
    <motion.figure
      aria-label={ariaLabel}
      whileHover={{ scale: 1.2 }}
      onClick={onClick}
    >
      <Icon
        className={`size-7 ${colorClass} transition-all hover:text-opacity-100 group-hover:opacity-100 dark:text-white md:size-6 md:text-opacity-50 md:opacity-0 md:group-hover:opacity-100`}
      />
    </motion.figure>
  )
}

ActionIcon.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.elementType.isRequired,
  colorClass: PropTypes.string.isRequired,
}

const NoteActionsContainer = ({
  note,
  handleActionsNote,
  isActionNoteLoading,
}) => {
  return (
    <motion.nav
      className="expand-on-hover group relative flex h-full w-6 flex-col items-center justify-evenly gap-2 rounded-lg p-2 transition-opacity md:absolute md:right-0 md:top-0 md:bg-gray-200 md:bg-opacity-20 md:opacity-100 dark:md:bg-gray-400 dark:md:bg-opacity-50 dark:md:opacity-20"
      aria-label="Acciones de la nota"
      whileHover={{ opacity: 1 }}
    >
      <ChevronIcon />
      {isActionNoteLoading === note.id ? (
        <LoadingIcon />
      ) : (
        <>
          <ActionIcon
            ariaLabel="Eliminar nota"
            onClick={(event) =>
              handleActionsNote({
                event,
                action: 'deleting',
                noteId: note.id,
              })
            }
            icon={Trash}
            colorClass="text-red-500"
          />
          <ActionIcon
            ariaLabel="Gestionar temas de la nota"
            onClick={(event) =>
              handleActionsNote({
                event,
                action: 'topics',
                noteId: note.id,
              })
            }
            icon={Hashtag}
            colorClass="text-emerald-500"
          />
          {note?.isPublic ? (
            <ActionIcon
              ariaLabel="Despublicar nota"
              onClick={(event) =>
                handleActionsNote({
                  event,
                  action: 'unpublish',
                  noteId: note.id,
                })
              }
              icon={SignalSlash}
              colorClass="text-amber-500"
            />
          ) : (
            <ActionIcon
              ariaLabel="Publicar nota"
              onClick={(event) =>
                handleActionsNote({
                  event,
                  action: 'publish',
                  noteId: note.id,
                })
              }
              icon={Signal}
              colorClass="text-blue-500"
            />
          )}
        </>
      )}
    </motion.nav>
  )
}

NoteActionsContainer.propTypes = {
  note: PropTypes.object.isRequired,
  handleActionsNote: PropTypes.func,
  isActionNoteLoading: PropTypes.number,
}

export default NoteActionsContainer
