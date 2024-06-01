import PropTypes from 'prop-types'

export default function DropdownWindow({
  children,
  scroll = false,
  customClasses = '',
}) {
  const scrollClasses = scroll ? 'max-h-64 w-full overflow-y-auto' : ''
  return (
    <div
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
      className={`absolute right-0 z-50 mt-2 origin-top-right rounded-md bg-white bg-opacity-60 p-2 shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-lg backdrop-saturate-150 dark:bg-gray-900 dark:bg-opacity-60 ${scrollClasses} ${customClasses}`}
    >
      {children}
    </div>
  )
}

DropdownWindow.propTypes = {
  children: PropTypes.node.isRequired,
  scroll: PropTypes.bool,
  customClasses: PropTypes.string,
}
