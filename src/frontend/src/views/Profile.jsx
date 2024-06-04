import ProfileSkeleton from '../components/skeletons/ProfileSkeleton'
import useAuth from '../hooks/useAuth'
import ErrorToastify from '../components/alerts/ErrorToastify'
import ProfileHeader from '../components/profile/ProfileHeader'
import PersonalInfoSection from '../components/profile/PersonalInfoSection'
import SecuritySection from '../components/profile/SecuritySection'
import InfoToastify from '../components/alerts/InfoToastify'
import SuccessToastify from '../components/alerts/SuccessToastify'
import { shortFormatDate } from '../helpers/formatDate'
import { useEffect, useState } from 'react'

export default function Profile() {
  const {
    user,
    resendEmailVerification,
    logoutOtherDevices,
    deleteAccount,
    isLoading,
    isError,
  } = useAuth({
    /* middleware: 'auth', */
  })

  const [actionLoading, setActionLoading] = useState({})
  const [actionError, setActionError] = useState(null)

  const handleResendEmailVerification = async (emailVerifiedAt) => {
    if (emailVerifiedAt) {
      return InfoToastify({
        message: `Tu correo ya ha sido verificado el día ${shortFormatDate({ date: emailVerifiedAt })}`,
      })
    }
    try {
      await resendEmailVerification({
        setIsLoading: setActionLoading,
        setError: setActionError,
      })
      if (actionError) throw new Error(actionError)
      SuccessToastify({ message: 'Correo de verificación enviado' })
    } catch (error) {
      ErrorToastify({
        message: actionError,
        autoClose: true,
      })
    }
  }

  const handleLogoutOtherDevices = async () => {
    const confirmation = window.confirm(
      '¿Estás seguro de que quieres cerrar sesión en todos los dispositivos?',
    )
    if (confirmation) {
      await logoutOtherDevices({
        setIsLoading: setActionLoading,
        setError: setActionError,
      })
      SuccessToastify({ message: 'Sesión cerrada en todos los dispositivos' })
    }
  }

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm(
      '¿Estás seguro de que quieres eliminar tu cuenta?',
    )
    if (confirmation) {
      await deleteAccount({
        setIsLoading: setActionLoading,
        setError: setActionError,
        onSuccess: ({ message }) => {
          SuccessToastify({ message })
        },
      })
    }
  }

  useEffect(() => {
    if (isError && !isLoading) {
      ErrorToastify({
        message: 'No se ha podido cargar el perfil',
        autoClose: true,
      })
    }
    if (actionError) {
      ErrorToastify({ message: actionError, autoClose: true })
    }
  }, [isError, isLoading, actionError])

  return (
    <>
      <h1 className="mt-8 text-3xl font-bold dark:text-white">Mi perfil</h1>
      <div className="my-8 grid grid-cols-1 gap-2 md:flex md:flex-col md:gap-4">
        {(isLoading || isError) && <ProfileSkeleton />}
        {!isLoading && !isError && user && (
          <>
            <ProfileHeader user={user} />
            <PersonalInfoSection user={user} />
            <SecuritySection
              handleDeleteAccount={handleDeleteAccount}
              emailVerifiedAt={user?.emailVerifiedAt}
              handleResendEmailVerification={handleResendEmailVerification}
              handleLogoutOtherDevices={handleLogoutOtherDevices}
              actionLoading={actionLoading}
            />
          </>
        )}
      </div>
    </>
  )
}

/**
 *
 *
 */
