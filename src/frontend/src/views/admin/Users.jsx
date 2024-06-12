import { useState } from 'react'
import PropTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../../components/form/Button'
import useUsers from '../../hooks/admin/useUsers'
import Table from '../../components/tables/Table'
import useAuth from '../../hooks/useAuth'
import RoleTag from '../../components/auth/RoleTag'
import TableSkeleton from '../../components/skeletons/TableSkeleton'
import SimpleModal from '../../components/navigations/SimpleModal'
import useApi from '../../hooks/useApi'
import FormRegister from '../../components/auth/FormRegister'
import SuccessToastify from '../../components/alerts/SuccessToastify'
import ErrorToastify from '../../components/alerts/ErrorToastify'
import ErrorContent from '../../components/contents/ErrorContent'
import EmptyContent from '../../components/contents/EmptyContent'
import AnimatedContent from '../../components/contents/AnimatedContent'
import { dateAndTimeFormat } from '../../helpers/formatDate'

function Header({ onCreate }) {
  return (
    <header className="mb-4 flex flex-col items-center justify-between gap-3 md:flex-row">
      <h1 className="text-3xl font-bold">Usuarios</h1>
      <Button
        type="button"
        onClick={onCreate}
        className="bg-blue-500 text-white ring-blue-600 hover:bg-blue-600 focus:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:bg-blue-900"
        text="Crear un nuevo usuario"
      />
    </header>
  )
}

Header.propTypes = {
  onCreate: PropTypes.func.isRequired,
}

