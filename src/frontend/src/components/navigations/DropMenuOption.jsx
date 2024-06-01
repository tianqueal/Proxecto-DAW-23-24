import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function DropMenuOption({ option, to, onClick, children, customClasses = ''}) {
  const commonClasses =
    'cursor-pointer font-semibold rounded-md px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800'

  if (!to) {
    return (
      <button
        type="button"
        className={`flex w-full items-center ${commonClasses} ${customClasses}`}
        onClick={onClick}
        role="menuitem"
        aria-label={option}
      >
        {children ?? option}
      </button>
    )
  }

  return (
    <Link
      to={to}
      onClick={onClick}
      className={commonClasses}
      role="menuitem"
      aria-label={option}
    >
      {children ?? option}
    </Link>
  )
}

DropMenuOption.propTypes = {
  option: PropTypes.string.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  customClasses: PropTypes.string,
}
