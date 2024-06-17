import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NavbarLink({
  to,
  option,
  onClick,
  children,
  className = '',
  isActive = false,
  uniqueId,
}) {
  const commonClasses = `relative text-2xl font-semibold text-gray-700 transition-colors duration-300 hover:text-indigo-500 focus:outline-none dark:text-gray-300 dark:hover:text-indigo-300 md:text-base ${className}`
  const underlineClasses =
    'absolute bottom-0 rounded-lg left-0 h-0.5 w-full bg-indigo-500 dark:bg-indigo-300 bg-opacity-80'
  const renderElement = to ? (
    <Link
      to={to}
      className={commonClasses}
      onClick={onClick}
      role="menuitem"
      aria-label={option}
    >
      {children ?? option}
      {isActive && (
        <motion.span
          layoutId={`underline-${uniqueId}`}
          className={underlineClasses}
        />
      )}
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
      {isActive && (
        <motion.span
          layoutId={`underline-${uniqueId}`}
          className={underlineClasses}
        />
      )}
    </button>
  )

  return (
    <li className="list-none px-2 py-2" role="presentation">
      <motion.span
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="block h-full w-full"
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
  className: PropTypes.string,
  isActive: PropTypes.bool,
  uniqueId: PropTypes.string,
}
