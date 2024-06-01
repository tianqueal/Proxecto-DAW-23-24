import { PropTypes } from 'prop-types'
import './DotPulseLoader.css'

export default function DotPulseLoader({ customClasses, dotColor }) {
  return (
    <div className="dotpulse__container" style={{ '--uib-color': dotColor }}>
      <div className={`dot ${customClasses}`} />
    </div>
  )
}

DotPulseLoader.propTypes = {
  customClasses: PropTypes.string,
  dotColor: PropTypes.string,
}
