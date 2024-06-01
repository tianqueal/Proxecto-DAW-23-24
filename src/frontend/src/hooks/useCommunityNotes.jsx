import { useRef, useCallback } from 'react'
import useSWRInfinite from 'swr/infinite'
import useApi from '../hooks/useApi'

const useCommunityNotes = () => {
  const { getCommunityNotes, selectedTopics } = useApi()
  const filters = useRef({ content: '', topics: [] })
  const observer = useRef(null)

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !Object.keys(previousPageData).length) {
      return null
    }

    if (pageIndex === 0) {
      return ['CommunityNotes', 1, filters.current]
    }

    return ['CommunityNotes', previousPageData.currentPage + 1, filters.current]
  }

  const fetchNotes = async (key) => {
    // eslint-disable-next-line no-unused-vars
    const [_, page, currentFilters] = key
    const response = await getCommunityNotes({
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

  const notes = data ? data.flat() : []
  const hasMore = data && data[data.length - 1]?.length > 0

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

export default useCommunityNotes
