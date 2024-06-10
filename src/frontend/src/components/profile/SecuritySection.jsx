import { PropTypes } from 'prop-types'
import Button from '../form/Button'
import Check from '../../assets/heroicons/Check'
import BouncyLoader from '../loaders/BouncyLoader'

function SecurityAction({
  title,
  description,
  buttonText,
  onClick,
  actionLoading,
  actionKey,
  isVerified,
  addClasses,
}) {
  return (
    <div className="mt-4 dark:bg-gray-800 md:flex md:flex-col">
      <h4 className="text-xl font-medium dark:text-white">{title}</h4>
      <p className="mb-3 flex-grow dark:text-gray-300">{description}</p>
      <Button
        onClick={onClick}
        type="button"
        className={`flex h-10 w-full items-center justify-center gap-3 border dark:focus:ring-gray-500 ${addClasses}`}
      >
        {isVerified && <Check customClasses="size-5" />}
        {!actionLoading?.[actionKey]?.isLoading && buttonText}
        {actionLoading?.[actionKey]?.isLoading && <BouncyLoader white={true} />}
      </Button>
    </div>
  )
}

SecurityAction.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  actionLoading: PropTypes.object,
  actionKey: PropTypes.string.isRequired,
  isVerified: PropTypes.bool,
  addClasses: PropTypes.string,
}

export default function SecuritySection({
  handleDeleteAccount,
  emailVerifiedAt,
  handleResendEmailVerification,
  handleLogoutOtherDevices,
  actionLoading,
}) {
  return (
    <div className="grid gap-4 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 md:grid-cols-2">
      <h3 className="text-2xl font-semibold dark:text-white md:col-span-2">
        Seguridad
      </h3>
      <SecurityAction
        title="Verificación"
        description="Verificar tu correo electrónico te permitirá acceder a más funciones de la aplicación"
        buttonText={
          emailVerifiedAt ? 'Correo verificado' : 'Verificar correo electrónico'
        }
        onClick={() => handleResendEmailVerification(emailVerifiedAt)}
        actionLoading={actionLoading}
        actionKey="resendEmailVerification"
        isVerified={!!emailVerifiedAt}
        addClasses={
          emailVerifiedAt
            ? 'bg-white text-green-700 hover:bg-green-50 dark:hover:bg-green-900 focus:bg-green-100 dark:bg-gray-800 dark:text-green-500 dark:focus:bg-green-900 focus:ring-green-200'
            : 'text-white bg-green-500 hover:bg-green-600 focus:ring-green-200 dark:bg-green-800 dark:hover:bg-green-900'
        }
      />
      <SecurityAction
        title="Cerrar sesión en otros dispositivos"
        description="Cierra sesión en todos los dispositivos donde has iniciado sesión, menos en el actual, si crees que tu cuenta está comprometida"
        buttonText="Cerrar sesión en otros dispositivos"
        onClick={handleLogoutOtherDevices}
        actionLoading={actionLoading}
        actionKey="logoutOtherDevices"
        addClasses="text-white bg-indigo-700 hover:bg-indigo-800 dark:hover:bg-indigo-900 focus:ring-indigo-200 dark:bg-indigo-800 dark:hover:bg-indigo-700"
      />
      <SecurityAction
        title="Eliminar cuenta de forma permanente"
        description="Eliminar tu cuenta es una acción irreversible"
        buttonText="Eliminar cuenta"
        onClick={handleDeleteAccount}
        actionLoading={actionLoading}
        actionKey="deleteAccount"
        addClasses="text-white bg-red-600 hover:bg-red-700 dark:hover:bg-red-900 focus:ring-red-200 dark:bg-red-800 dark:hover:bg-red-700"
      />
    </div>
  )
}

SecuritySection.propTypes = {
  handleDeleteAccount: PropTypes.func.isRequired,
  emailVerifiedAt: PropTypes.string,
  handleResendEmailVerification: PropTypes.func.isRequired,
  handleLogoutOtherDevices: PropTypes.func.isRequired,
  actionLoading: PropTypes.object,
}
