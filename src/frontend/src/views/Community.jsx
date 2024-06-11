import { useCallback, useEffect, useState } from 'react'
import NoteList from '../components/notes/NoteList'
import TopicSearch from '../components/notes/TopicSearch'
import debounce from 'just-debounce-it'
import MagnifyingGlass from '../assets/heroicons/solid/MagnifyingGlass'
import InputField from '../components/form/InputField'
import useApi from '../hooks/useApi'
import NoteListSkeleton from '../components/skeletons/NoteListSkeleton'
import useNotes from '../hooks/useNotes'
import { NoteFetchTypes } from '../helpers/constants'
import NoteNotFound from '../components/notes/NoteNotFound'

export default function Community() {
  const { selectedTopics, topicName, setSearchTopicName, setShowDropdown } =
    useApi()
  const [noteContent, setNoteContent] = useState('')

  const {
    notes,
    lastNoteElementRef,
    setFilters,
    isError,
    isLoading,
    isValidating,
  } = useNotes({
    type: NoteFetchTypes.COMMUNITY_NOTES,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateFilters = useCallback(
    debounce((content, topics) => {
      setFilters({ content, topics })
    }, 500),
    [setFilters],
  )

  const handleContentChange = (event) => {
    const newContent = event.target.value
    setNoteContent(newContent)
    updateFilters(newContent, selectedTopics)
  }

  const debounceTopicSearch = debounce((value) => {
    setSearchTopicName(value)
    setShowDropdown(true)
  }, 400)

  const handleTopicSearchChange = () => {
    debounceTopicSearch(topicName.current.value)
  }

  useEffect(() => {
    updateFilters(noteContent, selectedTopics)
  }, [selectedTopics, noteContent, updateFilters])

  return (
    <>
      <h1 className="mt-8 text-3xl font-bold">Notas de la comunidad</h1>

      <div className="my-8 flex flex-col items-center md:flex-row md:items-start md:justify-between">
        <label className="flex max-w-56 items-center gap-3" htmlFor="content">
          {
            <span className="hidden" aria-hidden="true">
              Buscar por contenido
            </span>
          }
          <MagnifyingGlass className="size-5" />
          <InputField
            id="content"
            type="text"
            name="content"
            value={noteContent}
            placeholder="Buscar por contenido"
            onChange={handleContentChange}
          />
        </label>

        <div className="flex flex-col items-center md:items-end">
          <TopicSearch onChange={handleTopicSearchChange} />
        </div>
      </div>
      {!isLoading && !isError && !isValidating && notes?.length === 0 && (
        <NoteNotFound />
      )}
      {!isLoading && notes && notes.length > 0 && (
        <NoteList notes={notes} lastNoteElementRef={lastNoteElementRef} />
      )}
      {(isLoading || isError || isValidating) && !notes?.length && (
        <NoteListSkeleton />
      )}
    </>
  )
}
