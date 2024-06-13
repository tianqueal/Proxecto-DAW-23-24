import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import useEditorjs from '../hooks/useEditorjs'
import CreateNote from '../components/notes/CreateNote'
import ViewNote from '../components/notes/ViewNote'
import BookOpen from '../assets/heroicons/solid/BookOpen'
import ArrowPath from '../assets/heroicons/solid/ArrowPath'
import ExclamationTriangle from '../assets/heroicons/solid/ExclamationTriangle'
import Check from '../assets/heroicons/solid/Check'
import PencilSquare from '../assets/heroicons/solid/PencilSquare'
import Chevron from '../assets/heroicons/solid/Chevron'

const motionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export default function NoteEditor() {
  const { noteId } = useParams()
  const {
    isSaving,
    error: isError,
    setNoteId,
    editorInitData,
    isNoteLoading,
  } = useEditorjs()

  useEffect(() => {
    if (noteId) {
      setNoteId(noteId)
    }
  }, [])

  return (
    <>
      <section className="my-6 flex items-center justify-between">
        <Link
          to={editorInitData?.readOnly ? '/community' : '/my-notes'}
          className="flex items-center gap-2 text-gray-700 transition-colors duration-300 hover:text-indigo-500 focus:text-indigo-500 focus:outline-none dark:text-gray-300 dark:hover:text-indigo-300 dark:focus:text-indigo-300"
          aria-label="Volver a las notas"
        >
          <Chevron className="size-6 -rotate-90" aria-hidden="true" />
          <h2 className="text-xl font-semibold">Volver atrás</h2>
        </Link>

        <section>
          <AnimatePresence>
            {isSaving && (
              <motion.figure
                {...motionProps}
                animate={{ ...motionProps.animate, rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
                aria-label="Guardando"
              >
                <ArrowPath className="size-8 text-gray-700 dark:text-gray-300" />
              </motion.figure>
            )}
            {!isSaving && isError && (
              <motion.figure
                {...motionProps}
                animate={{ ...motionProps.animate, x: [0, -5, 5, -5, 5, 0] }}
                transition={{ duration: 0.5, repeat: 0 }}
              >
                <ExclamationTriangle
                  className="size-8 text-red-500 dark:text-red-400"
                  aria-label="Error"
                />
              </motion.figure>
            )}
            {!isSaving && !isError && !editorInitData?.readOnly && !noteId && (
              <motion.figure {...motionProps}>
                <PencilSquare
                  className="size-8 text-yellow-500 dark:text-yellow-300"
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
                    className="size-8 text-green-500 dark:text-green-400"
                    aria-label="Guardado con éxito"
                  />
                </motion.figure>
              )}
            {!isSaving && !isError && editorInitData?.readOnly && (
              <motion.figure {...motionProps}>
                <BookOpen
                  className="size-8 text-blue-500 dark:text-blue-400"
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
