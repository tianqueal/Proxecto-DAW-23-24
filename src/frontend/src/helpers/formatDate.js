import { Language } from './constants'

export const fullFormatDate = ({ date, language = Language.CURRENT }) => {
  const isEnglish = language.startsWith('en')
  const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: isEnglish }
  const dateObj = new Date(date)

  return `${dateObj.toLocaleDateString(language, { dateStyle: 'full' })} ${isEnglish ? 'at' : 'a las'} ${dateObj.toLocaleTimeString(language, timeOptions)}`
}

export const shortFormatDate = ({ date, language = Language.CURRENT }) =>
  new Date(date).toLocaleDateString(language, { dateStyle: 'short' })

export const timeFormatDate = ({
  date,
  language = Language.CURRENT,
  withSeconds = false,
}) => {
  const isEnglish = language.startsWith('en')
  const timeOptions = withSeconds
    ? {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: isEnglish,
      }
    : { hour: 'numeric', minute: 'numeric', hour12: isEnglish }

  return new Date(date).toLocaleTimeString(language, timeOptions)
}

export const dateAndTimeFormat = ({
  date,
  language = Language.CURRENT,
  withSeconds = false,
}) =>
  `${shortFormatDate({ date, language })} ${timeFormatDate({ date, language, withSeconds })}`
