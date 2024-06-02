import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'

export default function CustomLink({ to, className, text }) {
  return (
    <Link
      to={to}
      className={`rounded-md px-6 py-3 text-lg font-medium transition-all ${className}`}
      aria-label={text}
      type='button'
    >
      {text}
    </Link>
  )
}

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node,
}
