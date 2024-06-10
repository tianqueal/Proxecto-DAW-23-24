import useSWR from 'swr'
import useApi from '../useApi'
import { RefreshInterval } from '../../helpers/constants'

export default function useAdminTopics(page) {
  const { getAdminTopics } = useApi()

  const fetchTopics = async (page) => {
    const response = await getAdminTopics({ page })
    return {
      topics: response.data,
      totalPages: response.meta.last_page,
      links: response.meta.links,
    }
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    ['topics', page],
    () => fetchTopics(page),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      refreshInterval: RefreshInterval.ADMIN_TOPICS,
    },
  )

  const topics = data ? data.topics : []
  const totalPages = data ? data.totalPages : 1
  const links = data ? data.links : []

  return {
    topics,
    isError: error,
    isLoading,
    isValidating,
    totalPages,
    links,
    mutate,
  }
}
