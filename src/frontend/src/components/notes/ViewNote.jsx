import { PropTypes } from 'prop-types'
import CubeLoader from '../loaders/CubeLoader'
import { useEffect } from 'react'
import ErrorToastify from '../alerts/ErrorToastify'
import useNote from '../../hooks/useNote'
import DisplayEditor from './DisplayEditor'
import useEditorjs from '../../hooks/useEditorjs'

export default function ViewNote({ noteId }) {
  const { setIsNoteLoading } = useEditorjs()
  const { currentNote, isLoading, isError, isOwner } = useNote({
    noteId,
    setIsNoteLoading,
  })

  useEffect(() => {
    if (!isLoading && isError) {
      ErrorToastify({ message: 'Error al cargar la nota' })
    }
  }, [isLoading, isError])

  console.log('currentNote', currentNote)
  return (
    <>
      {(isLoading || isError || !currentNote) && (
        <CubeLoader className="bg-gray-800 dark:bg-white" />
      )}
      {!isLoading && !isError && currentNote && (
        <DisplayEditor
          data={JSON.parse(currentNote.content)}
          isOwner={isOwner}
        />
      )}
    </>
  )
}

ViewNote.propTypes = {
  noteId: PropTypes.string.isRequired,
}
