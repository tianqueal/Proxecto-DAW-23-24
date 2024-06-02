import { PropTypes } from 'prop-types'
import CubeLoader from '../loaders/CubeLoader'
import { useEffect } from 'react'
import ErrorToastify from '../alerts/ErrorToastify'
import useNote from '../../hooks/useNote'
import DisplayEditor from './DisplayEditor'
import useEditorjs from '../../hooks/useEditorjs'
import { useNavigate } from 'react-router-dom'

export default function ViewNote({ noteId }) {
  const { setIsNoteLoading } = useEditorjs()
  const { currentNote, isLoading, isError, isOwner, isAuthenticated } = useNote(
    {
      noteId,
      setIsNoteLoading,
    },
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && isError) {
      if (!isAuthenticated) {
        navigate('/not-found')
        return
      }
      ErrorToastify({ message: 'Error al cargar la nota', autoClose: 5000 })
    }
  }, [isLoading, isError, isAuthenticated, navigate])

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
