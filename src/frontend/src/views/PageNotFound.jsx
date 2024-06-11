import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ArrowPath from '../assets/heroicons/solid/ArrowPath'
import Button from '../components/form/Button'

export default function PageNotFound() {
  const navigate = useNavigate()
  return (
    <section className="-mt-16 flex h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 id="errorTitle" className="hidden" aria-hidden="true">
        Error 404: Página no encontrada - Not Found
      </h1>
      <section className="flex items-center gap-3" aria-labelledby="errorTitle">
        <figure>
          <span className="text-7xl font-bold italic">4</span>
          <figcaption className="hidden">
            Número 4 del código de error 404
          </figcaption>
        </figure>
        <motion.figure
          animate={{
            rotate: 360,
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <ArrowPath className="size-16" />
          <figcaption className="hidden">
            Imagen rotatoria que representa al cero del error 404
          </figcaption>
        </motion.figure>
        <figure>
          <span className="text-7xl font-bold italic">4</span>
          <figcaption className="hidden">
            Número 4 del código de error 404
          </figcaption>
        </figure>
      </section>
      <p className="text-xl font-semibold">¡Vaya! Parece que te has perdido.</p>
      <Button
        type="button"
        text="Volver a salvo"
        onClick={() => navigate('/')}
        className="bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
      />
    </section>
  )
}
