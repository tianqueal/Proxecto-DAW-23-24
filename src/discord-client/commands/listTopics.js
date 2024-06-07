const config = require("../config")
const { pagination } = require("../functions/pagination")
const { topicListEmbed } = require("../embeds/topicListEmbed")

module.exports.listTopics = async (interaction) => {
  try {
    const getData = async ({ page }) => {
      const params = new URLSearchParams({
        page: page,
        perPage: 5,
      })

      const res = await fetch(`${config.apiUrl}/topics?${params.toString()}`)
      if (!res.ok) throw new Error()
      const data = await res.json()

      return data
    }

    await pagination({
      interaction,
      getData,
      embed: ({ data }) => topicListEmbed({ topics: data }),
    })
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: "An error occurred while fetching the topics",
      ephemeral: true,
    })
  }
}
