module.exports.topicField = ({ topic }) => {
  return {
    name: `**${topic.id}** - ${topic.name}`,
    value: ``,
    inline: true,
  }
}
