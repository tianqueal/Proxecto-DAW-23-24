export const saveNoteData = async ({
  isSaving,
  instance,
  editorInitData,
  setIsSaving,
  saveNoteToDatabase,
  noteId,
  setError,
}) => {
  if (isSaving || !instance.current || editorInitData.readOnly) {
    return
  }
  if (instance.current && !editorInitData.readOnly) {
    setIsSaving(true)

    try {
      const outputData = await instance.current.save()
      if (!outputData || !outputData.blocks || outputData.blocks.length === 0) {
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
      setError(error)
    } finally {
      setIsSaving(false)
    }
  }
}
