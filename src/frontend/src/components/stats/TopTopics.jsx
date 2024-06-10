import { PropTypes } from 'prop-types'
import { motion } from 'framer-motion'

export default function TopTopics({ topics }) {
  return (
    <article className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
        Temas del momento
      </h2>
      <ol className="list-inside space-y-2">
        {Object.values(topics).map((topic, index) => (
          <motion.li
            key={topic?.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex items-center text-base font-medium ${index === 0 ? `text-blue-600 dark:text-blue-400` : `text-gray-900 dark:text-gray-100`}`}
          >
            <span>{topic?.name} - </span>
            <span className="ml-1 font-semibold">{topic?.notesCount}</span>
          </motion.li>
        ))}
      </ol>
    </article>
  )
}

TopTopics.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.object),
}
