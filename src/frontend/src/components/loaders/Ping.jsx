import { PropTypes } from 'prop-types'
import './Ping.css'

export default function Ping({ className }) {
  return <div className={`container_ping ${className}`}></div>
}

Ping.propTypes = {
  className: PropTypes.string,
}
