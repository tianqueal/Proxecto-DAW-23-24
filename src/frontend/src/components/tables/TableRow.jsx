import { PropTypes } from 'prop-types'

function TableRow({ item, columns, actions }) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
      {columns.map((column, index) => (
        <td
          key={index}
          className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200"
        >
          {typeof column.render === 'function'
            ? column.render(item[column.key], item)
            : item[column.key]}
        </td>
      ))}
      <td className="flex gap-2 whitespace-nowrap px-6 py-4 text-sm font-medium">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            disabled={action?.disabled?.(item.id)}
            onClick={() => action.onClick(item.id)}
            className={`inline-flex items-center text-sm font-semibold 
              ${action.textColor || 'text-blue-600'} 
              ${action.hoverTextColor || 'hover:text-blue-800'} 
              ${action.darkTextColor || 'dark:text-blue-400'} 
              ${action.darkHoverTextColor || 'dark:hover:text-blue-200'}
            `}
          >
            {action.label}
          </button>
        ))}
      </td>
    </tr>
  )
}

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
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
}

export default TableRow
