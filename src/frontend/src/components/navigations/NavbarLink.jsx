import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NavbarLink({ to, option, onClick, children }) {
  const commonClasses =
    'text-2xl font-semibold text-gray-700 transition-colors duration-300 hover:text-indigo-500 focus:text-indigo-500 focus:outline-none dark:text-gray-300 dark:hover:text-indigo-300 dark:focus:text-indigo-300 md:text-base'

  const renderElement = to ? (
    <Link
      to={to}
      className={commonClasses}
      onClick={onClick}
      role="menuitem"
      aria-label={option}
    >
      {children ?? option}
    </Link>
  ) : (
    <button
      type="button"
      className={commonClasses}
      onClick={onClick}
      role="menuitem"
      aria-label={option}
    >
      {children ?? option}
    </button>
  )

  return (
    <li className="list-none px-2 py-2">
      <motion.span
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        {renderElement}
      </motion.span>
    </li>
  )
}

NavbarLink.propTypes = {
  option: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
}
