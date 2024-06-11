import { PropTypes } from 'prop-types'
import CheckBadge from '../../assets/heroicons/solid/CheckBadge'

export default function ProfileHeader({ user }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 md:col-span-2">
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-700">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.username}`}
            alt="Imagen de perfil autogenerada"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-center flex flex-col items-center sm:text-left">
          <h2 className="flex items-center gap-2 text-2xl font-semibold dark:text-white">
            {user?.username}
            {user?.emailVerifiedAt && (
              <CheckBadge className="size-6 text-green-500 dark:text-green-400" />
            )}
          </h2>
          <p className=" text-gray-500 dark:text-gray-400">{user?.email}</p>
        </div>
      </div>
    </div>
  )
}

ProfileHeader.propTypes = {
  user: PropTypes.object.isRequired,
}
