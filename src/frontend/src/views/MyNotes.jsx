import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import debounce from 'just-debounce-it'
import useApi from '../hooks/useApi'
import useAuth from '../hooks/useAuth'
import useNotes from '../hooks/useNotes'
import { NoteFetchTypes } from '../helpers/constants'
import MagnifyingGlass from '../assets/heroicons/solid/MagnifyingGlass'
import InputField from '../components/form/InputField'
import TopicSearch from '../components/notes/TopicSearch'
import NoteListSkeleton from '../components/skeletons/NoteListSkeleton'
import ErrorToastify from '../components/alerts/ErrorToastify'
import SuccessToastify from '../components/alerts/SuccessToastify'
import NoteList from '../components/notes/NoteList'
import NoteNotFound from '../components/notes/NoteNotFound'
import Button from '../components/form/Button'
import BouncyLoader from '../components/loaders/BouncyLoader'
import TopicSearchGeneric from '../components/notes/TopicSearchGeneric'
import SimpleModal from '../components/navigations/SimpleModal'
import FirstNoteContainer from '../components/notes/FirstNoteContainer'

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
    /* isValidating, */
    mutateNotes,
  } = useNotes({
    type: NoteFetchTypes.MY_NOTES,
  })

  const updateFilters = useCallback(
    (content, topics) => {
      return setFilters({ content, topics })
    },
    [setFilters],
  )

  const debouncedUpdateFilters = useMemo(
    () => debounce(updateFilters, 500),
    [updateFilters],
  )

  const debouncedUpdateFiltersRef = useRef(debouncedUpdateFilters)

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
    debouncedUpdateFiltersRef.current(noteContent, selectedTopics)
  }, [noteContent, selectedTopics])

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
    debouncedUpdateFiltersRef.current(noteContent, selectedTopics)
  }

  const handleDeleteNote = async (noteId) => {
    await deleteMyNote({
      id: noteId,
      setIsLoading: setIsActionNoteLoading,
      setError: setErrorActionNote,
      onSuccess: ({ message }) => {
        SuccessToastify({
          message,
        })
      },
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
      onSuccess: ({ message }) => {
        SuccessToastify({
          message,
        })
      },
    })
  }

  const handleUnpublishNote = async (noteId) => {
    if (user.emailVerifiedAt === null) return
    await unpublishNote({
      id: noteId,
      setIsLoading: setIsActionNoteLoading,
      setError: setErrorActionNote,
      onSuccess: ({ message }) => {
        SuccessToastify({
          message,
        })
      },
    })
  }

  const handleSyncNoteTopics = async (newTopics) => {
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

  const MyNotesEmptyResult = useCallback(() => {
    const userAccountCreatedToday =
      new Date(user.createdAt).toDateString() === new Date().toDateString()
    return userAccountCreatedToday ? <FirstNoteContainer /> : <NoteNotFound />
  }, [user])

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

      <section
        className="my-8 flex flex-col items-center gap-2 md:flex-row md:items-start md:justify-between"
        role="form"
      >
        <label className="flex max-w-56 items-center gap-3" htmlFor="content">
          <span className="hidden" aria-hidden="true">
            Buscar por contenido
          </span>

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

        <section
          className="flex flex-col items-center md:items-end"
          role="group"
        >
          <TopicSearch onChange={handleTopicSearchChange} />
        </section>
      </section>
      {!isLoading && !isError && notes?.length === 0 && <MyNotesEmptyResult />}
      {!isLoading && notes && notes.length > 0 && (
        <NoteList
          notes={notes}
          lastNoteElementRef={lastNoteElementRef}
          handleActionsNote={handleNoteAction}
          isActionNoteLoading={isActionNoteLoading}
          errorActionNote={errorActionNote}
        />
      )}
      {(isLoading || isError) && notes?.length !== 0 && <NoteListSkeleton />}
      <AnimatePresence>
        {selectedNoteId && (
          <SimpleModal
            title="Temas de la nota"
            handleOnClose={() => setSelectedNoteId(null)}
            className="h-auto w-11/12 md:h-1/5 md:w-2/4"
          >
            <section className="mt-5 flex items-start justify-center">
              {isActionNoteLoading && !errorActionNote && <BouncyLoader />}
              {!isActionNoteLoading && noteTopics && (
                <section className="flex w-full flex-col items-center justify-between gap-3 md:flex-row md:items-start">
                  <TopicSearchGeneric
                    onSelectTopic={handleSyncNoteTopics}
                    onRemoveTopic={handleSyncNoteTopics}
                    onSearchChange={handleSearchTopicChange}
                    selectedTopics={noteTopics}
                    searchTopicName={searchTopicName}
                    showDropdown={showNoteTopicDropdown}
                    setShowDropdown={handleSetShowDropdown}
                    identifier="note_topics"
                  />
                </section>
              )}
            </section>
          </SimpleModal>
        )}
      </AnimatePresence>
    </>
  )
}
