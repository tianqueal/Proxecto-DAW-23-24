import { useCallback, useEffect, useState } from 'react'
import useApi from '../hooks/useApi'
import useNotes from '../hooks/useNotes'
import { NoteFetchTypes } from '../helpers/constants'
import debounce from 'just-debounce-it'
import MagnifyingGlass from '../assets/heroicons/MagnifyingGlass'
import InputField from '../components/form/InputField'
import TopicSearch from '../components/notes/TopicSearch'
import NoteListSkeleton from '../components/skeletons/NoteListSkeleton'
import ErrorToastify from '../components/alerts/ErrorToastify'
import NoteList from '../components/notes/NoteList'
import NoteNotFound from '../components/notes/NoteNotFound'
import Button from '../components/form/Button'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { AnimatePresence, motion } from 'framer-motion'
import BouncyLoader from '../components/loaders/BouncyLoader'
import TopicSearchGeneric from '../components/notes/TopicSearchGeneric'

export default function MyNotes() {
  const {
    selectedTopics,
    topicName,
    searchTopicName,
    setSearchTopicName,
    setShowDropdown,
    deleteMyNote,
    publishNote,
    unpublishNote,
    getNoteTopics,
    updateNoteTopics,
  } = useApi()
  const { user } = useAuth({
    /* middleware: 'auth' */
  })
  const [noteContent, setNoteContent] = useState('')
  const [isActionNoteLoading, setIsActionNoteLoading] = useState(null)
  const [errorActionNote, setErrorActionNote] = useState(null)
  const [selectedNoteId, setSelectedNoteId] = useState(null)
  const [noteTopics, setNoteTopics] = useState([])
  const [showNoteTopicDropdown, setNoteTopicDropdown] = useState(false)
  const navigate = useNavigate()

  const {
    notes,
    lastNoteElementRef,
    setFilters,
    isError,
    isLoading,
    isValidating,
    mutateNotes,
  } = useNotes({
    type: NoteFetchTypes.MY_NOTES,
  })

  const debouncedUpdateFilters = useCallback(
    debounce((content, topics) => {
      setFilters({ content, topics })
    }, 500),
    [setFilters],
  )

  const handleContentChange = (event) => {
    const newContent = event.target.value
    setNoteContent(newContent)
  }

  const debounceTopicSearch = debounce(
    ({ value, search = setSearchTopicName, dropdown = setShowDropdown }) => {
      search(value)
      dropdown(true)
    },
    400,
  )

  const handleTopicSearchChange = () => {
    debounceTopicSearch({ value: topicName.current.value })
  }

  useEffect(() => {
    debouncedUpdateFilters(noteContent, selectedTopics)
  }, [noteContent, selectedTopics, debouncedUpdateFilters])

  const handleClickCreateNote = () => {
    navigate('/notes/create')
  }

  const handleNoteAction = async ({ event, action, noteId }) => {
    event.stopPropagation()
    switch (action) {
      case 'deleting':
        await handleDeleteNote(noteId)
        break
      case 'topics':
        await handleManageTopics(noteId)
        break
      case 'publish':
        await handlePublishNote(noteId)
        break
      case 'unpublish':
        await handleUnpublishNote(noteId)
        break
      default:
        break
    }
    debouncedUpdateFilters(noteContent, selectedTopics)
  }

  const handleDeleteNote = async (noteId) => {
    await deleteMyNote({
      id: noteId,
      setIsLoading: setIsActionNoteLoading,
      setError: setErrorActionNote,
    })
  }

  const handleManageTopics = async (noteId) => {
    setSelectedNoteId(noteId)
    const response = await getNoteTopics({
      noteId,
      setIsLoading: setIsActionNoteLoading,
      setError: setErrorActionNote,
    })
    setNoteTopics(response?.data?.topics)
  }

  const handlePublishNote = async (noteId) => {
    if (user.emailVerifiedAt === null) {
      ErrorToastify({
        message: 'Debes verificar tu correo electrónico para publicar notas',
        autoClose: 3000,
      })
      return
    }
    await publishNote({
      id: noteId,
      setIsLoading: setIsActionNoteLoading,
      setError: setErrorActionNote,
    })
  }

  const handleUnpublishNote = async (noteId) => {
    if (user.emailVerifiedAt === null) return
    await unpublishNote({
      id: noteId,
      setIsLoading: setIsActionNoteLoading,
      setError: setErrorActionNote,
    })
  }

  const handleSyncNoteTopics = async (newTopics) => {
    console.log('newTopics', newTopics)
    setNoteTopics(newTopics)
    await updateNoteTopics({
      noteId: selectedNoteId,
      topics: Object.values(newTopics).map((topic) => topic.id),
      setIsLoading: setIsActionNoteLoading,
      setError: setErrorActionNote,
    })
    await mutateNotes()
  }

  const handleSearchTopicChange = (event) => {
    debounceTopicSearch({
      value: event.target.value,
      search: setSearchTopicName,
      dropdown: setNoteTopicDropdown,
    })
  }

  const handleSetShowDropdown = (show) => {
    setNoteTopicDropdown(show)
  }

  const showNoteInfo =
    noteContent || selectedTopics.length > 0 ? (
      <NoteNotFound />
    ) : (
      <span className="text-xl font-semibold">¡Crea tu primera nota!</span>
    )

  return (
    <>
      <header className="mt-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Mis notas</h1>
        <Button
          type="button"
          onClick={handleClickCreateNote}
          className="bg-yellow-500 ring-yellow-600 hover:bg-yellow-600 focus:bg-yellow-600 dark:bg-yellow-500 dark:text-slate-900 dark:hover:bg-yellow-600 dark:focus:bg-yellow-900"
          text="Crear una nota"
        />
      </header>

      <div className="my-8 flex flex-col items-center md:flex-row md:items-start md:justify-between">
        <label className="flex max-w-56 items-center gap-3" htmlFor="content">
          {
            <span className="hidden" aria-hidden="true">
              Buscar por contenido
            </span>
          }
          <MagnifyingGlass customClasses={'w-5 h-5'} />
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
      {!isLoading &&
        !isError &&
        !isValidating &&
        notes?.length === 0 &&
        showNoteInfo}
      {!isLoading && notes && notes.length > 0 && (
        <NoteList
          notes={notes}
          lastNoteElementRef={lastNoteElementRef}
          handleActionsNote={handleNoteAction}
          isActionNoteLoading={isActionNoteLoading}
          errorActionNote={errorActionNote}
        />
      )}
      {(isLoading || isError || isValidating) && !notes?.length && (
        <NoteListSkeleton />
      )}
      <AnimatePresence>
        {selectedNoteId && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="mx-auto h-60 w-11/12 rounded-lg bg-white p-4 shadow-md dark:bg-neutral-900 md:w-2/4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <motion.section>
                <header className="flex items-center justify-between">
                  <motion.h2 className="mb-2 text-xl font-bold text-emerald-600 dark:text-emerald-500">
                    Temas de la nota
                  </motion.h2>
                  <Button
                    type="button"
                    onClick={() => setSelectedNoteId(null)}
                    text="Cerrar"
                    className="bg-red-500 px-2 py-1 text-center text-white"
                  />
                </header>
                <section className="mt-5 flex items-start justify-center">
                  {isActionNoteLoading && !errorActionNote && <BouncyLoader />}
                  {!isActionNoteLoading && noteTopics && (
                    <section className="flex w-full items-start justify-between">
                      <TopicSearchGeneric
                        onSelectTopic={handleSyncNoteTopics}
                        onRemoveTopic={handleSyncNoteTopics}
                        onSearchChange={handleSearchTopicChange}
                        selectedTopics={noteTopics}
                        searchTopicName={searchTopicName}
                        showDropdown={showNoteTopicDropdown}
                        setShowDropdown={handleSetShowDropdown}
                      />
                    </section>
                  )}
                </section>
              </motion.section>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
