const { topicField } = require("./topicField")

module.exports.topicListEmbed = ({ topics }) => {
  let description = "List of topics"
  if (!topics.data || topics.data.length === 0) {
    description = "No topics to display"
  }

  return {
    title: "Topics",
    description,
    color: 0x0099ff,
    fields: topics.data
      ? [
          { name: "\u200b", value: "" },
          ...topics.data.map((topic) => topicField({ topic })),
        ]
      : [],
    footer: {
      text: `Page ${topics.meta.current_page} of ${topics.meta.last_page}  |  Total topics: ${topics.meta.total}`,
    },
  }
}
