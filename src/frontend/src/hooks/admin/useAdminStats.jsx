import useSWR from 'swr'
import useApi from '../useApi'
import { RefreshInterval } from '../../helpers/constants'

export default function useAdminStats() {
  const { getAdminStats } = useApi()

  const fetchStats = async () => {
    const response = await getAdminStats()
    return {
      stats: response.data.stats,
    }
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    'admin-stats',
    fetchStats,
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      refreshInterval: RefreshInterval.ADMIN_STATS,
    },
  )

  const stats = data ? data.stats : []

  return {
    stats,
    isError: error,
    isLoading,
    isValidating,
    mutate,
  }
}
