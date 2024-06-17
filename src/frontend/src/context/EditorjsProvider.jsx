import {
  useRef,
  useState,
  createContext,
  useEffect,
  useMemo,
  /* useCallback, */
} from 'react'
import EditorJS from '@editorjs/editorjs'
import { EDITOR_JS_TOOLS } from '../helpers/editorTools'
import PropTypes from 'prop-types'
import debounce from 'just-debounce-it'
import useApi from '../hooks/useApi'
// import { useNavigate } from 'react-router-dom'
import { saveNoteData } from '../helpers/saveNoteData'

const EditorJsContext = createContext()

export const EditorJsProvider = ({ children }) => {
  const instance = useRef(null)
  // const navigate = useNavigate()
  // const [noteId, setNoteId] = useState(null)
  const noteIdRef = useRef(null)
  const [editorInitData, setEditorInitData] = useState({
    readOnly: false,
    autofocus: false,
    onSuccess: (newNoteId) => {
      if (noteIdRef.current) return
      noteIdRef.current = newNoteId
      const newUrl = `/notes/${newNoteId}`
      window.history.pushState({}, '', newUrl)
    },
  })
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)
  const [isNoteLoading, setIsNoteLoading] = useState(false)
  const { saveNoteToDatabase } = useApi()

  /* const debouncedSaveData = useCallback(
    debounce(
      () =>
        saveData({
          isSaving,
          instance,
          editorInitData,
          setIsSaving,
          saveNoteToDatabase,
          noteId,
          setError,
        }),
      2000,
    ),
    [saveData, noteId],
  ) */

  /* const debouncedSaveData = useMemo(
    () =>
      debounce(
        () =>
          saveData({
            isSaving,
            instance,
            editorInitData,
            setIsSaving,
            saveNoteToDatabase,
            noteId,
            setError,
          }),
        2000,
      ),
    [saveData, noteId],
  ) */

  useEffect(() => {
    if (!instance.current) {
      instance.current = new EditorJS({
        holder: 'editorjs',
        tools: EDITOR_JS_TOOLS,
        autofocus: editorInitData.autofocus,
        data: editorInitData.data,
        readOnly: editorInitData.readOnly,
        onChange: debounce(
          () =>
            saveNoteData({
              isSaving,
              instance,
              editorInitData,
              setIsSaving,
              saveNoteToDatabase,
              noteId: noteIdRef.current,
              setError,
            }),
          2000,
        ),
        placeholder: '¡Escribe algo increíble!',
        defaultBlock: null,
        logLevel: 'ERROR',
      })
    } else {
      instance.current.isReady.then(() => {
        instance.current.readOnly.toggle(editorInitData.readOnly)
        if (editorInitData.data) {
          instance.current.clear()
          instance.current.render(editorInitData.data)
        }
      })
    }

    return () => {
      /* debouncedSaveData.cancel() */
      if (instance.current && typeof instance.current.destroy === 'function') {
        instance.current.destroy()
        instance.current = null
      }
    }
  }, [editorInitData])

  const contextValue = useMemo(
    () => ({
      editorjs: instance.current,
      editorInitData,
      setEditorInitData,
      isSaving,
      setIsSaving,
      error,
      setError,
      noteId: noteIdRef.current,
      noteIdRef,
      setNoteId: (newNoteId) => {
        noteIdRef.current = newNoteId
      },
      isNoteLoading,
      setIsNoteLoading,
    }),
    [editorInitData, isSaving, error, isNoteLoading],
  )

  return (
    <EditorJsContext.Provider value={contextValue}>
      {children}
    </EditorJsContext.Provider>
  )
}

EditorJsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  noteId: PropTypes.string,
}

export default EditorJsContext
