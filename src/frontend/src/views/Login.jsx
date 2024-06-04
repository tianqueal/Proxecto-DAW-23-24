import { useState } from 'react'
import FormLogin from '../components/auth/FormLogin'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth({
    /* middleware: 'guest', url: '/my-notes'  */
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      email_or_username: e.target.elements.email_or_username.value,
      password: e.target.elements.password.value,
    }

    await login({
      formData,
      setIsLoading,
      setErrors,
      onSuccess: ({ navigateTo }) => {
        navigate(navigateTo)
      },
    })
  }

  const handleOnChange = () => {
    if (Object.keys(errors).length) setErrors({})
  }

  return (
    <>
      <FormLogin
        onSubmit={handleSubmit}
        isLoading={isLoading}
        errors={errors}
        onChange={handleOnChange}
      />
    </>
  )
}
