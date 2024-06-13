const config = require("../config")
const { pagination } = require("../functions/pagination")
const { topicListEmbed } = require("../embeds/topicListEmbed")
import { fetch } from "undici"

module.exports.listTopics = async (interaction) => {
  try {
    const getData = async ({ page }) => {
      const params = new URLSearchParams({
        page: page,
        perPage: 9,
      })

      const name = interaction.options.getString("name")

      if (name) params.append("name", name.trim())

      const res = await fetch(`${config.apiUrl}/topics?${params.toString()}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": interaction.locale.split("-")[0],
        },
      })
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
