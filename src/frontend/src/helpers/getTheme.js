const getTheme = ({ theme = 'system' }) => {
  const userPrefersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  switch (theme) {
    case 'light':
      return 'light'
    case 'dark':
      return 'dark'
    case 'system':
      return userPrefersDark ? 'dark' : 'light'
    default:
      return userPrefersDark ? 'dark' : 'light'
  }
}

export default getTheme