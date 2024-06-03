/* import { useNavigate } from 'react-router-dom' */
import useSWR from 'swr'
import axiosInstance from '../config/axios'
/* import { useEffect } from 'react' */
import ErrorToastify from '../components/alerts/ErrorToastify'
import { useNavigate } from 'react-router-dom'
import { Roles } from '../helpers/constants'

const useAuth = (/* { middleware, url, requiredRole } */) => {
  const navigate = useNavigate()
  const accessToken = localStorage.getItem('accessToken')

  const {
    data: user,
    isLoading: setIsLoading,
    error,
    mutate: mutateUser,
    isValidating,
  } = useSWR('/user', async () => {
    try {
      const response = await axiosInstance('/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      return response.data.data
    } catch (error) {
      throw Error(error?.response?.data?.errors)
    }
  })
  /* const navigate = useNavigate() */

  const login = async ({ formData, setIsLoading, setErrors }) => {
    try {
      localStorage.removeItem('accessToken')
      await mutateUser(null, false)

      setErrors({})
      setIsLoading(true)
      const { data } = await axiosInstance.post('/login', formData)
      localStorage.setItem('accessToken', data.data.access_token)
      await mutateUser(data.data.user, false)

      console.log(
        'Redirect to admin/dashboard?',
        data.data.user?.roles?.some((role) => role?.name === Roles.ADMIN),
      )
      navigate(
        data.data.user?.roles?.some((role) => role?.name === Roles.ADMIN)
          ? '/admin/dashboard'
          : '/my-notes',
      )
    } catch (error) {
      if (error?.response?.status >= 500) {
        ErrorToastify({
          message: 'Error de conexión con el servidor',
        })
      } else {
        setErrors(error?.response?.data?.errors)
      }
    }
    await mutateUser()
    setIsLoading(false)
  }

  const register = async ({ formData, setIsLoading, setErrors }) => {
    try {
      setErrors({})
      setIsLoading(true)
      console.log(formData)
      const { data } = await axiosInstance.post('/register', formData)
      localStorage.setItem('accessToken', data.data.access_token)
      await mutateUser(data.data.user, false)
      navigate('/my-notes')
    } catch (error) {
      if (error?.response?.status >= 500) {
        ErrorToastify({
          message: 'Error de conexión con el servidor',
        })
      } else {
        setErrors(error?.response?.data?.errors)
      }
    }
    setIsLoading(false)
  }

  const logout = async ({ setIsLoading }) => {
    try {
      setIsLoading(true)
      await axiosInstance.post(
        '/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      localStorage.removeItem('accessToken')
      mutateUser(undefined)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const resendEmailVerification = async ({ setIsLoading, setError }) => {
    try {
      setIsLoading({
        resendEmailVerification: { isLoading: true },
      })
      await axiosInstance.get('/email/resend', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    } catch (error) {
      console.log(error)
      setError('Ha ocurrido un error al enviar el correo de verificación')
    }
    setIsLoading({
      resendEmailVerification: { isLoading: false },
    })
  }

  const logoutOtherDevices = async ({ setIsLoading, setError }) => {
    try {
      setIsLoading({
        logoutOtherDevices: { isLoading: true },
      })
      await axiosInstance.post(
        '/user/logout-other-devices',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      setError(null)
    } catch (error) {
      console.log(error)
      setError(
        'Ha ocurrido un error al cerrar sesión en todos los dispositivos',
      )
    }
    setIsLoading({
      logoutOtherDevices: { isLoading: false },
    })
  }

  const deleteAccount = async ({ setIsLoading, setError }) => {
    try {
      setIsLoading({
        deleteAccount: { isLoading: true },
      })
      await axiosInstance.delete('/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      localStorage.removeItem('accessToken')
      await mutateUser(null, false)
      setError(null)
    } catch (error) {
      console.log(error)
      setError('Ha ocurrido un error al eliminar la cuenta')
    } finally {
      setIsLoading({
        deleteAccount: { isLoading: false },
      })
    }
  }

  /*  useEffect(() => {
    if (middleware === 'guest' && url && user) navigate(url)
    if (middleware === 'auth' && !user) navigate('/login')
    if (middleware === 'auth' && user) {
      const hasRequiredRole = user?.roles?.some(
        (role) => role?.name === requiredRole,
      )
      navigate(hasRequiredRole ? url : '/unauthorized')
    }
  }, [user, middleware, navigate, url, requiredRole]) */

  return {
    user,
    error,
    login,
    register,
    logout,
    resendEmailVerification,
    logoutOtherDevices,
    deleteAccount,
    isLoading: setIsLoading,
    isError: error,
    isValidating,
  }
}

export default useAuth
