import PropTypes from 'prop-types'
import AtSymbol from '../../../assets/heroicons/AtSymbol'
import Clock from '../../../assets/heroicons/Clock'
import Pencil from '../../../assets/heroicons/Pencil'
import { dateAndTimeFormat } from '../../../helpers/formatDate'

const NoteDetails = ({
  user,
  createdAt,
  updatedAt,
  className = 'text-gray-600',
}) => {
  const communClasses = `flex items-center gap-1 text-sm dark:text-gray-400 ${className}`
  return (
    <section className="flex flex-col gap-2">
      {user && (
        <p className={communClasses}>
          <AtSymbol className="size-5" />
          <span className="font-semibold">{user.username}</span>
        </p>
      )}
      <p className={communClasses}>
        <Clock className="size-5" />
        {dateAndTimeFormat({ date: createdAt })}
      </p>
      {createdAt !== updatedAt && (
        <p className={communClasses}>
          <Pencil className="size-5" />
          {dateAndTimeFormat({ date: updatedAt })}
        </p>
      )}
    </section>
  )
}

NoteDetails.propTypes = {
  user: PropTypes.object,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default NoteDetails
