import { motion } from 'framer-motion'
import Chevron from '../../assets/heroicons/solid/Chevron'

export default function FloatingChevron() {
  return (
    <motion.figure
      className="my-12"
      initial={{ translateY: -5 }}
      animate={{ translateY: 5 }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'linear',
      }}
    >
      <Chevron className="mx-auto size-10 rotate-180" aria-hidden="true" />
    </motion.figure>
  )
}
