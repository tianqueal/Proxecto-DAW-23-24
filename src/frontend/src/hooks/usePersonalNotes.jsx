import { useRef, useCallback } from 'react'
import useSWRInfinite from 'swr/infinite'
import useApi from '../hooks/useApi'

const usePersonalNotes = () => {
  const { getMyNotes, selectedTopics } = useApi()
  const filters = useRef({ content: '', topics: [] })
  const observer = useRef(null)

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData != null && !Object.keys(previousPageData).length) {
      return null
    }

    if (pageIndex === 0) {
      return ['MyNotes', 1, filters.current]
    }

    return ['MyNotes', previousPageData.currentPage + 1, filters.current]
  }

  const fetchNotes = async (key) => {
    // eslint-disable-next-line no-unused-vars
    const [_, page, currentFilters] = key
    const response = await getMyNotes({
      page,
      content: currentFilters.content,
      topics: selectedTopics.map((topic) => topic.id),
    })
    return {
      notes: response.data,
      currentPage: response.meta.current_page,
      totalPages: response.meta.last_page,
    }
  }

  const { data, error, isLoading, setSize } = useSWRInfinite(getKey, fetchNotes)

  const notes = data ? data.flatMap((val) => val.notes) : []
  const hasMore = data
    ? data[data.length - 1].totalPages > data[data.length - 1].currentPage
    : false

  const setFilters = useCallback(
    ({ content, topics }) => {
      filters.current = { content, topics }
      setSize(1) // Reset to the first page
    },
    [setSize],
  )

  const lastNoteElementRef = useCallback(
    (node) => {
      if (!hasMore || isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setSize((prevSize) => prevSize + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [hasMore, isLoading, setSize],
  )

  return {
    notes,
    isLoading,
    isError: error,
    lastNoteElementRef,
    setFilters,
  }
}

export default usePersonalNotes
