import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import DropdownWindow from './DropdownWindow'
import DropdownIcon from './DropdownIcon'

const DropdownMenu = ({
  children,
  openerIcon,
  openerText,
  isOpen,
  setIsOpen,
  ariaLabel,
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
    <section
      className="relative inline-block whitespace-nowrap text-left"
      ref={ref}
    >
      <button
        type="button"
        onClick={handleToggleClick}
        className="inline-flex w-full justify-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={
          openerText
            ? `Abrir menú desplegable ${openerText}`
            : 'Abrir menú desplegable'
        }
      >
        {openerIcon}
        <span className={`${!openerText ? `sr-only` : ``}`}>
          {openerText ?? ariaLabel}
        </span>
        <DropdownIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <DropdownWindow customClasses="flex flex-col mt-4" role="menubar">
          {children}
        </DropdownWindow>
      )}
    </section>
  )
}

DropdownMenu.propTypes = {
  openerIcon: PropTypes.element.isRequired,
  openerText: PropTypes.string,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
}

export default DropdownMenu
