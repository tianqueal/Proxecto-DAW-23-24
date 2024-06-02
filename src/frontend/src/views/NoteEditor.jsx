import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import useEditorjs from '../hooks/useEditorjs'
import CreateNote from '../components/notes/CreateNote'
import ViewNote from '../components/notes/ViewNote'
import ChevronLeft from '../assets/heroicons/ChevronLeft'
import BookOpen from '../assets/heroicons/BookOpen'
import ArrowPath from '../assets/heroicons/ArrowPath'
import ExclamationTriangle from '../assets/heroicons/ExclamationTriangle'
import Check from '../assets/heroicons/Check'
import PencilSquare from '../assets/heroicons/PencilSquare'
// import { resetScrollPosition } from '../helpers/resetScrollPosition'

const motionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export default function NoteEditor() {
  const { noteId } = useParams()
  const navigate = useNavigate()
  const {
    isSaving,
    error: isError,
    setNoteId,
    editorInitData,
    isNoteLoading,
  } = useEditorjs()

  const handleBack = () => {
    navigate(editorInitData?.readOnly ? -1 : '/my-notes')
    /* resetScrollPosition() */
  }

  useEffect(() => {
    if (noteId) {
      console.log('noteId !!!', noteId)
      setNoteId(noteId)
    }
  }, [])

  console.log('editorInitData !!!!', editorInitData)

  return (
    <>
      <section className="my-6 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Volver atrás"
          className="flex items-center gap-2 text-gray-700 transition-colors duration-300 hover:text-indigo-500 focus:text-indigo-500 focus:outline-none dark:text-gray-300 dark:hover:text-indigo-300 dark:focus:text-indigo-300"
        >
          <ChevronLeft className="size-8" aria-hidden="true" />
          <h2 className="text-xl font-semibold">Volver atrás</h2>
        </button>
        <section>
          <AnimatePresence>
            {isSaving && (
              <motion.figure
                {...motionProps}
                animate={{ ...motionProps.animate, rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowPath customClasses="size-8 text-gray-700 dark:text-gray-300" />
              </motion.figure>
            )}
            {!isSaving && isError && (
              <motion.figure
                {...motionProps}
                animate={{ ...motionProps.animate, x: [0, -5, 5, -5, 5, 0] }}
                transition={{ duration: 0.5, repeat: 0 }}
              >
                <ExclamationTriangle
                  customClasses="size-8 text-red-500 dark:text-red-400"
                  aria-label="Error"
                />
              </motion.figure>
            )}
            {!isSaving && !isError && !editorInitData?.readOnly && !noteId && (
              <motion.figure {...motionProps}>
                <PencilSquare
                  customClasses="size-8 text-yellow-500 dark:text-yellow-300"
                  aria-label="Escribe una nueva nota"
                />
              </motion.figure>
            )}
            {!isSaving &&
              !isError &&
              !isNoteLoading &&
              !editorInitData?.readOnly &&
              noteId && (
                <motion.figure {...motionProps}>
                  <Check
                    customClasses="size-8 text-green-500 dark:text-green-400"
                    aria-label="Guardado con éxito"
                  />
                </motion.figure>
              )}
            {!isSaving && !isError && editorInitData?.readOnly && (
              <motion.figure {...motionProps}>
                <BookOpen
                  customClasses="size-8 text-blue-500 dark:text-blue-400"
                  aria-label="Nota en modo lectura"
                />
              </motion.figure>
            )}
          </AnimatePresence>
        </section>
      </section>
      <section className="flex flex-col items-center justify-between">
        <section className="w-full">
          <div
            id="editorjs"
            className={`${isNoteLoading || isError ? 'hidden' : ''}`}
          ></div>
          {noteId ? <ViewNote noteId={noteId} /> : <CreateNote />}
        </section>
      </section>
    </>
  )
}
