import { PropTypes } from 'prop-types'
import DotPulseLoader from '../loaders/DotPulseLoader'
import useApi from '../../hooks/useApi'

function TableRow({ item, columns, actions, isActionLoading = {} }) {
  const { currentTheme } = useApi()

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
      <td
        className={`flex ${actions?.length === 1 ? `justify-start` : `justify-center`} gap-4 whitespace-nowrap px-6 py-4 text-sm font-medium`}
      >
        {isActionLoading?.id === item?.id && (
          <DotPulseLoader
            dotColor={currentTheme === 'light' ? '#000' : '#fff'}
          />
        )}
        {isActionLoading?.id !== item?.id &&
          actions.map((action) => (
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
  isActionLoading: PropTypes.object,
}

export default TableRow
