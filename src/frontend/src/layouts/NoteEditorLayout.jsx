import { EditorJsProvider } from '../context/EditorjsProvider'
import { Outlet } from 'react-router-dom'

export default function NoteEditorLayout() {
  return (
    <EditorJsProvider>
      <h1 className="mt-8 hidden" aria-hidden="true" role="Título">
        Visualizador de notas
      </h1>
      <Outlet />
    </EditorJsProvider>
  )
}
