import { Navigate } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import useAuth from './hooks/useAuth'
import { Roles } from './helpers/constants'

export default function ProtectedRoute({ element, allowedRoles = [] }) {
  const { user } = useAuth({})

  // Se verifica si el usuario está autenticado
  if (user) {
    // Si es una ruta para invitados
    if (allowedRoles.includes(Roles.GUEST)) {
      // Si el usuario es administrador
      if (user?.roles?.some((role) => role.name === Roles.ADMIN)) {
        return <Navigate to="/admin/dashboard" />
      }
      // Para cualquier otro usuario (de momento)
      return <Navigate to="/my-notes" />
    }

    // Si es una ruta para usuarios autenticados o con roles permitidos
    if (
      allowedRoles.includes(Roles.USER_AUTHENTICATED) ||
      user?.roles?.some((role) => allowedRoles.includes(role.name))
    ) {
      return element
    }

    // Si el usuario no tiene roles permitidos
    return <Navigate to="/unauthorized" />
  }

  // Si el usuario no está autenticado y la ruta es para invitados
  if (allowedRoles.includes(Roles.GUEST)) {
    return element
  }

  // Si el usuario no está autenticado y la ruta es para usuarios autenticados
  return <Navigate to="/login" />
}

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
}
