import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import InputField from '../form/InputField'
import Button from '../form/Button'
import BouncyLoader from '../loaders/BouncyLoader'

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

export default function FormLogin({ onSubmit, isLoading, errors, onChange }) {
  return (
    <section className="mt-5 flex items-center justify-center">
      <motion.div
        className="w-full max-w-xl space-y-6 rounded-lg p-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-200 transition-all">Iniciar sesión</h2>
        <form
          className="mt-8 space-y-6"
          onSubmit={onSubmit}
          onChange={onChange}
        >
          <div className="space-y-4">
            <motion.div variants={inputFieldVariants}>
              <InputField
                id="email_or_username"
                label="Correo electrónico o nombre de usuario"
                type="text"
                name="email_or_username"
                errorText={errors?.email_or_username?.[0]}
              />
            </motion.div>
            <motion.div variants={inputFieldVariants}>
              <InputField
                id="password"
                label="Contraseña"
                type="password"
                name="password"
                errorText={errors?.password?.[0]}
              />
            </motion.div>
          </div>
          <motion.div variants={buttonVariants}>
            <Button
              type="submit"
              className="w-full h-9 flex justify-center items-center text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 border-transparent"
            >
              {isLoading && <BouncyLoader white={true} />}
              {!isLoading && 'Iniciar sesión'}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </section>
  )
}

FormLogin.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func,
}
