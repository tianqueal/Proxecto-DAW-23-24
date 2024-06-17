import { motion } from 'framer-motion'

export default function AnimatedHeaderPreviewEditor() {
  const textParts = [
    { text: 'Prueba uno de los', delay: 1.9 },
    { text: 'mejores editores de texto', delay: 2.5 },
    { text: '"en cualquier dispositivo,', delay: 2.9, highlight: true },
    { text: 'en cualquier lugar', delay: 3.6, highlight: true },
    { text: 'y en cualquier momento"', delay: 4.2, highlight: true },
  ]

  return (
    <div className="mx-auto px-4 text-2xl font-semibold md:w-3/5 lg:text-3xl 2xl:w-2/5">
      {textParts.map((part, index) => (
        <motion.h2
          key={index}
          className={`inline-block ${part.highlight ? 'text-indigo-600 dark:text-indigo-200' : ''}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: part.delay, duration: 0.6 }}
        >
          {part.text}
          {'\u00A0'}
        </motion.h2>
      ))}
    </div>
  )
}
