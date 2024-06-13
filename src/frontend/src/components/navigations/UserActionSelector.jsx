import PropTypes from 'prop-types'
import DropMenuOption from './DropMenuOption'
import useAuth from '../../hooks/useAuth'
import User from '../../assets/heroicons/solid/User'
import DotPulseLoader from '../loaders/DotPulseLoader'
import DropdownMenu from './DropdrowMenu'
import useApi from '../../hooks/useApi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserActionSelector = ({ username, isOpen, setIsOpen, uniqueId }) => {
  const { user, logout } = useAuth({})
  const { currentTheme } = useApi() ?? {}
  const [isLogoutLoading, setIsLogoutLoading] = useState(false)
  const navigate = useNavigate()

  const handleOptionClick = async (action = '') => {
    if (action === 'logout') {
      await logout({ setIsLoading: setIsLogoutLoading })
      navigate('/')
    }
    setIsOpen(false)
  }

  // const isCurrentPath = (path) => location.pathname === path

  return (
    <li>
      <DropdownMenu
        openerIcon={<User className="size-5" />}
        openerText={username}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <DropMenuOption
          onClick={handleOptionClick}
          option="Perfil"
          to="/profile"
          // isActive={isCurrentPath('/profile')}
          // uniqueId={uniqueId}
        />
        {user?.isAdmin === true && (
          <DropMenuOption
            to="/admin/dashboard"
            option="Administración"
            onClick={handleOptionClick}
            // isActive={isCurrentPath('/admin/dashboard')}
            uniqueId={uniqueId}
          />
        )}
        {user?.isAdmin === false && (
          <DropMenuOption
            to="/my-notes"
            option="Mis notas"
            onClick={handleOptionClick}
            // isActive={isCurrentPath('/my-notes')}
            // uniqueId={uniqueId}
          />
        )}
        {!isLogoutLoading && (
          <DropMenuOption
            onClick={() => handleOptionClick('logout')}
            option="Salir"
            customClasses="text-red-500 dark:text-red-400"
          />
        )}
        {isLogoutLoading && (
          <DropMenuOption option="Cerrando sesión...">
            <DotPulseLoader
              dotColor={currentTheme === 'light' ? '#000' : '#fff'}
            />
          </DropMenuOption>
        )}
      </DropdownMenu>
    </li>
  )
}

UserActionSelector.propTypes = {
  username: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  uniqueId: PropTypes.string,
}

export default UserActionSelector
