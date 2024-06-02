export const fullFormatDate = ({ date, language = 'es-ES' }) => {
  const isEnglish = language.startsWith('en')
  const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: isEnglish }
  const dateObj = new Date(date)

  return `${dateObj.toLocaleDateString(language, { dateStyle: 'full' })} ${isEnglish ? 'at' : 'a las'} ${dateObj.toLocaleTimeString(language, timeOptions)}`
}

export const shortFormatDate = ({ date, language = 'es-ES' }) => {
  return new Date(date).toLocaleDateString(language, { dateStyle: 'short' })
}

export const timeFormatDate = ({ date, language = 'es-ES' }) => {
  const isEnglish = language.startsWith('en')
  const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: isEnglish }

  return new Date(date).toLocaleTimeString(language, timeOptions)
}

export const dateAndTimeFormat = ({ date, language = 'es-ES' }) => {
  return `${shortFormatDate({ date, language })} ${timeFormatDate({ date, language })}`
}
