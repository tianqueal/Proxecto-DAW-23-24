import axios from 'axios'
import { Language } from '../helpers/constants'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept-Language': Language.CURRENT ?? Language.EN,
  },
})

export default axiosInstance
