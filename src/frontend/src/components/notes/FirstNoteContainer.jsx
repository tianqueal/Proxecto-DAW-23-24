import { motion } from 'framer-motion'
import { AppName } from '../../helpers/constants'
import Plus from '../../assets/heroicons/solid/Plus'
import { Link } from 'react-router-dom'

export default function FirstNoteContainer() {
  return (
    <motion.section
      className="mt-4 flex flex-col items-center justify-center rounded-md bg-gray-100 p-4 dark:bg-gray-800"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      role="alert"
      aria-label="No notes created"
    >
      <Link to="/notes/create" className="flex items-center justify-center">
        <Plus
          className="size-16 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
        />
      </Link>
      <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
        Bienvenida/o a {AppName}
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400">
        Aún no has creado ninguna nota. Haz click en el botón superior para
        empezar.
      </p>
    </motion.section>
  )
}
