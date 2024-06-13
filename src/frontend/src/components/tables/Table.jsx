import { PropTypes } from 'prop-types'
import TableRow from './TableRow'
import TablePagination from './TablePagination'

export default function Table({
  data,
  columns,
  actions,
  isActionLoading = {},
  links,
  onPageChange,
}) {
  return (
    <section className="flex flex-col">
      <div className="-mx-1.5 overflow-x-auto">
        <article className="inline-block min-w-full p-1.5 align-middle">
          <div className="divide-y divide-gray-200 overflow-hidden rounded-lg border dark:divide-gray-700">
            <header className="bg-white dark:bg-gray-800">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {columns.map((column, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                      >
                        {column.label}
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {data.map((item) => (
                    <TableRow
                      key={item.id}
                      item={item}
                      columns={columns}
                      actions={actions}
                      isActionLoading={isActionLoading}
                    />
                  ))}
                </tbody>
              </table>
            </header>
            <footer>
              <TablePagination links={links} onPageChange={onPageChange} />
            </footer>
          </div>
        </article>
      </div>
    </section>
  )
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      textColor: PropTypes.string,
      hoverTextColor: PropTypes.string,
      darkTextColor: PropTypes.string,
      darkHoverTextColor: PropTypes.string,
    }),
  ).isRequired,
  isActionLoading: PropTypes.object,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      label: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onPageChange: PropTypes.func.isRequired,
}
