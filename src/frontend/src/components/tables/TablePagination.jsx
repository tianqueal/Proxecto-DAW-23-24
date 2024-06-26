import { PropTypes } from 'prop-types'
import Chevron from '../../assets/heroicons/solid/Chevron'

function TablePagination({ links, onPageChange }) {
  const handlePageClick = (url) => {
    const params = new URLSearchParams(url.split('?')[1])
    const page = parseInt(params.get('page'), 10)
    if (page) {
      onPageChange(page)
    }
  }

  return (
    <nav className="flex items-center space-x-1 rounded-b-lg bg-white px-4 py-2 dark:bg-gray-800">
      {links.map((link, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handlePageClick(link.url)}
          disabled={!link.url}
          className={`flex min-w-[40px] items-center justify-center rounded-full py-2.5 text-sm text-gray-800 transition-all hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 ${
            link.active ? 'bg-blue-600 text-white hover:text-gray-700' : ''
          } disabled:pointer-events-none disabled:opacity-50`}
        >
          {link.label.includes('Previous') ? (
            <Chevron className="size-5 -rotate-90" aria-hidden="true" />
          ) : link.label.includes('Next') ? (
            <Chevron className="size-5 rotate-90" aria-hidden="true" />
          ) : (
            link.label
          )}
        </button>
      ))}
    </nav>
  )
}

TablePagination.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      label: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default TablePagination
