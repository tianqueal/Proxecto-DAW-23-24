import { useEffect } from 'react'
import CubeLoader from '../components/loaders/CubeLoader'
import Button from '../components/form/Button'
import { useNavigate } from 'react-router-dom'
import { DiscordClientURL } from '../helpers/constants'

export default function Discord() {
  const navigate = useNavigate()
  useEffect(() => {
    const id = setTimeout(() => {
      window.location.href = DiscordClientURL()
    }, 4000)
    return () => {
      clearTimeout(id)
    }
  }, [])
  return (
    <>
      <section className="mt-8 flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Redirigiendo a Discord...
        </h2>
        <Button
          type="button"
          text="Mejor me quedo aquí"
          className="mt-8 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          onClick={() => navigate('/')}
        ></Button>
        <CubeLoader className="bg-gray-800 dark:bg-white" />
      </section>
    </>
  )
}
