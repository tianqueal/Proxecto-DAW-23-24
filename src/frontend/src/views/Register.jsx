import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import FormRegister from '../components/auth/FormRegister'

export default function Login() {
  const { register } = useAuth({
    /* middleware: 'guest', url: '/my-notes' */
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      email: e.target.elements.email.value,
      username: e.target.elements.username.value,
      password: e.target.elements.password.value,
      password_confirmation: e.target.elements.password_confirmation.value,
    }

    await register({ formData, setIsLoading, setErrors })
  }

  const handleOnChange = () => {
    if (Object.keys(errors).length) setErrors({})
  }

  return (
    <>
      <FormRegister
        onSubmit={handleSubmit}
        isLoading={isLoading}
        errors={errors}
        onChange={handleOnChange}
      />
    </>
  )
}
