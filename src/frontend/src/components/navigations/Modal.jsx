import { PropTypes } from 'prop-types'
import { motion } from 'framer-motion'

const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const modalContent = {
  hidden: { y: '-50%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: { duration: 0.3 } },
  exit: { y: '-50%', opacity: 0, transition: { duration: 0.3 } },
}

export default function Modal({ children, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-10 overflow-y-auto dark:bg-gray-800"
      variants={modalBackdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <motion.div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          variants={modalBackdrop}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900"></div>
        </motion.div>
        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <motion.div
          className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all dark:bg-gray-700 sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
          variants={modalContent}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="bg-white px-4 pb-4 pt-5 dark:bg-gray-700 sm:p-6 sm:pb-4">
            {children}
          </div>
          <div className="bg-gray-50 px-4 py-3 dark:bg-gray-800 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}
