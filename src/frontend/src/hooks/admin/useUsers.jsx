import useSWR from 'swr'
import useApi from '../useApi'

export default function useUsers(page) {
  const { getUsers } = useApi()

  const fetchUsers = async (page) => {
    const response = await getUsers({ page })
    return {
      users: response.data,
      totalPages: response.meta.last_page,
      links: response.meta.links,
    }
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    ['users', page],
    () => fetchUsers(page),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      refreshInterval: 10000,
    },
  )

  const users = data ? data.users : []
  const totalPages = data ? data.totalPages : 1
  const links = data ? data.links : []

  return {
    users,
    isError: error,
    isLoading,
    isValidating,
    totalPages,
    links,
    mutate,
  }
}
