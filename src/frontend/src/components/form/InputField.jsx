import { motion } from 'framer-motion'
import { PropTypes } from 'prop-types'

// Subcomponente para los campos de texto y checkbox
function InputElement({
  id,
  type,
  label,
  placeholder,
  name,
  value,
  disabled,
  inputRef,
  onChange,
  errorText,
  autoComplete,
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
      {type === 'checkbox' ? (
        <div className="mb-4 flex items-center" role="group">
          <motion.input
            id={id}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            name={name}
            defaultChecked={value}
            disabled={disabled}
            ref={inputRef}
            onChange={onChange}
            variants={shakeAnimation}
            animate={errorText ? 'shake' : ''}
          />
          {label && (
            <label
              htmlFor={id}
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {label}
            </label>
          )}
        </div>
      ) : (
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
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            defaultValue={value}
            disabled={disabled}
            ref={inputRef}
            onChange={onChange}
            autoComplete={autoComplete}
            className={`block w-full rounded-md px-3 py-2 shadow-sm transition-all dark:bg-gray-900 dark:text-gray-100 sm:text-sm ${
              errorText
                ? 'border border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400'
                : 'border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500  dark:border-gray-600 dark:focus:border-indigo-500 dark:focus:ring-indigo-500'
            }`}
            variants={shakeAnimation}
            animate={errorText ? 'shake' : ''}
          />
        </>
      )}
      {errorText && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {errorText}
        </p>
      )}
    </>
  )
}

InputElement.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.bool,
  inputRef: PropTypes.object,
  onChange: PropTypes.func,
  errorText: PropTypes.string,
  autoComplete: PropTypes.oneOf(['on', 'off']),
}

export default function InputField({
  id,
  type,
  label = '',
  name,
  placeholder = '',
  value,
  disabled = false,
  inputRef = null,
  onChange,
  errorText = '',
  autoComplete = 'on',
}) {
  return (
    <InputElement
      id={id}
      type={type}
      label={label}
      name={name}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      inputRef={inputRef}
      onChange={onChange}
      errorText={errorText}
      autoComplete={autoComplete}
    />
  )
}

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.bool,
  inputRef: PropTypes.object,
  onChange: PropTypes.func,
  errorText: PropTypes.string,
  autoComplete: PropTypes.oneOf(['on', 'off']),
}
