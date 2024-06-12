import { PropTypes } from 'prop-types'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Slider({ children, rtl = false }) {
  const [isPaused, setIsPaused] = useState(false)
  const animationClass = rtl ? 'animate-slide-right' : 'animate-slide-left'

  return (
    <div
      className="logos group relative overflow-hidden whitespace-nowrap [mask-image:_linear-gradient(to_right,_transparent_0,_white_128px,white_calc(100%-128px),_transparent_100%)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className={`inline-block p-2 ${animationClass}`}
        animate={{ x: rtl ? 100 : -100 }}
        transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
        style={{
          x: rtl ? 100 : -100,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        <div className="flex w-full gap-3">{children}</div>
      </motion.div>
    </div>
  )
}

Slider.propTypes = {
  children: PropTypes.node.isRequired,
  rtl: PropTypes.bool,
}
