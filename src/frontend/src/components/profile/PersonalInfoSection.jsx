import PropTypes from 'prop-types'
import { fullFormatDate } from '../../helpers/formatDate'
import RoleTag from '../auth/RoleTag'

export default function PersonalInfoSection({ user }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Información personal
      </h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="text-gray-700 dark:text-gray-300">
          <span className="block text-xl font-medium text-gray-900 dark:text-gray-400">
            Nombre de usuario
          </span>
          {user?.username}
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          <span className="block text-xl font-medium text-gray-900 dark:text-gray-400">
            Correo electrónico
          </span>
          {user?.email}
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          <span className="block text-xl font-medium text-gray-900 dark:text-gray-400">
            Fecha de creación
          </span>
          {fullFormatDate({ date: user?.createdAt })}
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          <span className="block text-xl font-medium text-gray-900 dark:text-gray-400">
            Roles
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {user?.roles?.map((role) => (
              <RoleTag key={role.id} id={role.id} name={role.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

PersonalInfoSection.propTypes = {
  user: PropTypes.object.isRequired,
}
