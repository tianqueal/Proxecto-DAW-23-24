const config = require("../config")
const { topicField } = require("../embeds/topicField")

module.exports.showTopic = async (interaction) => {
  try {
    const topicId = interaction.options.getInteger("id")
    const res = await fetch(`${config.apiUrl}/topics/${topicId}`)
    if (!res.ok) throw new Error()
    const data = await res.json()

    const topic = data.data
    const embed = {
      title: `Topic`,
      description: ``,
      fields: [topicField({ topic })],
      color: 0x0099ff,
    }

    await interaction.reply({
      embeds: [embed],
    })
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: "An error occurred while fetching the topic",
      ephemeral: true,
    })
  }
}