export default function Users() {
  const { user } = useAuth()
  const { createAdminUser, updateAdminUserData, deleteAdminUser } = useApi()
  const [page, setPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isActionLoading, setIsActionLoading] = useState(false)
  const [errorAction, setErrorAction] = useState({})
  const { users, isError, isLoading, isValidating, totalPages, links, mutate } =
    useUsers(page)

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  const handleOnChange = () => {
    if (Object.keys(errorAction).length) setErrorAction({})
  }

  const handleEditUser = (id) => {
    const user = users.find((user) => user.id === id)
    setSelectedUser(user)
  }

  const handleDeleteUser = async (id) => {
    if (id === user.id) {
      return ErrorToastify({
        message: 'No puedes eliminar tu propio usuario',
        autoClose: true,
      })
    }
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return
    await deleteAdminUser({
      id,
      setIsLoading: setIsActionLoading,
      setErrors: setErrorAction,
      onSuccess: async ({ message }) => {
        await mutate()
        SuccessToastify({
          message: message ?? 'Usuario eliminado correctamente',
        })
      },
    })
  }

  const handleCreateUser = () => {
    setSelectedUser({})
  }

  const onSuccessfulAction = async () => {
    await mutate()
    SuccessToastify({
      message: `Usuario ${selectedUser?.id ? 'actualizado' : 'creado correctamente'}`,
    })
    setIsActionLoading(false)
    setSelectedUser(null)
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setIsActionLoading(true)
    const fields = [
      'username',
      'email',
      'password',
      'password_confirmation',
      'email_verified_at',
    ]

    // Filter out empty fields and fields that haven't changed
    const formData = fields.reduce((acc, field) => {
      if (field === 'email_verified_at') {
        if (
          !!selectedUser?.emailVerifiedAt !== e.target.elements[field]?.checked
        )
          acc[field] = e.target.elements[field]?.checked
            ? new Date().toISOString()
            : null
      } else {
        const value = e.target.elements[field]?.value
        const isSelectedUserField = field === 'username' || field === 'email'
        const shouldAssignValue = isSelectedUserField
          ? value !== selectedUser?.[field]
          : !!value

        if (shouldAssignValue) {
          acc[field] = value
        }
      }

      return acc
    }, {})

    if (selectedUser?.id) {
      await updateAdminUserData({
        id: selectedUser.id,
        formData,
        setIsLoading: setIsActionLoading,
        setErrors: setErrorAction,
        onSuccess: onSuccessfulAction,
      })
    } else {
      await createAdminUser({
        formData: formData,
        setIsLoading: setIsActionLoading,
        setErrors: setErrorAction,
        onSuccess: onSuccessfulAction,
      })
    }
  }

  const handleOnClose = () => {
    setSelectedUser(null)
    setErrorAction({})
  }

  const columns = [
    {
      key: 'id',
      label: 'Identificador',
    },
    {
      key: 'username',
      label: 'Nombre de usuario',
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'createdAt',
      label: 'Fecha de creación',
      render: (createdAt) =>
        dateAndTimeFormat({ date: createdAt, withSeconds: true }),
    },
    {
      key: 'emailVerifiedAt',
      label: 'Fecha de verificación',
      render: (emailVerifiedAt) =>
        emailVerifiedAt
          ? dateAndTimeFormat({ date: emailVerifiedAt, withSeconds: true })
          : 'No verificado',
    },
    {
      key: 'roles',
      label: 'Roles',
      render: (roles) =>
        roles.map((role) => (
          <RoleTag key={role.id} id={role.id} name={role.name} />
        )),
    },
  ]

  const actions = [
    {
      label: 'Editar',
      onClick: handleEditUser,
      textColor: 'text-yellow-600',
      hoverTextColor: 'hover:text-yellow-800',
      darkTextColor: 'dark:text-yellow-400',
      darkHoverTextColor: 'dark:hover:text-yellow-200',
    },
    {
      label: 'Eliminar',
      onClick: handleDeleteUser,
      textColor: 'text-red-600',
      hoverTextColor: 'hover:text-red-800',
      darkTextColor: 'dark:text-red-400',
      darkHoverTextColor: 'dark:hover:text-red-200',
      disabled: (id) => id === user.id,
    },
  ]

  return (
    <AnimatePresence>
      <motion.section
        key="section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Header onCreate={handleCreateUser} />
        {(isLoading || isError) && (
          <AnimatePresence keyProp="loader">
            <TableSkeleton className="w-full scale-110" />
          </AnimatePresence>
        )}

        {isError && <ErrorContent />}

        {!isLoading && !isError && !isValidating && users?.length === 0 && (
          <EmptyContent
            keyProp="no-users"
            description="¿¡Sin usuarios en la plataforma!?"
          />
        )}

        {!isLoading && users && users.length > 0 && (
          <AnimatedContent keyProp="table">
            <Table
              data={users}
              columns={columns}
              actions={actions}
              totalPages={totalPages}
              links={links}
              onPageChange={handlePageChange}
            />
          </AnimatedContent>
        )}

        <AnimatePresence>
          {selectedUser && (
            <SimpleModal
              title={`${selectedUser?.id ? `Editar` : `Crear`} usuario`}
              handleOnClose={handleOnClose}
            >
              <section className="flex flex-col items-start justify-center">
                {selectedUser?.id && (
                  <p className="mt-6 font-semibold">
                    Los datos que no se modifiquen, no se cambiarán en la base
                    de datos.
                  </p>
                )}
                <FormRegister
                  onSubmit={handleOnSubmit}
                  isLoading={isActionLoading}
                  errors={errorAction}
                  initialValues={{
                    id: selectedUser?.id,
                    username: selectedUser?.username,
                    email: selectedUser?.email,
                    roles: Object.values(selectedUser?.roles || {}).map(
                      (role) => role?.id,
                    ),
                    email_verified_at: !!selectedUser?.emailVerifiedAt,
                  }}
                  onChange={handleOnChange}
                  additionalInputs={[
                    {
                      id: 'email_verified_at',
                      label: 'Usuario verificado',
                      type: 'checkbox',
                      name: 'email_verified_at',
                      value: !!selectedUser?.emailVerifiedAt,
                      disabled: user.id === selectedUser?.id,
                    },
                  ]}
                />
              </section>
            </SimpleModal>
          )}
        </AnimatePresence>
      </motion.section>
    </AnimatePresence>
  )
}
