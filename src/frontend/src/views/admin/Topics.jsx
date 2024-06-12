import { useState } from 'react'
import { PropTypes } from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
// import Button from '../../components/form/Button'
import Table from '../../components/tables/Table'
import TableSkeleton from '../../components/skeletons/TableSkeleton'
import useAdminTopics from '../../hooks/admin/useAdminTopics'
import { Language } from '../../helpers/constants'
import AnimatedContent from '../../components/contents/AnimatedContent'
import ErrorContent from '../../components/contents/ErrorContent'
import useApi from '../../hooks/useApi'
import SuccessToastify from '../../components/alerts/SuccessToastify'
import ErrorToastify from '../../components/alerts/ErrorToastify'

function Header(/* { onCreate } */) {
  return (
    <header className="mb-4 flex flex-col items-center justify-between gap-3 md:flex-row">
      <h1 className="text-3xl font-bold">Temas</h1>
      {/* <Button
        type="button"
        onClick={onCreate}
        className="bg-blue-500 text-white ring-blue-600 hover:bg-blue-600 focus:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:bg-blue-900"
        text="Crear un nuevo tema"
      /> */}
    </header>
  )
}

Header.propTypes = {
  onCreate: PropTypes.func,
}

export default function Topics() {
  const { deleteAdminTopic } = useApi()
  const [page, setPage] = useState(1)
  const [isActionLoading, setIsActionLoading] = useState({})
  const {
    topics,
    isError,
    isLoading,
    isValidating,
    totalPages,
    links,
    mutate,
  } = useAdminTopics(page)

  const onSuccessfulAction = async ({ message }) => {
    await mutate()
    SuccessToastify({ message })
    setIsActionLoading({})
  }

  const onErroredAction = () => {
    ErrorToastify({ message: 'Ha ocurrido un error', autoClose: true })
  }

  /* const handleCreateTopic = () => {
      console.log('Crear tema')
  } */

  const handleDeleteTopic = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este tema?')) return
    setIsActionLoading({ id })
    await deleteAdminTopic({
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
      key: 'name',
      label: `Nombre (${Language.CURRENT})`,
    },
    {
      key: 'originalName',
      label: 'Nombre original',
    },
  ]

  const actions = [
    /* {
      label: 'Edit',
      onClick: (id) => console.log('Edit', id),
      textColor: 'text-yellow-600',
      hoverTextColor: 'hover:text-yellow-800',
      darkTextColor: 'dark:text-yellow-400',
      darkHoverTextColor: 'dark:hover:text-yellow-200',
    }, */
    {
      label: 'Eliminar',
      onClick: handleDeleteTopic,
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
        <Header /* onCreate={handleCreateTopic} */ />

        {(isLoading || isError) && (
          <AnimatedContent keyProp="loader">
            <TableSkeleton className="w-full scale-110" />
          </AnimatedContent>
        )}

        {isError && <ErrorContent />}

        {!isLoading && !isError && !isValidating && topics?.length === 0 && (
          <ErrorContent keyProp="no-topics" description="¡Sin temas!" />
        )}

        {!isLoading && topics && topics.length > 0 && (
          <AnimatedContent keyProp="table">
            <Table
              data={topics}
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
