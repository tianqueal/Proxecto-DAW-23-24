import { Navigate } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import useAuth from './hooks/useAuth'

export default function ProtectedRoute({ element, allowedRoles }) {
  const { user } = useAuth({})

  if (!user) {
    return <Navigate to="/login" />
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
