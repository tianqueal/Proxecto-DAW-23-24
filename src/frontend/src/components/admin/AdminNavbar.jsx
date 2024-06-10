import { useEffect, useRef, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import DropdownWindow from '../navigations/DropdownWindow'
import DropdownIcon from '../navigations/DropdownIcon'
import ChartBar from '../../assets/heroicons/ChartBar'
import Users from '../../assets/heroicons/Users'
import Pencil from '../../assets/heroicons/Pencil'
import Hashtag from '../../assets/heroicons/Hashtag'

const NavbarItem = ({ to, children }) => {
  const { pathname } = useLocation()
  const isActive = pathname === to

  const variants = {
    active: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
      },
    },
    inactive: {
      x: -2,
      opacity: 0.7,
    },
  }

  return (
    <motion.li
      className="list-none"
      initial={isActive ? 'inactive' : 'active'}
      animate={isActive ? 'active' : 'inactive'}
      variants={variants}
    >
      <Link
        to={to}
        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium focus:outline-none ${
          isActive
            ? 'bg-blue-500 text-white dark:bg-blue-600'
            : 'text-gray-800 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
        }`}
      >
        {children}
      </Link>
    </motion.li>
  )
}

NavbarItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

const NavbarGroup = ({ className, onClick }) => {
  return (
    <ul className={className} onClick={onClick}>
      <NavbarItem to="/admin/dashboard">
        <figure>
          <ChartBar className="size-5" />
        </figure>
        <>Dashboard</>
      </NavbarItem>
      <NavbarItem to="/admin/users">
        <figure>
          <Users className="size-5" />
        </figure>
        <>Usuarios</>
      </NavbarItem>
      <NavbarItem to="/admin/notes">
        <figure>
          <Pencil className="size-5" />
        </figure>
        <>Notas</>
      </NavbarItem>
      <NavbarItem to="/admin/topics">
        <figure>
          <Hashtag className="size-5" />
        </figure>
        <>Temas</>
      </NavbarItem>
    </ul>
  )
}

NavbarGroup.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

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
  }, [isOpen, setIsOpen])

  return (
    <header className="mb-8 mt-4" ref={ref}>
      <nav className="relative mx-auto rounded-md bg-white px-4 text-gray-800 shadow-md dark:bg-gray-800 dark:text-white sm:px-6 md:max-w-max lg:px-8">
        <div className="flex h-16 items-center justify-center">
          <section className="flex items-center">
            <nav className="hidden md:block">
              <NavbarGroup
                className="flex items-baseline space-x-4"
                onClick={() => setIsOpen(!isOpen)}
              />
            </nav>
          </section>
          <button
            onClick={toggleNavbar}
            className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-600 hover:bg-gray-200 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white md:hidden"
          >
            <DropdownIcon isOpen={isOpen} />
          </button>
        </div>
        <section
          className={`${isOpen ? 'block' : 'hidden'} w-full rounded-md bg-white px-4 shadow-md dark:bg-gray-800 md:hidden`}
        >
          <DropdownWindow customClasses="w-full">
            <NavbarGroup onClick={() => setIsOpen(!isOpen)} className='flex flex-col gap-4' />
          </DropdownWindow>
        </section>
      </nav>
    </header>
  )
}
