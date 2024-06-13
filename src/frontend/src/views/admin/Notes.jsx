import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Table from '../../components/tables/Table'
import TableSkeleton from '../../components/skeletons/TableSkeleton'
import useAdminCommunityNotes from '../../hooks/admin/useAdminCommunityNotes'
import SuccessToastify from '../../components/alerts/SuccessToastify'
import ErrorToastify from '../../components/alerts/ErrorToastify'
import useApi from '../../hooks/useApi'
import AnimatedContent from '../../components/contents/AnimatedContent'
import ErrorContent from '../../components/contents/ErrorContent'
import EmptyContent from '../../components/contents/EmptyContent'
import { dateAndTimeFormat } from '../../helpers/formatDate'

function Header() {
  return (
    <header className="mb-4 flex flex-col items-center justify-between gap-3 md:flex-row">
      <h1 className="text-3xl font-bold">Notas de la comunidad</h1>
    </header>
  )
}

export default function Notes() {
  const { changeAdminNoteStatus, deleteAdminNote } = useApi()
  const [page, setPage] = useState(1)
  const [isActionLoading, setIsActionLoading] = useState({})
  const { notes, isError, isLoading, isValidating, totalPages, links, mutate } =
    useAdminCommunityNotes(page)
  const navigate = useNavigate()

  const onSuccessfulAction = async ({ message }) => {
    await mutate()
    SuccessToastify({ message })
    setIsActionLoading({})
  }

  const onErroredAction = () => {
    ErrorToastify({ message: 'Ha ocurrido un error', autoClose: true })
  }

  const handleOnClickToView = (id) => {
    navigate(`/notes/${id}`)
  }

  const handleChangeStatus = async (id) => {
    setIsActionLoading({ id })
    await changeAdminNoteStatus({
      id,
      status: 0,
      setIsLoading: setIsActionLoading,
      onSuccess: onSuccessfulAction,
      onError: onErroredAction,
    })
  }

  const handleDeleteNote = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta nota?')) return
    setIsActionLoading({ id })
    await deleteAdminNote({
      id,
      setIsLoading: setIsActionLoading,
      onSuccess: onSuccessfulAction,
      onError: onErroredAction,
    })
  }

  const columns = [
    {
      key: 'id',
      label: 'Identificador',
    },
    {
      key: 'user',
      label: 'Identificador de usuario',
      render: (user) => user?.id,
    },
    {
      key: 'user',
      label: 'Nombre de usuario',
      render: (user) => user?.username,
    },
    {
      key: 'createdAt',
      label: 'Fecha de creación',
      render: (createdAt) =>
        dateAndTimeFormat({ date: createdAt, withSeconds: true }),
    },
    {
      key: 'updatedAt',
      label: 'Fecha de actualización',
      render: (updatedAt) =>
        updatedAt
          ? dateAndTimeFormat({ date: updatedAt, withSeconds: true })
          : 'No actualizada',
    },
  ]

  const actions = [
    {
      label: 'Visualizar',
      onClick: handleOnClickToView,
      textColor: 'text-blue-600',
      hoverTextColor: 'hover:text-blue-800',
      darkTextColor: 'dark:text-blue-400',
      darkHoverTextColor: 'dark:hover:text-blue-200',
    },
    {
      label: 'Ocultar',
      onClick: handleChangeStatus,
      textColor: 'text-yellow-600',
      hoverTextColor: 'hover:text-yellow-800',
      darkTextColor: 'dark:text-yellow-400',
      darkHoverTextColor: 'dark:hover:text-yellow-200',
    },
    {
      label: 'Eliminar',
      onClick: handleDeleteNote,
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
    <AnimatePresence>
      <motion.section
        key="section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Header />

        {(isLoading || isError) && (
          <AnimatedContent keyProp="loader">
            <TableSkeleton className="w-full scale-110" />
          </AnimatedContent>
        )}

        {isError && <ErrorContent />}

        {!isLoading && !isError && !isValidating && notes?.length === 0 && (
          <EmptyContent
            keyProp="no-community-notes"
            description="¡Sin notas en la comunidad!"
          />
        )}

        {!isLoading && notes && notes.length > 0 && (
          <AnimatedContent keyProp="table">
            <Table
              data={notes.flat()}
              columns={columns}
              actions={actions}
              isActionLoading={isActionLoading}
              totalPages={totalPages}
              links={links}
              onPageChange={handlePageChange}
            />
          </AnimatedContent>
        )}
      </motion.section>
    </AnimatePresence>
  )
}
