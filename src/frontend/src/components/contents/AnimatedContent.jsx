import { PropTypes } from 'prop-types'
import { motion } from 'framer-motion'

export default function AnimatedContent({ children, keyProp }) {
  return (
    <motion.section
      key={keyProp}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.section>
  )
}

AnimatedContent.propTypes = {
  children: PropTypes.node.isRequired,
  keyProp: PropTypes.string.isRequired,
}
