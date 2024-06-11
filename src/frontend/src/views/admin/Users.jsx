import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/form/Button'
import useUsers from '../../hooks/admin/useUsers'
import Table from '../../components/tables/Table'
import useAuth from '../../hooks/useAuth'
import RoleTag from '../../components/auth/RoleTag'
import TableSkeleton from '../../components/skeletons/TableSkeleton'
import { AnimatePresence } from 'framer-motion'
import SimpleModal from '../../components/navigations/SimpleModal'
import useApi from '../../hooks/useApi'
import FormRegister from '../../components/auth/FormRegister'
import SuccessToastify from '../../components/alerts/SuccessToastify'
import ErrorToastify from '../../components/alerts/ErrorToastify'

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
      onSuccess: async () => {
        await mutate()
        SuccessToastify({
          message: 'Usuario eliminado correctamente',
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
      render: (createdAt) => (
        <span>{new Date(createdAt).toLocaleString()}</span>
      ),
    },
    {
      key: 'emailVerifiedAt',
      label: 'Fecha de verificación',
      render: (emailVerifiedAt) => (
        <span>
          {emailVerifiedAt
            ? new Date(emailVerifiedAt).toLocaleString()
            : 'No verificado'}
        </span>
      ),
    },
    {
      key: 'roles',
      label: 'Roles',
      render: (roles) => (
        <span>
          {roles.map((role) => (
            <RoleTag key={role.id} id={role.id} name={role.name} />
          ))}
        </span>
      ),
    },
  ]

  const actions = [
    {
      label: 'Edit',
      onClick: handleEditUser,
      textColor: 'text-yellow-600',
      hoverTextColor: 'hover:text-yellow-800',
      darkTextColor: 'dark:text-yellow-400',
      darkHoverTextColor: 'dark:hover:text-yellow-200',
    },
    {
      label: 'Delete',
      onClick: handleDeleteUser,
      textColor: 'text-red-600',
      hoverTextColor: 'hover:text-red-800',
      darkTextColor: 'dark:text-red-400',
      darkHoverTextColor: 'dark:hover:text-red-200',
      disabled: (id) => id === user.id,
    },
  ]

  return (
    <>
      <Header onCreate={handleCreateUser} />
      {(isLoading || isError) && <TableSkeleton className="w-full" />}
      {isError && <p className="text-xl font-medium">Ha ocurrido un error</p>}
      {!isLoading && !isError && !isValidating && users?.length === 0 && (
        <p className="text-xl font-medium">¡Sin usuarios!</p>
      )}
      {!isLoading && users && users.length > 0 && (
        <Table
          data={users}
          columns={columns}
          actions={actions}
          totalPages={totalPages}
          links={links}
          onPageChange={handlePageChange}
        />
      )}
      <AnimatePresence>
        {selectedUser && (
          <SimpleModal
            title={`${selectedUser?.id ? `Editar` : `Crear`} usuario`}
            handleOnClose={() => setSelectedUser(null)}
          >
            <section className="flex items-start justify-center">
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
    </>
  )
}
