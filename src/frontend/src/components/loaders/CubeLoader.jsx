import './CubeLoader.css'
import { PropTypes } from 'prop-types'

export default function CubeLoader({ className: customClasses }) {
  const defaultClasses = (i) =>
    `sk-cube sk-cube${i} ${customClasses ?? 'bg-gray-800'}`
  return (
    <div className="sk-cube-grid">
      {[...Array(9)].map((_, i) => (
        <div key={i} className={defaultClasses(i + 1)}></div>
      ))}
    </div>
  )
}

CubeLoader.propTypes = {
  className: PropTypes.string,
}
