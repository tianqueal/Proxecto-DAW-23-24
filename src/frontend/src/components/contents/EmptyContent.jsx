import { PropTypes } from 'prop-types'
import AnimatedContent from './AnimatedContent'

export default function EmptyContent({ keyProp, description }) {
  return (
    <AnimatedContent keyProp={keyProp}>
      <p className="text-xl font-medium" role="alert">
        {description}
      </p>
    </AnimatedContent>
  )
}

EmptyContent.propTypes = {
  keyProp: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}
