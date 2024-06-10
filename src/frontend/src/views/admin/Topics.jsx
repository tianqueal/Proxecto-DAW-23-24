import { useState } from 'react'
import { PropTypes } from 'prop-types'
import Button from '../../components/form/Button'
import Table from '../../components/tables/Table'
import TableSkeleton from '../../components/skeletons/TableSkeleton'
import useAdminTopics from '../../hooks/admin/useAdminTopics'

function Header({ onCreate }) {
  return (
    <header className="mb-4 flex flex-col items-center justify-between gap-3 md:flex-row">
      <h1 className="text-3xl font-bold">Temas</h1>
      <Button
        type="button"
        onClick={onCreate}
        className="bg-blue-500 text-white ring-blue-600 hover:bg-blue-600 focus:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:bg-blue-900"
        text="Crear un nuevo tema"
      />
    </header>
  )
}

Header.propTypes = {
  onCreate: PropTypes.func.isRequired,
}

export default function Topics() {
  const [page, setPage] = useState(1)
  const { topics, isError, isLoading, isValidating, totalPages, links } =
    useAdminTopics(page)

  const handleCreateUser = () => {
    console.log('Crear tema')
  }

  const columns = [
    {
      key: 'id',
      label: 'Identificador',
    },
    {
      key: 'name',
      label: 'Nombre',
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
    },
  ]

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  return (
    <>
      <Header onCreate={handleCreateUser} />
      {(isLoading || isError) && <TableSkeleton className="w-full" />}
      {isError && <p className="text-xl font-medium">Ha ocurrido un error</p>}
      {!isLoading && !isError && !isValidating && topics?.length === 0 && (
        <p className="text-xl font-medium">¡Sin temas!</p>
      )}
      {!isLoading && topics && topics.length > 0 && (
        <Table
          data={topics}
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
