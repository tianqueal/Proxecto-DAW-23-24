import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useApi from '../../hooks/useApi'
import Logo from './Logo'
import NavbarLink from './NavbarLink'
import DotPulseLoader from '../loaders/DotPulseLoader'
import UserActionSelector from './UserActionSelector'
import ThemeSelector from './ThemeSelector'
import MenuToggle from './MenuToggle'
import Sun from '../../assets/heroicons/solid/Sun'
import Moon from '../../assets/heroicons/solid/Moon'
import './Navbar.css'

export default function Navbar() {
  const { currentTheme, setTheme } = useApi() ?? {}
  const { user, logout } = useAuth({})
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLogoutLoading, setIsLogoutLoading] = useState(false)
  const [isMenuThemeOpen, setIsMenuThemeOpen] = useState(false)
  const [isMenuUserOpen, setIsMenuUserOpen] = useState(false)
  const location = useLocation()

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  const isCurrentPath = (path) => location.pathname === path

  return (
    <nav
      className="overlay__blur sticky top-0 z-10 flex h-16 w-full justify-center px-2"
      role="menubar"
      aria-label="Main navigation"
    >
      <div
        className="z-30 flex w-full max-w-7xl items-center justify-between"
        role="group"
      >
        <ul role="menubar">
          <NavbarLink to="/">
            <Logo />
          </NavbarLink>
        </ul>
        <ul className="hidden items-center gap-4 md:flex" role="menubar">
          <NavbarLink
            to="/"
            option="Inicio"
            isActive={isCurrentPath('/')}
            uniqueid="desktop"
          />
          <NavbarLink
            to="/community"
            option="Comunidad"
            isActive={isCurrentPath('/community')}
            uniqueid="desktop"
          />
          <NavbarLink
            to="/discord"
            option="Discord"
            isActive={isCurrentPath('/discord')}
            uniqueid="desktop"
          />
          {user && (
            <UserActionSelector
              username={user?.username ?? 'user'}
              isOpen={isMenuUserOpen}
              setIsOpen={setIsMenuUserOpen}
              uniqueid="desktop"
            />
          )}
          {!user && (
            <>
              <NavbarLink
                to="/register"
                option="Registro"
                isActive={isCurrentPath('/register')}
                uniqueid="desktop"
              />
              <NavbarLink
                to="/login"
                option="Iniciar sesión"
                isActive={isCurrentPath('/login')}
                uniqueid="desktop"
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
            initial={{ translateX: '100%' }}
            animate={{ translateX: 0 }}
            exit={{ translateX: '100%' }}
            transition={{ duration: 0.4 }}
            className="overlay__blur fixed inset-0 z-20 flex h-screen flex-col items-center justify-center md:hidden"
            role="dialog"
            aria-label="Mobile menu"
          >
            <ul
              className="z-50 mt-10 flex flex-col items-center gap-4 text-gray-700 dark:text-gray-300"
              role="menu"
            >
              <NavbarLink
                to="/"
                option="Inicio"
                isActive={isCurrentPath('/')}
                onClick={handleMenuClose}
                uniqueid="mobile"
              />
              <NavbarLink
                to="/community"
                option="Comunidad"
                isActive={isCurrentPath('/community')}
                onClick={handleMenuClose}
                uniqueid="mobile"
              />
              <NavbarLink
                to="/discord"
                option="Discord"
                isActive={isCurrentPath('/discord')}
                onClick={handleMenuClose}
                uniqueid="mobile"
              />
              {user && (
                <>
                  <NavbarLink
                    to="/profile"
                    option="Perfil"
                    isActive={isCurrentPath('/profile')}
                    onClick={handleMenuClose}
                    uniqueid="mobile"
                  />
                  {user?.isAdmin === true && (
                    <NavbarLink
                      to="/admin/dashboard"
                      option="Administración"
                      isActive={isCurrentPath('/admin/dashboard')}
                      onClick={handleMenuClose}
                      uniqueid="mobile"
                    />
                  )}
                  {user?.isAdmin === false && (
                    <NavbarLink
                      to="/my-notes"
                      option="Mis notas"
                      isActive={isCurrentPath('/my-notes')}
                      onClick={handleMenuClose}
                      uniqueid="mobile"
                    />
                  )}
                  {!isLogoutLoading && (
                    <NavbarLink
                      to="/"
                      option="Cerrar sesión"
                      className="text-red-500 dark:text-red-400"
                      onClick={async () => {
                        await logout({ setIsLoading: setIsLogoutLoading })
                        handleMenuClose()
                      }}
                      uniqueid="mobile"
                    />
                  )}
                  {isLogoutLoading && (
                    <div className="flex h-4 items-center">
                      <DotPulseLoader />
                    </div>
                  )}
                </>
              )}
              {!user && (
                <>
                  <NavbarLink
                    to="/register"
                    option="Registro"
                    isActive={isCurrentPath('/register')}
                    onClick={handleMenuClose}
                    uniqueid="mobile"
                  />
                  <NavbarLink
                    to="/login"
                    option="Iniciar sesión"
                    isActive={isCurrentPath('/login')}
                    onClick={handleMenuClose}
                    uniqueid="mobile"
                  />
                </>
              )}
              <NavbarLink>
                {currentTheme === 'light' ? (
                  <motion.span
                    onClick={() => setTheme('dark')}
                    aria-label="Cambiar a modo oscuro"
                  >
                    <Sun className="size-10" />
                  </motion.span>
                ) : (
                  <motion.span
                    onClick={() => setTheme('light')}
                    aria-label="Cambiar a modo claro"
                  >
                    <Moon className="size-10" />
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
