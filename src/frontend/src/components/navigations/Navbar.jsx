import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useAuth from '../../hooks/useAuth'
import Logo from './Logo'
import NavbarLink from './NavbarLink'
import DotPulseLoader from '../loaders/DotPulseLoader'
import UserActionSelector from './UserActionSelector'
import ThemeSelector from './ThemeSelector'
import useApi from '../../hooks/useApi'
import Sun from '../../assets/heroicons/Sun'
import Moon from '../../assets/heroicons/Moon'
import MenuToggle from './MenuToggle'
import { resetScrollPosition } from '../../helpers/resetScrollPosition'
import './Navbar.css'

export default function Navbar() {
  const { currentTheme, setTheme } = useApi()
  const { user, logout } = useAuth({})
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLogoutLoading, setIsLogoutLoading] = useState(false)
  const [isMenuThemeOpen, setIsMenuThemeOpen] = useState(false)
  const [isMenuUserOpen, setIsMenuUserOpen] = useState(false)

  const handleMenuClose = () => {
    resetScrollPosition()
    setIsMenuOpen(false)
  }

  const handleMenuClick = () => {
    resetScrollPosition()
  }

  return (
    /* overlay-A positioner sticky top-0 z-30 flex h-16 w-full justify-center bg-white bg-opacity-30 px-2 backdrop-blur-lg backdrop-saturate-150 dark:bg-gray-900 dark:bg-opacity-30 */
    <nav className="overlay__blur sticky top-0 z-10 flex h-16 w-full justify-center px-2">
      <div className="z-30 flex w-full max-w-7xl items-center justify-between">
        <NavbarLink to="/" onClick={handleMenuClick}>
          <Logo />
        </NavbarLink>
        <ul className="hidden items-center gap-4 md:flex">
          <NavbarLink
            to="/community"
            option="Comunidad"
            onClick={handleMenuClick}
          />
          <NavbarLink
            to="/discord"
            option="Discord"
            onClick={handleMenuClick}
          />
          {user && (
            <UserActionSelector
              username={user?.username ?? 'user'}
              isOpen={isMenuUserOpen}
              setIsOpen={setIsMenuUserOpen}
            />
          )}
          {!user && (
            <>
              <NavbarLink
                to="/register"
                option="Registro"
                onClick={handleMenuClick}
              />
              <NavbarLink
                to="/login"
                option="Iniciar sesión"
                onClick={handleMenuClick}
              />
            </>
          )}
          <ThemeSelector
            isOpen={isMenuThemeOpen}
            setIsOpen={setIsMenuThemeOpen}
          />
        </ul>
        <figure className="sticky top-0 z-50 flex items-center md:hidden">
          <MenuToggle
            className="z-50 size-10 stroke-current text-gray-700 dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            isActive={isMenuOpen}
          />
        </figure>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, translateX: '100%' }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: '100%' }}
            transition={{ duration: 0.1, type: 'just' }}
            className="overlay__blur fixed inset-0 z-20 flex h-screen flex-col items-center justify-center md:hidden"
            role="dialog"
          >
            <ul className="z-50 mt-10 flex flex-col items-center gap-4 text-gray-700 dark:text-gray-300">
              {!user && (
                <NavbarLink to="/" option="Inicio" onClick={handleMenuClose} />
              )}
              <NavbarLink
                to="/community"
                option="Comunidad"
                onClick={handleMenuClose}
              />
              <NavbarLink
                to="/discord"
                option="Discord"
                onClick={handleMenuClose}
              />
              {user && (
                <div className="mt-4 flex flex-col items-center gap-4">
                  <NavbarLink
                    to="/profile"
                    option="Perfil"
                    onClick={handleMenuClose}
                  />
                  {user?.isAdmin === true && (
                    <NavbarLink
                      to="/admin/dashboard"
                      option="Administrador"
                      onClick={handleMenuClose}
                    />
                  )}
                  {user?.isAdmin === false && (
                    <NavbarLink
                      to="/my-notes"
                      option="Mis notas"
                      onClick={handleMenuClose}
                    />
                  )}
                  {!isLogoutLoading && (
                    <NavbarLink
                      to="/"
                      option="Cerrar sesión"
                      onClick={async () => {
                        await logout({ setIsLoading: setIsLogoutLoading })
                        handleMenuClose()
                      }}
                    />
                  )}
                  {isLogoutLoading && (
                    <div className="flex h-4 items-center">
                      <DotPulseLoader />
                    </div>
                  )}
                </div>
              )}
              {!user && (
                <>
                  <NavbarLink
                    to="/register"
                    option="Registro"
                    onClick={handleMenuClose}
                  />
                  <NavbarLink
                    to="/login"
                    option="Iniciar sesión"
                    onClick={handleMenuClose}
                  />
                </>
              )}
              <NavbarLink>
                {currentTheme === 'light' ? (
                  <motion.span
                    onClick={() => setTheme('dark')}
                    aria-label="Cambiar a modo oscuro"
                  >
                    <Sun customClasses="size-10" />
                  </motion.span>
                ) : (
                  <motion.span
                    onClick={() => setTheme('light')}
                    aria-label="Cambiar a modo claro"
                  >
                    <Moon customClasses="size-10" />
                  </motion.span>
                )}
              </NavbarLink>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </nav>
  )
}
