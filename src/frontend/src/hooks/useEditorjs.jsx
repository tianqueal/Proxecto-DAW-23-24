import { useContext } from 'react'
import EditorJsContext from '../context/EditorjsProvider'

const useEditorjs = () => {
  return useContext(EditorJsContext)
}

export default useEditorjs
