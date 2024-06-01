import PropTypes from 'prop-types'
import { fullFormatDate } from '../../helpers/formatDate'

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
              <span
                key={role.id}
                className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                  role.name === 'Admin'
                    ? 'bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-900'
                    : role.name === 'User'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-200 dark:text-blue-900'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-200 dark:text-gray-900'
                }`}
              >
                {role.name}
              </span>
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
