import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import ChevronDown from '../../assets/heroicons/ChevronDown'
import DropdownWindow from './DropdownWindow'
import { motion } from 'framer-motion'

const DropdownMenu = ({
  children,
  openerIcon,
  openerText,
  isOpen,
  setIsOpen,
}) => {
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
  }, [isOpen, setIsOpen])

  const handleToggleClick = (event) => {
    event.stopPropagation()
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        onClick={handleToggleClick}
        className="inline-flex w-full justify-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {openerIcon}
        {openerText ?? <span className='hidden'>Opciones</span>}
        {isOpen ? (
          <motion.figure
            initial={{ rotate: 0 }}
            animate={{ rotate: 180 }}
            exit={{ rotate: 0 }}
          >
            <ChevronDown customClasses="size-5" />
          </motion.figure>
        ) : (
          <motion.figure
            initial={{ rotate: 0 }}
            animate={{ rotate: 0 }}
            exit={{ rotate: 180 }}
          >
            <ChevronDown customClasses="size-5" />
          </motion.figure>
        )}
      </button>

      {isOpen && (
        <DropdownWindow customClasses="flex flex-col mt-4">
          {children}
        </DropdownWindow>
      )}
    </div>
  )
}

DropdownMenu.propTypes = {
  openerIcon: PropTypes.element.isRequired,
  openerText: PropTypes.string,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}

export default DropdownMenu
