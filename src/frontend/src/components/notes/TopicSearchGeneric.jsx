import { PropTypes } from 'prop-types'
import XMark from '../../assets/heroicons/XMark'
import InputField from '../form/InputField'
import DropdownWindow from '../navigations/DropdownWindow'
import Hashtag from '../../assets/heroicons/Hashtag'
import { useEffect, useRef } from 'react'
import BouncyLoader from '../loaders/BouncyLoader'
import useTopics from '../../hooks/useTopics'

const TopicSearchGeneric = ({
  selectedTopics,
  onSelectTopic,
  onRemoveTopic,
  onSearchChange,
  searchTopicName,
  showDropdown,
  setShowDropdown,
}) => {
  const { lastTopicElementRef, isError, isLoading, topics } = useTopics()
  const ref = useRef(null)
  const topicName = useRef('')

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && ref.current && !ref.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setShowDropdown, showDropdown])

  const handleSelectTopic = (topic) => {
    if (!selectedTopics.some((selected) => selected.id === topic.id)) {
      onSelectTopic([...selectedTopics, topic])
    }
    setShowDropdown(false)
  }

  const handleRemoveTopic = (topicToRemove) => {
    const newTopics = selectedTopics.filter(
      (topic) => topic.id !== topicToRemove.id,
    )
    onRemoveTopic(newTopics)
  }

  return (
    <>
      <section
        className="flex max-w-56 items-center justify-end gap-3"
        ref={ref}
      >
        <label htmlFor="topic_name">
          <Hashtag className="size-5 dark:text-gray-200" aria-hidden="true" />
        </label>
        <div className="relative">
          <InputField
            id="topic_name"
            type="text"
            name="topic_name"
            inputRef={topicName}
            placeholder="Buscar temas"
            onChange={onSearchChange}
            className="dark:bg-gray-800 dark:text-gray-200"
          />
          {isLoading && (
            <DropdownWindow customClasses="flex justify-center p-2 dark:bg-gray-800">
              <BouncyLoader />
            </DropdownWindow>
          )}
          {isError && (
            <DropdownWindow className="dark:bg-gray-800 dark:text-gray-200">
              Error al cargar los topics
            </DropdownWindow>
          )}
          {!isLoading &&
            !isError &&
            topics?.length === 0 &&
            searchTopicName && (
              <DropdownWindow className="dark:bg-gray-800 dark:text-gray-200">
                Sin resultados
              </DropdownWindow>
            )}
          {!isLoading &&
            showDropdown &&
            searchTopicName &&
            topics?.length > 0 && (
              <DropdownWindow
                scroll={true}
                className="dark:bg-gray-800 dark:text-gray-200"
              >
                {topics.map((topic, index) => (
                  <div
                    key={topic.id}
                    onClick={() => handleSelectTopic(topic)}
                    ref={
                      index === topics.length - 1 ? lastTopicElementRef : null
                    }
                    className="cursor-pointer rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {topic.name}
                  </div>
                ))}
              </DropdownWindow>
            )}
        </div>
      </section>
      <div className="mt-2 flex flex-wrap justify-center gap-2 text-sm font-medium dark:text-gray-200 md:justify-end">
        {selectedTopics.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center rounded-lg bg-gray-200 p-1 pr-3 dark:bg-gray-800"
          >
            <button
              onClick={() => handleRemoveTopic(topic)}
              className="mr-1 rounded-full p-1 transition-all hover:bg-gray-300 dark:hover:bg-gray-700"
              aria-label={`Remove topic ${topic.name}`}
            >
              <XMark
                customClasses="size-5 dark:text-gray-200"
                aria-hidden="true"
              />
            </button>
            {topic.name}
          </div>
        ))}
      </div>
    </>
  )
}

TopicSearchGeneric.propTypes = {
  selectedTopics: PropTypes.array.isRequired,
  onSelectTopic: PropTypes.func.isRequired,
  onRemoveTopic: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func,
  searchTopicName: PropTypes.string,
  showDropdown: PropTypes.bool,
  setShowDropdown: PropTypes.func,
}

export default TopicSearchGeneric
