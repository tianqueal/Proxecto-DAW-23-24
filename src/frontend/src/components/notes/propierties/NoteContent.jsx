import PropTypes from 'prop-types'

const HeaderTag = ({ level, className, children }) => {
  const Tag = `h${level}`

  return <Tag className={className}>{children}</Tag>
}

HeaderTag.propTypes = {
  level: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

const headerClasses = {
  1: 'text-4xl font-extrabold dark:text-white',
  2: 'text-3xl font-bold dark:text-white',
  3: 'text-2xl font-semibold dark:text-white',
  4: 'text-xl font-medium dark:text-white',
  5: 'text-lg font-normal dark:text-white',
  6: 'text-base dark:text-white',
}

const NoteContent = ({ noteId, content }) => {
  const renderContent = (block) => {
    if (block.data?.text.length >= 80)
      block.data.text = `${block.data.text.substring(0, 80)}...`

    switch (block.type) {
      case 'header':
        return (
          <HeaderTag
            level={block.data?.level ?? 1}
            className={headerClasses[block.data?.level ?? 1]}
          >
            {block.data.text}
          </HeaderTag>
        )
      case 'paragraph':
        return (
          <p
            className="mt-2 dark:text-gray-300"
            dangerouslySetInnerHTML={{
              __html: block.data.text.replace(
                /<mark class="cdx-marker">(.+?)<\/mark>/g,
                '<mark class="bg-yellow-300 dark:bg-yellow-600">$1</mark>',
              ),
            }}
          ></p>
        )
      default:
        return null
    }
  }

  return (
    <section
      aria-label="Contenido de la nota"
      className="flex flex-1 flex-col gap-2 text-wrap"
    >
      {content.length > 0 ? (
        content.map((block, index) => (
          <section key={index}>{renderContent(block)}</section>
        ))
      ) : (
        <section>
          <h2 className={`${headerClasses[3]} italic`}>Sin título #{noteId}</h2>
        </section>
      )}
    </section>
  )
}

NoteContent.propTypes = {
  noteId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  content: PropTypes.array.isRequired,
}

export default NoteContent
