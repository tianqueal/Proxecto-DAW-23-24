import { useEffect, useRef, useState } from 'react'
import Moon from '../../assets/heroicons/solid/Moon'
import Sun from '../../assets/heroicons/solid/Sun'
import DropMenuOption from './DropMenuOption'
import useApi from '../../hooks/useApi'
import DropdownWindow from './DropdownWindow'
import Chevron from '../../assets/heroicons/solid/Chevron'

export default function DropThemeMenu() {
  const { currentTheme, setTheme } = useApi() ?? {}
  const [isOpen, setIsOpen] = useState(false)
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

  const handleOptionClick = (theme) => {
    setIsOpen(false)
    setTheme(theme)
  }

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex w-full justify-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
        id="theme-menu"
        aria-haspopup="true"
        aria-expanded="true"
      >
        {currentTheme === 'light' && <Sun className="size-5" />}
        {currentTheme === 'dark' && <Moon className="size-5" />}
        <Chevron className="size-5 rotate-180" />
      </button>

      {isOpen && (
        <DropdownWindow customClasses="flex flex-col">
          <DropMenuOption
            onClick={() => handleOptionClick('light')}
            option="Claro"
          />
          <DropMenuOption
            onClick={() => handleOptionClick('dark')}
            option="Oscuro"
          />
          <DropMenuOption
            onClick={() => handleOptionClick('system')}
            option="Sistema"
          />
        </DropdownWindow>
      )}
    </div>
  )
}
