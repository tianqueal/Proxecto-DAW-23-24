import { motion } from 'framer-motion'

export default function AnimatedHeaderPreviewEditor() {
  const textParts = [
    { text: 'Prueba uno de los', delay: 2.3 },
    { text: 'mejores editores de texto', delay: 2.9 },
    { text: '"en cualquier dispositivo,', delay: 3.6, highlight: true },
    { text: 'en cualquier lugar', delay: 4.3, highlight: true },
    { text: 'y en cualquier momento"', delay: 5.2, highlight: true },
  ]

  return (
    <div className="mx-auto px-4 text-2xl font-semibold md:w-3/5 2xl:w-2/5 lg:text-3xl">
      {textParts.map((part, index) => (
        <motion.h2
          key={index}
          className={`inline-block ${part.highlight ? 'text-indigo-500 dark:text-indigo-300' : ''}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: part.delay, duration: 0.6 }}
        >
          {part.text}{'\u00A0'}
        </motion.h2>
      ))}
    </div>
  )
}