import useSWR from 'swr'
import useApi from '../useApi'
import { RefreshInterval } from '../../helpers/constants'

export default function useAdminCommunityNotes(page) {
  const { getAdminCommunityNotes } = useApi()

  const fetchNotes = async (page) => {
    const response = await getAdminCommunityNotes({ page })
    return {
      notes: response.data,
      totalPages: response.meta.last_page,
      links: response.meta.links,
    }
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    ['notes', page],
    () => fetchNotes(page),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      refreshInterval: RefreshInterval.ADMIN_NOTES,
    },
  )

  const notes = data ? data.notes : []
  const totalPages = data ? data.totalPages : 1
  const links = data ? data.links : []

  return {
    notes,
    isError: error,
    isLoading,
    isValidating,
    totalPages,
    links,
    mutate,
  }
}
