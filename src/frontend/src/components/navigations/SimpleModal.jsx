import { PropTypes } from 'prop-types'
import { motion } from 'framer-motion'
import Button from '../form/Button'

export default function SimpleModal({ title, children, handleOnClose, className }) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
    >
      <motion.div
        className={`bg-white dark:bg-neutral-950 p-5 rounded-lg shadow-lg ${className}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        role='group'
      >
        <motion.section>
          <header className="flex items-center justify-between">
            <motion.h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-500">
              {title}
            </motion.h2>
            <Button
              type="button"
              onClick={handleOnClose}
              text="Cerrar"
              className="bg-red-600 px-2 py-1 text-center text-white"
            />
          </header>
          {/* <section className="mt-5 flex items-start justify-center">
            </section> */}
          {children}
        </motion.section>
      </motion.div>
    </motion.div>
  )
}

SimpleModal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  handleOnClose: PropTypes.func,
  className: PropTypes.string,
}
