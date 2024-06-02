import './BouncyLoader.css'
import { PropTypes } from 'prop-types'

export default function BouncyLoader({ white = false }) {
  const styleCubeInner = {
    backgroundColor: white ? '#fff' : '#000',
  }
  return (
    <div className="bouncy__container">
      <div className="cube">
        <div className="cube__inner" style={styleCubeInner}></div>
      </div>
      <div className="cube">
        <div className="cube__inner" style={styleCubeInner}></div>
      </div>
      <div className="cube">
        <div className="cube__inner" style={styleCubeInner}></div>
      </div>
    </div>
  )
}

BouncyLoader.propTypes = {
  white: PropTypes.bool,
}
