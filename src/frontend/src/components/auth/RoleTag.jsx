import { PropTypes } from 'prop-types'
import { Roles } from '../../helpers/constants'

export default function RoleTag({ id, name }) {
  return (
    <span
      key={id}
      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
        name === Roles.ADMIN
          ? 'bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-900'
          : name === Roles.USER
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-200 dark:text-blue-900'
            : 'bg-gray-100 text-gray-700 dark:bg-gray-200 dark:text-gray-900'
      }`}
    >
      {name}
    </span>
  )
}

RoleTag.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
}
