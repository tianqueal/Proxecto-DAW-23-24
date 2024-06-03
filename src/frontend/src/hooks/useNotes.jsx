import { useRef, useCallback } from 'react'
import useSWRInfinite from 'swr/infinite'
import useApi from '../hooks/useApi'
import { NoteFetchTypes } from '../helpers/constants'

export default function useNotes({ type }) {
  // For this reason, TypeScript is a better choice for larger projects or projects where code quality is a priority.
  if (!Object.values(NoteFetchTypes).includes(type)) {
    throw new Error(
      `Invalid type: ${type}. Expected one of ${Object.values(NoteFetchTypes).join(', ')}`,
    )
  }

  const { getMyNotes, getCommunityNotes, selectedTopics } = useApi()
  const filters = useRef({ content: '', topics: [] })
  const observer = useRef(null)

  const getNotes =
    type === NoteFetchTypes.COMMUNITY_NOTES ? getCommunityNotes : getMyNotes

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData != null && !Object.keys(previousPageData).length) {
      return null
    }

    if (pageIndex === 0) {
      return [type, 1, filters.current]
    }

    return [type, previousPageData.currentPage + 1, filters.current]
  }

  const fetchNotes = async (key) => {
    // eslint-disable-next-line no-unused-vars
    const [_, page, currentFilters] = key
    const response = await getNotes({
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

  const { data, error, isLoading, setSize, isValidating, mutate } =
    useSWRInfinite(getKey, fetchNotes, {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: false,
      refreshInterval: 10000,
    })

  const notes = data ? data.flatMap((val) => val.notes) : null
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
    isValidating,
    mutateNotes: mutate,
  }
}
