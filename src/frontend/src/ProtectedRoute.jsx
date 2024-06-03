import { Navigate } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import useAuth from './hooks/useAuth'
import { Roles } from './helpers/constants'

export default function ProtectedRoute({ element, allowedRoles = [] }) {
  const { user } = useAuth({})

  if (allowedRoles.includes(Roles.GUEST) && user) {
    if (user?.roles?.some((role) => role.name === Roles.ADMIN)) {
      return <Navigate to="/admin/dashboard" />
    }
    return <Navigate to="/my-notes" />
  }

  if (allowedRoles.includes(Roles.GUEST) && !user) {
    return element
  }

  if (allowedRoles.includes(Roles.USER_AUTHENTICATED) && user) {
    return element
  }

  /* console.log({ element, allowedRoles, user }) */
  if (user?.roles?.some((role) => allowedRoles.includes(role.name)) === false) {
    return <Navigate to="/unauthorized" />
  }

  return element
}

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
}
