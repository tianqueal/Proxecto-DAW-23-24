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
          return
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
          return
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
          return
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
          return
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
          return
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
          return
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
          return
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
          const params = new URLSearchParams({ page, perPage: 10 })
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
          return
        }
      },
    [],
  )

  const getAdminCommunityNotes = useMemo(
    () =>
      async ({ page = 1 }) => {
        try {
          const params = new URLSearchParams({ page, perPage: 10 })
          const { data } = await axiosInstance.get(
            `/admin/notes?${params.toString()}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            },
          )
          return data
        } catch (error) {
          return
        }
      },
    [],
  )

  const getAdminTopics = useMemo(
    () =>
      async ({ page = 1 }) => {
        try {
          const params = new URLSearchParams({ page, perPage: 10 })
          const { data } = await axiosInstance.get(
            `/admin/topics?${params.toString()}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            },
          )
          return data
        } catch (error) {
          return
        }
      },
    [],
  )

  const getAdminStats = useMemo(
    () => async () => {
      try {
        const { data } = await axiosInstance.get('/admin/stats', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        return data
      } catch (error) {
        return
      }
    },
    [],
  )

  const createAdminUser = useMemo(
    () =>
      async ({ formData, setIsLoading, setErrors, onSuccess }) => {
        try {
          /* setIsLoading(true) */
          await axiosInstance.post('/admin/users', formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          })
          setErrors({})
          if (onSuccess) onSuccess()
        } catch (error) {
          setIsLoading(false)
          setErrors(error?.response?.data?.errors)
        } /* finally {
          setIsLoading(false)
        } */
      },
    [],
  )

  const updateAdminUserData = useMemo(
    () =>
      async ({ id, formData, setIsLoading, setErrors, onSuccess }) => {
        try {
          /* setIsLoading(true) */
          await axiosInstance.patch(`/admin/users/${id}`, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          })
          setErrors({})
          if (onSuccess) onSuccess()
        } catch (error) {
          setIsLoading(false)
          setErrors(error?.response?.data?.errors)
        } /*  finally {
          setIsLoading(false)
        } */
      },
    [],
  )

  const deleteAdminUser = useMemo(
    () =>
      async ({ id, setIsLoading, onError, onSuccess }) => {
        try {
          setIsLoading(true)
          const { data } = await axiosInstance.delete(`/admin/users/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          })
          if (onSuccess) onSuccess({ message: data?.data?.message })
        } catch (error) {
          if (onError) onError()
        } finally {
          setIsLoading(false)
        }
      },
    [],
  )

  const changeAdminNoteStatus = useMemo(
    () =>
      async ({ id, status, setIsLoading, onError, onSuccess }) => {
        try {
          await axiosInstance.put(
            `/admin/notes/${id}`,
            { id, is_public: status },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            },
          )
          if (onSuccess) onSuccess({ message: 'Estado de la nota actualizado' })
        } catch (error) {
          setIsLoading({})
          if (onError) onError()
        }
      },
    [],
  )

  const deleteAdminNote = useMemo(
    () =>
      async ({ id, setIsLoading, onError, onSuccess }) => {
        try {
          const { data } = await axiosInstance.delete(`/admin/notes/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          })
          if (onSuccess)
            onSuccess({
              message: data?.data?.message ?? 'Nota eliminada correctamente',
            })
        } catch (error) {
          setIsLoading({})
          if (onError) onError()
        }
      },
    [],
  )

  const deleteAdminTopic = useMemo(
    () =>
      async ({ id, setIsLoading, onError, onSuccess }) => {
        try {
          const { data } = await axiosInstance.delete(`/admin/topics/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          })
          if (onSuccess)
            onSuccess({
              message: data?.data?.message ?? 'Tema eliminado correctamente',
            })
        } catch (error) {
          setIsLoading({})
          if (onError) onError()
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
      getAdminCommunityNotes,
      getAdminTopics,
      getAdminStats,
      createAdminUser,
      updateAdminUserData,
      deleteAdminUser,
      changeAdminNoteStatus,
      deleteAdminNote,
      deleteAdminTopic,
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
      getAdminCommunityNotes,
      getAdminTopics,
      getAdminStats,
      createAdminUser,
      updateAdminUserData,
      deleteAdminUser,
      changeAdminNoteStatus,
      deleteAdminNote,
      deleteAdminTopic,
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
