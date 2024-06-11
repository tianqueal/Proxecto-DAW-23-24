import { PropTypes } from 'prop-types'
import { motion } from 'framer-motion'
import Button from '../form/Button'
import InputField from '../form/InputField'
import BouncyLoader from '../loaders/BouncyLoader'
import { useState } from 'react'
import PasswordStrengthIndicator from './PasswordStrengthIndicator'

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const inputFieldVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

const buttonVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.3 } },
}

export default function FormRegister({
  onSubmit,
  isLoading,
  errors,
  onChange,
  initialValues = {},
  additionalInputs = {},
}) {
  const [password, setPassword] = useState('')
  return (
    <section className="mt-5 flex items-center justify-center">
      <motion.div
        className="w-full max-w-xl space-y-6 rounded-lg p-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="text-3xl font-bold text-gray-900 transition-all dark:text-gray-200">
          Registro
        </h2>
        <form
          className="mt-8 space-y-6"
          onSubmit={onSubmit}
          onChange={onChange}
        >
          <div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8"
            role="form"
          >
            <motion.div variants={inputFieldVariants}>
              <InputField
                id="username"
                label="Nombre de usuario"
                type="text"
                name="username"
                value={initialValues?.username}
                errorText={errors?.username?.[0]}
              />
            </motion.div>
            <motion.div variants={inputFieldVariants}>
              <InputField
                id="email"
                label="Correo electrónico"
                type="email"
                name="email"
                value={initialValues?.email}
                errorText={errors?.email?.[0]}
              />
            </motion.div>
            <motion.div variants={inputFieldVariants}>
              <InputField
                id="password"
                label="Contraseña"
                type="password"
                name="password"
                errorText={errors?.password?.[0]}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password && <PasswordStrengthIndicator password={password} />}
            </motion.div>
            <motion.div variants={inputFieldVariants}>
              <InputField
                id="password_confirmation"
                label="Confirmar contraseña"
                type="password"
                name="password_confirmation"
                errorText={errors?.password_confirmation?.[0]}
              />
            </motion.div>
            {additionalInputs && (
              <motion.div variants={inputFieldVariants}>
                {additionalInputs?.map((input) => (
                  <InputField
                    key={input.id}
                    id={input.id}
                    label={input.label}
                    type={input.type}
                    name={input.name}
                    value={initialValues?.[input.name]}
                    disabled={input?.disabled}
                    errorText={errors?.[input.name]?.[0]}
                  />
                ))}
              </motion.div>
            )}
          </div>
          <motion.div className="w-full md:w-48" variants={buttonVariants}>
            <Button
              type="submit"
              className="flex h-9 w-full items-center justify-center border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
            >
              {isLoading && <BouncyLoader white={true} />}
              {!isLoading && 'Registrarse'}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </section>
  )
}

FormRegister.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func,
  initialValues: PropTypes.object,
  additionalInputs: PropTypes.array,
}
