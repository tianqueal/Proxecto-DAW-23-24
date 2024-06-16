import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

export default function DropMenuOption({
  option,
  to,
  onClick,
  children,
  customClasses = '',
  ...props
  // isActive,
  // uniqueId,
}) {
  const commonClasses =
    'cursor-pointer font-semibold rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800'
  /* const underlineClasses =
    'absolute bottom-0 rounded-lg left-0 h-0.5 w-full bg-indigo-500 dark:bg-indigo-300 bg-opacity-80' */
  if (!to) {
    return (
      <button
        type="button"
        className={`flex w-full items-center ${commonClasses} ${customClasses}`}
        onClick={onClick}
        role="menuitem"
        aria-label={option}
        {...props}
      >
        <span className="relative mx-4 my-2">
          {children ?? option}
          {/* {isActive && (
            <motion.span
              layoutId={`underline-${uniqueId}`}
              className={underlineClasses}
            />
          )} */}
        </span>
      </button>
    )
  }

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex w-full items-center ${commonClasses} ${customClasses}`}
      role="menuitem"
      aria-label={option}
      {...props}
    >
      <span className="relative mx-4 my-2">
        {children ?? option}
        {/* {isActive && (
          <motion.span
            layoutId={`underline-${uniqueId}`}
            className={underlineClasses}
          />
        )} */}
      </span>
    </Link>
  )
}

DropMenuOption.propTypes = {
  option: PropTypes.string.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  customClasses: PropTypes.string,
  // isActive: PropTypes.bool,
  // uniqueId: PropTypes.string,
}
