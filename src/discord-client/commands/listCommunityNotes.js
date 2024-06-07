const config = require("../config")
const { pagination } = require("../functions/pagination")
const { noteListEmbed } = require("../embeds/noteListEmbed")

module.exports.listCommunityNotes = async (interaction) => {
  try {
    const getData = async ({ page }) => {
      const params = new URLSearchParams({
        page: page,
        perPage: 3,
      })

      /* const noteContent = interaction.options.getString("content")
      const topicsIds = interaction.options.getString("topicsIds")

      const res = await fetch(
        `${config.apiUrl}/public/communityNotes?${params.toString()}`
      )
      if (!res.ok) throw new Error()
      const data = await res.json()

      return data */

      const noteContent = interaction.options.getString("content")

      const topicsIdsString = interaction.options.getString("topics-ids")

      const topicsIds = topicsIdsString?.split(",")?.reduce((acc, id) => {
        const parsedId = parseInt(id.trim(), 10)
        if (!isNaN(parsedId)) {
          acc.push(parsedId)
        }
        return acc
      }, [])

      if (noteContent) params.append("content", noteContent)

      topicsIds?.forEach((id) => {
        params.append("topicId[]", id)
      })

      const res = await fetch(
        `${config.apiUrl}/public/communityNotes?${params.toString()}`
      )
      if (!res.ok) throw new Error()
      const data = await res.json()

      return data
    }

    await pagination({
      interaction,
      getData,
      embed: ({ data }) => noteListEmbed({ notes: data }),
    })
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: "An error occurred while fetching the notes",
      ephemeral: true,
    })
  }
}
