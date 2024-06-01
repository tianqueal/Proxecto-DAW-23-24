import PropTypes from 'prop-types'

export default function Button({
  type,
  text,
  onClick,
  className: customClasses,
  children,
}) {
  const communClasses =
    'block rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2'

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${communClasses} ${customClasses ? customClasses : 'w-full border-transparent'}`}
      aria-label={text}
    >
      {children ?? text}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
}
