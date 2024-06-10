import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import DropMenuOption from './DropMenuOption'
import useAuth from '../../hooks/useAuth'
import User from '../../assets/heroicons/User'
import Chevron from '../../assets/heroicons/Chevron'
import DropdownWindow from './DropdownWindow'
import DotPulseLoader from '../loaders/DotPulseLoader'

const DropUserMenu = ({ username }) => {
  const { logout } = useAuth({})
  const [isOpen, setIsOpen] = useState(false)
  const [isLogoutLoading, setIsLogoutLoading] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleOptionClick = () => {
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex w-full justify-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <User customClasses="w-5 h-5" />
          {username}
          <Chevron className="size-5 rotate-180" />
        </button>
      </div>

      {isOpen && (
        <DropdownWindow customClasses="flex flex-col">
          <DropMenuOption
            onClick={handleOptionClick}
            option="Perfil"
            to="/profile"
          />
          <DropMenuOption
            onClick={handleOptionClick}
            option="Mis notas"
            to="/my-notes"
          />
          {!isLogoutLoading && (
            <DropMenuOption
              onClick={async () => {
                await logout({ setIsLoading: setIsLogoutLoading })
                setIsOpen(false)
              }}
              option="Cerrar sesión"
              to="/"
            />
          )}
          {isLogoutLoading && (
            <DropMenuOption>
              <DotPulseLoader customClasses="dark:bg-white" />
            </DropMenuOption>
          )}
        </DropdownWindow>
      )}
    </div>
  )
}

export default DropUserMenu

DropUserMenu.propTypes = {
  username: PropTypes.string.isRequired,
}
