import { PropTypes } from 'prop-types'
import XMark from '../../assets/heroicons/solid/XMark'
import InputField from '../form/InputField'
import DropdownWindow from '../navigations/DropdownWindow'
import Hashtag from '../../assets/heroicons/solid/Hashtag'
import useTopics from '../../hooks/useTopics'
import useApi from '../../hooks/useApi'
import { useEffect, useRef } from 'react'
import BouncyLoader from '../loaders/BouncyLoader'

export default function TopicSearch({ onChange }) {
  const {
    selectedTopics,
    setSelectedTopics,
    searchTopicName,
    showDropdown,
    setShowDropdown,
    topicName,
  } = useApi()
  const { lastTopicElementRef, isError, isLoading, topics } = useTopics()
  const ref = useRef(null)

  const handleSelectTopic = (topic) => {
    if (!selectedTopics.some((selected) => selected.id === topic.id)) {
      const newTopics = [...selectedTopics, topic]
      setSelectedTopics(newTopics)
    }
    setShowDropdown(false)
  }

  const handleRemoveTopic = (topicToRemove) => {
    const newTopics = selectedTopics.filter(
      (topic) => topic.id !== topicToRemove.id,
    )
    setSelectedTopics(newTopics)
  }

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
  return (
    <>
      <section
        className="flex max-w-56 items-center justify-end gap-3"
        ref={ref}
      >
        <label htmlFor="topic_name">
          {
            <span className="hidden" aria-hidden="true">
              Buscar temas
            </span>
          }
          <Hashtag className="size-5 dark:text-gray-200" aria-hidden="true" />
        </label>
        <div className="relative">
          <InputField
            id="topic_name"
            type="text"
            name="topic_name"
            inputRef={topicName}
            placeholder="Buscar temas"
            onChange={onChange}
            className="dark:bg-gray-800 dark:text-gray-200"
            autoComplete="off"
          />
          {isLoading && topicName.current?.value !== '' && (
            <DropdownWindow customClasses="flex justify-center p-2 dark:bg-gray-800">
              <BouncyLoader />
            </DropdownWindow>
          )}
          {isError && topicName.current?.value !== '' && (
            <DropdownWindow className="dark:bg-gray-800 dark:text-gray-200">
              Error al cargar los topics
            </DropdownWindow>
          )}
          {!isLoading &&
            !isError &&
            topicName.current?.value !== '' &&
            topics?.length === 0 &&
            searchTopicName && (
              <DropdownWindow className="dark:bg-gray-800 dark:text-gray-200">
                Sin resultados
              </DropdownWindow>
            )}
          {!isLoading &&
            showDropdown &&
            topicName.current?.value !== '' &&
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
              <XMark className="size-5 dark:text-gray-200" aria-hidden="true" />
            </button>
            {topic.name}
          </div>
        ))}
      </div>
    </>
  )
}

TopicSearch.propTypes = {
  onChange: PropTypes.func.isRequired,
}
