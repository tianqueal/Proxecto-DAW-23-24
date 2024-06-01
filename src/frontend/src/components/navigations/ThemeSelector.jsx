import Moon from '../../assets/heroicons/Moon'
import Sun from '../../assets/heroicons/Sun'
import DropMenuOption from './DropMenuOption'
import useApi from '../../hooks/useApi'
import DropdownMenu from './DropdrowMenu'
import { PropTypes } from 'prop-types'

export default function ThemeSelector({ isOpen, setIsOpen }) {
  const { currentTheme, setTheme } = useApi()

  const handleOptionClick = (theme) => {
    setTheme(theme)
    setIsOpen(false)
  }

  return (
    <DropdownMenu
      openerIcon={
        currentTheme === 'light' ? (
          <Sun customClasses="size-5" />
        ) : (
          <Moon customClasses="size-5" />
        )
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
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
    </DropdownMenu>
  )
}

ThemeSelector.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}
