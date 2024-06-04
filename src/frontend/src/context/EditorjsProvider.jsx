import {
  useRef,
  useState,
  createContext,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import EditorJS from '@editorjs/editorjs'
import { EDITOR_JS_TOOLS } from '../helpers/editorTools'
import PropTypes from 'prop-types'
import debounce from 'just-debounce-it'
import useApi from '../hooks/useApi'
import { useNavigate } from 'react-router-dom'

const EditorJsContext = createContext()

export const EditorJsProvider = ({ children }) => {
  const instance = useRef(null)
  const navigate = useNavigate()
  const [editorInitData, setEditorInitData] = useState({
    readOnly: false,
    autofocus: false,
    onSuccess: (newNoteId) => {
      navigate(`/notes/${newNoteId}`)
    },
  })
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)
  const [noteId, setNoteId] = useState(null)
  const [isNoteLoading, setIsNoteLoading] = useState(false)
  const { saveNoteToDatabase } = useApi()

  const saveData = useCallback(async () => {
    if (isSaving || !instance.current || editorInitData.readOnly) {
      return
    }
    if (instance.current && !editorInitData.readOnly) {
      setIsSaving(true)

      try {
        const outputData = await instance.current.save()
        if (
          !outputData ||
          !outputData.blocks ||
          outputData.blocks.length === 0
        ) {
          setIsSaving(false)
          return
        }

        await saveNoteToDatabase({
          noteId,
          data: outputData,
          setError,
          onSuccess: editorInitData.onSuccess,
        })
      } catch (error) {
        console.error('Error: ', error)
        setError(error)
      } finally {
        setIsSaving(false)
      }
    }
  }, [editorInitData, noteId, saveNoteToDatabase, isSaving])

  const debouncedSaveData = debounce(saveData, 2000)

  useEffect(() => {
    if (!instance.current) {
      instance.current = new EditorJS({
        holder: 'editorjs',
        tools: EDITOR_JS_TOOLS,
        autofocus: editorInitData.autofocus,
        data: editorInitData.data,
        readOnly: editorInitData.readOnly,
        onChange: debouncedSaveData,
        placeholder: '¡Escribe algo increíble!',
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
      debouncedSaveData.cancel()
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
      setNoteId,
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
