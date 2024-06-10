import { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import { motion } from 'framer-motion'
import calculatePasswordStrength from '../../helpers/calculatePasswordStrength'

export default function PasswordStrengthIndicator({ password }) {
  const [strength, setStrength] = useState(0)
  const strengthClasses = [
    'bg-red-500 dark:bg-red-700',
    'bg-yellow-500 dark:bg-yellow-700',
    'bg-green-500 dark:bg-green-700',
    'bg-blue-500 dark:bg-blue-700',
  ]

  useEffect(() => {
    setStrength(calculatePasswordStrength(password))
  }, [password])

  return (
    <div
      className="-mx-1 mt-2 flex"
      role="progressbar"
      aria-valuenow={strength}
      aria-valuemin="0"
      aria-valuemax="5"
    >
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`${i}-${strength}`}
          className={`mx-1 h-2 flex-auto rounded-full ${i < strength ? strengthClasses[strength - 1] : 'bg-gray-200 opacity-50 dark:bg-gray-700'}`}
          initial={
            i === strength - 1
              ? { scale: 0.8, opacity: 0 }
              : { scale: 1, opacity: 1 }
          }
          animate={
            i === strength - 1
              ? { scale: 1, opacity: 1 }
              : { scale: 1, opacity: 1 }
          }
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        />
      ))}
    </div>
  )
}

PasswordStrengthIndicator.propTypes = {
  password: PropTypes.string,
}
