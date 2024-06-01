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
      console.log('onSuccess newNoteId !!! Navigate !!!: ', newNoteId)
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
      console.log('Saving data...')
      try {
        const outputData = await instance.current.save()
        if (
          !outputData ||
          !outputData.blocks ||
          outputData.blocks.length === 0
        ) {
          console.log('No data to save. Data not saved.', outputData)
          setIsSaving(false)
          return
        }
        console.log('Data: ', outputData)
        console.log('onSuccess editorInitData: ', editorInitData.onSuccess)
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
    } else {
      console.log('Editor is read-only. Data not saved.', {
        instance,
        editorInitData,
      })
    }
  }, [editorInitData, noteId, saveNoteToDatabase, isSaving])

  const debouncedSaveData = debounce(saveData, 2000)

  useEffect(() => {
    if (!instance.current) {
      console.log('Creating editor...')
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
      console.log('Editor already exists. Updating data...')
      instance.current.isReady.then(() => {
        instance.current.readOnly.toggle(editorInitData.readOnly)
        if (editorInitData.data) {
          console.log('Clearing editor and rendering new data...')
          instance.current.clear()
          instance.current.render(editorInitData.data)
        }
      })
    }

    return () => {
      debouncedSaveData.cancel()
      if (instance.current && typeof instance.current.destroy === 'function') {
        console.log('Destroying editor...', instance.current)
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
