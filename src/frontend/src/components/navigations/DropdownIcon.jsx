import { PropTypes } from 'prop-types'
import { motion } from 'framer-motion'
import Chevron from '../../assets/heroicons/solid/Chevron'

export default function DropdownIcon({ isOpen }) {
  return isOpen ? (
    <motion.figure
      initial={{ rotate: 0 }}
      animate={{ rotate: 180 }}
      exit={{ rotate: 0 }}
    >
      <Chevron className="size-6 rotate-180 md:size-5" />
    </motion.figure>
  ) : (
    <motion.figure
      initial={{ rotate: 0 }}
      animate={{ rotate: 0 }}
      exit={{ rotate: 180 }}
    >
      <Chevron className="size-6 rotate-180 md:size-5" />
    </motion.figure>
  )
}

DropdownIcon.propTypes = {
  isOpen: PropTypes.bool.isRequired,
}
