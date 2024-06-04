import { motion } from 'framer-motion'
import { PropTypes } from 'prop-types'

export default function InputField({
  id,
  type,
  label = '',
  name,
  placeholder = '',
  value,
  inputRef = null,
  onChange,
  errorText = '',
  autoComplete = 'on',
}) {
  const shakeAnimation = {
    shake: {
      x: [0, -30, 30, -30, 30, 0],
      transition: {
        duration: 0.4,
      },
    },
  }

  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 transition-all dark:text-gray-200"
        >
          {label}
        </label>
      )}
      <motion.input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        ref={inputRef}
        onChange={onChange}
        value={value}
        className={`mt-1 block w-full rounded-md px-3 py-2 shadow-sm transition-all dark:bg-gray-900 dark:text-gray-100 sm:text-sm ${
          errorText
            ? 'border border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400'
            : 'border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500  dark:border-gray-600 dark:focus:border-indigo-500 dark:focus:ring-indigo-500'
        }`}
        autoComplete={autoComplete}
        animate={errorText ? 'shake' : ''}
        variants={shakeAnimation}
      />
      {errorText && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {errorText}
        </p>
      )}
    </>
  )
}

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  inputRef: PropTypes.object,
  onChange: PropTypes.func,
  errorText: PropTypes.string,
  autoComplete: PropTypes.oneOf(['on', 'off']),
}
