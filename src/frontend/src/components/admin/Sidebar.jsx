import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import ChevronLeft from '../../assets/heroicons/ChevronLeft'
import { useState } from 'react'

const SidebarItem = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="block rounded p-2 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:hover:bg-gray-600 dark:focus:bg-gray-600"
    >
      {children}
    </Link>
  </li>
)

SidebarItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <section
        className={`transform transition-transform ${
          isOpen ? 'absolute w-auto md:relative lg:w-72' : 'block w-auto'
        } bg-gray-800 text-white dark:bg-gray-900 dark:text-gray-200`}
        aria-labelledby="sidebar-heading"
        role="navigation"
      >
        <header
          className={`flex items-center justify-between gap-8 px-2 py-4 md:p-4`}
        >
          <h2
            id="sidebar-heading"
            className={`text-2xl font-semibold ${isOpen ? `block` : `hidden`}`}
          >
            Admin Panel
          </h2>
          <button
            className={`p-2 text-white focus:outline-none dark:bg-gray-900`}
            onClick={toggleSidebar}
            aria-label={isOpen ? 'Close Sidebar' : 'Open Sidebar'}
          >
            <ChevronLeft
              className={`size-7 transform transition-transform ${
                isOpen ? 'rotate-0' : 'rotate-180'
              }`}
            />
          </button>
        </header>
        <nav
          className={`flex-1 px-2 py-4 md:p-4 ${isOpen ? `block` : `hidden`}`}
        >
          <ul className="flex flex-col gap-1">
            <SidebarItem to="/admin/dashboard">Dashboard</SidebarItem>
            <SidebarItem to="/admin/users">Usuarios</SidebarItem>
            <SidebarItem to="/admin/notes">Notas</SidebarItem>
            <SidebarItem to="/admin/topics">Temas</SidebarItem>
          </ul>
        </nav>
      </section>
    </>
  )
}
