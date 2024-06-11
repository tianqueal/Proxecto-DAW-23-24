import { motion } from 'framer-motion'
import FaceFrown from '../../assets/heroicons/solid/FaceFrown'

export default function NoteNotFound() {
  return (
    <motion.div
      className="mt-4 flex flex-col items-center justify-center rounded-md bg-gray-100 p-4 dark:bg-gray-800"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      role="alert"
      aria-label="No notes found"
    >
      <FaceFrown
        className="size-16 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
      />
      <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
        No se han encontrado notas
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400">
        No se han encontrado notas con los filtros seleccionados.
      </p>
    </motion.div>
  )
}
