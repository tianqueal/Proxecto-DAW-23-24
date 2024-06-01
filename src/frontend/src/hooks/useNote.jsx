import { useState, useEffect } from 'react'
import useApi from '../hooks/useApi'

const useNote = ({ noteId, setIsNoteLoading }) => {
  const { getMyNote, getCommunityNote } = useApi()
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isOwner, setIsOwner] = useState(false)
  /* const [isAuthenticated, setIsAuthenticated] = useState(true) */

  useEffect(() => {
    const fetcher = async () => {
      setIsNoteLoading(true)
      setIsLoading(true)
      try {
        const myNoteData = await getMyNote({ id: noteId })
        if (myNoteData?.response?.status >= 400) {
          throw new Error(myNoteData?.response?.statusText)
        }
        console.log('myNoteData fetch', myNoteData)
        setData(myNoteData.data)
        setIsOwner(true)
        setIsLoading(false)
      } catch (err) {
        /* setIsAuthenticated(false) */
        // Try to get the community note if not authenticated
        try {
          const communityNoteData = await getCommunityNote({ id: noteId })
          if (communityNoteData?.response?.status >= 400) {
            throw new Error(communityNoteData?.response?.statusText)
          }
          setData(communityNoteData.data)
          setIsOwner(false)
        } catch (err) {
          setError(err)
        }
        setIsLoading(false)
        setIsNoteLoading(false)
      }
    }
    fetcher()
  }, [noteId, getMyNote, getCommunityNote, setIsNoteLoading])

  return {
    currentNote: data,
    isLoading,
    isError: error,
    isOwner,
    /* isAuthenticated, */
  }
}

export default useNote
