import { PropTypes } from 'prop-types'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    setDisplayValue(value)
  }, [value])

  return (
    <p className="relative h-6 w-full">
      <AnimatePresence>
        <motion.span
          key={value}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full text-center text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          {displayValue}
        </motion.span>
      </AnimatePresence>
    </p>
  )
}

AnimatedNumber.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default function StatCard({ title, value, icon: Icon = null }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-md dark:bg-gray-800"
      role="region"
      aria-labelledby={`stat-${title}`}
    >
      <figure className="absolute inset-0 flex items-center justify-center opacity-40 dark:opacity-45">
        {' '}
        {Icon && (
          <Icon className="h-32 w-32 text-gray-300 dark:text-gray-700" />
        )}{' '}
      </figure>
      <h2
        id={`stat-${title}`}
        className=" text-center text-xl font-semibold text-gray-800 dark:text-gray-200"
        style={{ zIndex: 1 }}
      >
        {title}
      </h2>
      <article
        className="w-full text-2xl font-bold text-blue-600 dark:text-blue-400"
        style={{ zIndex: 1 }}
      >
        {' '}
        <AnimatedNumber value={value} />
      </article>
    </motion.section>
  )
}

StatCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.func,
}
