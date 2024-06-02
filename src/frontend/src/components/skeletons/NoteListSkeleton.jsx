import { PropTypes } from 'prop-types'
import NoteCardSkeleton from './NoteCardSkeleton'

export default function NoteListSkeleton({ numCards = 6 }) {
  return (
    <>
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {[...Array(numCards)].map((_, index) => (
          <NoteCardSkeleton key={index} className='w-full' />
        ))}
      </section>
    </>
  )
}

NoteListSkeleton.propTypes = {
  numCards: PropTypes.number,
}
