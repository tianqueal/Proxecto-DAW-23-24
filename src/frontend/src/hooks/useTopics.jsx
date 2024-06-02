import { useRef, useCallback } from 'react'
import useSWRInfinite from 'swr/infinite'
import useApi from './useApi'

const useTopics = () => {
  const { searchTopicName, getTopics } = useApi()
  const observer = useRef(null)

  const getKey = (pageIndex, previousPageData) => {
    // If there's no data from the previous page, we've reached the end of the data. Return null to stop fetching.
    if (previousPageData && !Object.keys(previousPageData).length) {
      return null
    }

    // If there's a search term and we're on the first page, fetch the first page of results for that search term.
    if (searchTopicName && pageIndex === 0) {
      return ['topics', 1, searchTopicName]
    }

    // If there's a search term, fetch the next page of results for that search term.
    if (searchTopicName) {
      return ['topics', previousPageData.currentPage + 1, searchTopicName]
    }

    // If there's no search term and we're not on the first page, we've reached the end of the data. Return null to stop fetching.
    return null
  }

  const fetchTopics = async (key) => {
    // eslint-disable-next-line no-unused-vars
    const [_, page, name] = key
    const response = await getTopics({ page, name })
    return {
      topics: response.data,
      currentPage: response.meta.current_page,
      totalPages: response.meta.last_page,
    }
  }

  const { data, error, isLoading, setSize } = useSWRInfinite(
    getKey,
    fetchTopics,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateFirstPage: false,
      revalidateOnMount: false,
    },
  )

  const topics = data ? data.flatMap((val) => val.topics) : []
  const hasMore = data
    ? data[data.length - 1].totalPages > data[data.length - 1].currentPage
    : false

  const lastTopicElementRef = useCallback(
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
    topics,
    isLoading,
    isError: error,
    lastTopicElementRef,
  }
}

export default useTopics
