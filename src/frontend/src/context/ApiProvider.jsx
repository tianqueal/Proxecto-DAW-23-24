import PropTypes from 'prop-types'
import { createContext, useRef, useState, useMemo } from 'react'
import axiosInstance from '../config/axios'
import getTheme from '../helpers/getTheme'

const ApiContext = createContext()

export const ApiProvider = ({ children }) => {
  const [topics, setTopics] = useState([])
  const [noteContent, setNoteContent] = useState('')
  const [selectedTopics, setSelectedTopics] = useState([])
  const [searchTopicName, setSearchTopicName] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [isCurrentNoteOwner, setIsCurrentNoteOwner] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(() => {
    const filterTheme = getTheme({ theme: localStorage.getItem('theme') })
    document.body.classList.add(filterTheme)
    return filterTheme
  })

  const topicName = useRef('')

  const getCommunityNotes = useMemo(
    () =>
      async ({ page = 1, content, topics = [] }) => {
        try {
          const params = new URLSearchParams({ page })

          if (content) {
            params.append('content', content)
          }

          topics.forEach((topic) => {
            params.append('topicId[]', topic)
          })

          const { data } = await axiosInstance.get(
            `/public/communityNotes?${params.toString()}`,
          )
          return data
        } catch (error) {
          console.error(error)
        }
      },
    [],
  )

  const getCommunityNote = useMemo(
    () =>
      async ({ id }) => {
        try {
          const { data } = await axiosInstance.get(
            `/public/communityNotes/${id}`,
          )
          return data
        } catch (error) {
          console.error(error)
          return error
        }
      },
    [],
  )

  const getMyNotes = useMemo(
    () =>
      async ({ page = 1, content, topics = [] }) => {
        try {
          const params = new URLSearchParams({ page })

          if (content) {
            params.append('content', content)
          }

          topics.forEach((topic) => {
            params.append('topicId[]', topic)
          })
          const { data } = await axiosInstance.get(
            `/notes?${params.toString()}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            },
          )
          return data
        } catch (error) {
          console.error(error)
        }
      },
    [],
  )

  const getMyNote = useMemo(
    () =>
      async ({ id }) => {
        try {
          const { data } = await axiosInstance.get(`/notes/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          })
          return data
        } catch (error) {
          console.error(error)
          return error
        }
      },
    [],
  )

  const saveNoteToDatabase = useMemo(
    () =>
      async ({ noteId, data, setError, onSuccess }) => {
        try {
          let response
          if (noteId) {
            response = await axiosInstance.put(
              `/notes/${noteId}`,
              { content: JSON.stringify(data) },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
              },
            )
          } else {
            response = await axiosInstance.post(
              '/notes',
              { content: JSON.stringify(data) },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
              },
            )
            noteId = response.data.data.id
          }
          setError(null)
          if (onSuccess) onSuccess(noteId)
        } catch (error) {
          console.error(error)
          setError(error)
        }
      },
    [],
  )

  const deleteMyNote = useMemo(
    () =>
      async ({ id, setIsLoading, setError, onSuccess }) => {
        try {
          setIsLoading(id)
          const { data } = await axiosInstance.delete(`/notes/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          })
          setError(null)
          if (onSuccess) onSuccess({ message: data?.data?.message })
        } catch (error) {
          console.error(error)
          setError(error)
          return error
        } finally {
          setIsLoading(null)
        }
      },
    [],
  )

  const getLocalCommunityNotes = useMemo(
    () =>
      async ({ page = 1, content, topics = [] }) => {
        try {
          const params = new URLSearchParams({ page })

          if (content) {
            params.append('content', content)
          }

          topics.forEach((topic) => {
            params.append('topicId[]', topic)
          })

          const { data } = await fetch(
            `http://localhost:8000/public/communityNotes?${params.toString()}`,
          )
          const json = await data.json()
          return json
        } catch (error) {
          console.error(error)
        }
      },
    [],
  )

  const getTopics = useMemo(
    () =>
      async ({ page = 1 }) => {
        try {
          const params = new URLSearchParams({ page })

          if (searchTopicName) {
            params.append('name', searchTopicName)
          }

          const { data } = await axiosInstance.get(
            `/topics?${params.toString()}`,
          )
          return data
        } catch (error) {
          console.error(error)
        }
      },
    [searchTopicName],
  )

  const setTheme = useMemo(
    () => (theme) => {
      const filterTheme = getTheme({ theme })
      localStorage.setItem('theme', filterTheme)
      setCurrentTheme(filterTheme)
      document.body.classList.remove('light', 'dark')
      document.body.classList.add(filterTheme)
    },
    [setCurrentTheme],
  )

  const publishNote = useMemo(
    () =>
      async ({ id, setIsLoading, setError, onSuccess }) => {
        try {
          setIsLoading(id)
          const { data } = await axiosInstance.post(
            `/notes/${id}/publish`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            },
          )
          setError(null)
          if (onSuccess) onSuccess({ message: data?.data?.message })
        } catch (error) {
          console.error(error)
          setError(error)
        } finally {
          setIsLoading(null)
        }
      },
    [],
  )

  const unpublishNote = useMemo(
    () =>
      async ({ id, setIsLoading, setError, onSuccess }) => {
        try {
          setIsLoading(id)
          const { data } = await axiosInstance.post(
            `/notes/${id}/unpublish`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            },
          )
          setError(null)
          if (onSuccess) onSuccess({ message: data?.data?.message })
        } catch (error) {
          console.error(error)
          setError(error)
        } finally {
          setIsLoading(null)
        }
      },
    [],
  )

  /* const handleOpenNote = useMemo(
    () =>
      async ({ note }) => {
        try {
          setIsNoteLoading(true)
          if (note.user) {
            const noteData = await getCommunityNote({ id: note.id })
            return setCurrentNote(noteData)
          }
          const noteData = await getMyNote({ id: note.id })
          setCurrentNote(noteData)
        } catch (error) {
          console.error(error)
        }
        setIsNoteLoading(false)
      },
    [getMyNote, getCommunityNote],
  ) */

  const getNoteTopics = useMemo(
    () =>
      async ({ noteId, setIsLoading, setError }) => {
        try {
          setIsLoading(noteId)
          const { data } = await axiosInstance.get(`/notes/${noteId}/topics`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          })
          setIsLoading(null)
          setError(null)
          return data
        } catch (error) {
          console.error(error)
          setError(error)
          return error
        }
      },
    [],
  )

  const updateNoteTopics = useMemo(
    () =>
      async ({ noteId, topics, setIsLoading, setError }) => {
        try {
          setIsLoading(noteId)
          await axiosInstance.put(
            `/notes/${noteId}/topics`,
            { topics_ids: topics },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            },
          )
          setError(null)
        } catch (error) {
          console.error(error)
          console.error('Error al actualizar los temas')
          setError('Error al actualizar los temas')
        } finally {
          setIsLoading(null)
        }
      },
    [],
  )

  const getUsers = useMemo(
    () =>
      async ({ page = 1 }) => {
        try {
          const params = new URLSearchParams({ page })
          const { data } = await axiosInstance.get(
            `/admin/users?${params.toString()}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            },
          )
          return data
        } catch (error) {
          console.error(error)
        }
      },
    [],
  )

  const contextValue = useMemo(
    () => ({
      getCommunityNotes,
      getCommunityNote,
      getMyNotes,
      getLocalCommunityNotes,
      getTopics,
      topics,
      setTopics,
      noteContent,
      setNoteContent,
      selectedTopics,
      setSelectedTopics,
      searchTopicName,
      setSearchTopicName,
      showDropdown,
      setShowDropdown,
      topicName,
      getMyNote,
      modalOpen,
      setModalOpen,
      currentTheme,
      setTheme,
      isCurrentNoteOwner,
      setIsCurrentNoteOwner,
      saveNoteToDatabase,
      deleteMyNote,
      publishNote,
      unpublishNote,
      getNoteTopics,
      updateNoteTopics,
      getUsers,
    }),
    [
      getCommunityNotes,
      getCommunityNote,
      getMyNotes,
      getLocalCommunityNotes,
      getTopics,
      topics,
      noteContent,
      selectedTopics,
      searchTopicName,
      showDropdown,
      topicName,
      getMyNote,
      modalOpen,
      setModalOpen,
      currentTheme,
      setTheme,
      isCurrentNoteOwner,
      saveNoteToDatabase,
      deleteMyNote,
      publishNote,
      unpublishNote,
      getNoteTopics,
      updateNoteTopics,
      getUsers,
    ],
  )

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  )
}

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ApiContext
