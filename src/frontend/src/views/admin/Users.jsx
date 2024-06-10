import { useState } from 'react'
import { PropTypes } from 'prop-types'
import Button from '../../components/form/Button'
import CubeLoader from '../../components/loaders/CubeLoader'
import useUsers from '../../hooks/admin/useUsers'
import Table from '../../components/tables/Table'
import useAuth from '../../hooks/useAuth'
import RoleTag from '../../components/auth/RoleTag'

function Header({ onCreate }) {
  return (
    <header className="my-8 flex items-center justify-between">
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
  const [page, setPage] = useState(1)
  const { users, isError, isLoading, isValidating, totalPages, links } =
    useUsers(page)

  const handleCreateUser = () => {
    console.log('Crear usuario')
  }

  const columns = [
    {
      key: 'username',
      label: 'Nombre de usuario',
    },
    {
      key: 'email',
      label: 'Email',
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
      onClick: (id) => console.log('Edit', id),
      textColor: 'text-yellow-600',
      hoverTextColor: 'hover:text-yellow-800',
      darkTextColor: 'dark:text-yellow-400',
      darkHoverTextColor: 'dark:hover:text-yellow-200',
    },
    {
      label: 'Delete',
      onClick: (id) => console.log('Delete', id),
      textColor: 'text-red-600',
      hoverTextColor: 'hover:text-red-800',
      darkTextColor: 'dark:text-red-400',
      darkHoverTextColor: 'dark:hover:text-red-200',
      disabled: (id) => id === user.id,
    },
  ]

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  return (
    <>
      <Header onCreate={handleCreateUser} />
      {isLoading && <CubeLoader className="bg-gray-800 dark:bg-white" />}
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
    </>
  )
}
