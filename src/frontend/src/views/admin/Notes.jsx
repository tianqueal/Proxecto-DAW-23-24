import { useState } from 'react'
import Table from '../../components/tables/Table'
import TableSkeleton from '../../components/skeletons/TableSkeleton'
import useAdminCommunityNotes from '../../hooks/admin/useAdminCommunityNotes'

function Header() {
  return (
    <header className="mb-4 flex flex-col items-center justify-between gap-3 md:flex-row">
      <h1 className="text-3xl font-bold">Notas de la comunidad</h1>
    </header>
  )
}

export default function Notes() {
  const [page, setPage] = useState(1)
  const { notes, isError, isLoading, isValidating, totalPages, links } =
    useAdminCommunityNotes(page)

  const columns = [
    {
      key: 'id',
      label: 'Identificador',
    },
    {
      key: 'user',
      label: 'Identificador de usuario',
      render: (user) => <span>{user?.id}</span>,
    },
    {
      key: 'user',
      label: 'Nombre de usuario',
      render: (user) => <span>{user?.username}</span>,
    },
    {
      key: 'createdAt',
      label: 'Fecha de creación',
      render: (createdAt) => (
        <span>{new Date(createdAt).toLocaleString()}</span>
      ),
    },
    {
      key: 'updatedAt',
      label: 'Fecha de actualización',
      render: (updatedAt) => (
        <span>
          {updatedAt ? new Date(updatedAt).toLocaleString() : 'No actualizada'}
        </span>
      ),
    },
  ]

  const actions = [
    {
      label: 'View',
      onClick: (id) => console.log('View', id),
      textColor: 'text-blue-600',
      hoverTextColor: 'hover:text-blue-800',
      darkTextColor: 'dark:text-blue-400',
      darkHoverTextColor: 'dark:hover:text-blue-200',
    },
    {
      label: 'Change status',
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
      <Header />
      {(isLoading || isError) && <TableSkeleton className="w-full" />}
      {isError && <p className="text-xl font-medium">Ha ocurrido un error</p>}
      {!isLoading && !isError && !isValidating && notes?.length === 0 && (
        <p className="text-xl font-medium">¡Sin notas en la comunidad!</p>
      )}
      {!isLoading && notes && notes.length > 0 && (
        <Table
          data={notes.flat()}
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
