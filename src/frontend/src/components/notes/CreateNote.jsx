import useEditorjs from '../../hooks/useEditorjs'
import DisplayEditor from './DisplayEditor'

export default function CreateNote() {
  const { noteIdRef } = useEditorjs()

  const onSuccess = (newNoteId) => {
    if (noteIdRef.current) return
    noteIdRef.current = newNoteId
    const newUrl = `/notes/${newNoteId}`
    window.history.pushState({}, '', newUrl)
  }
  return <DisplayEditor data={null} isOwner={true} onSuccess={onSuccess} />
}
