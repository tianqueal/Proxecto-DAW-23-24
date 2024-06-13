const config = require("../config")
const { pagination } = require("../functions/pagination")
const { noteListEmbed } = require("../embeds/noteListEmbed")
const { showCommunityNote } = require("./showCommunityNote")
import { fetch } from "undici"

async function fetchNotesList({ params, locale }) {
  const queryString = params.toString()
  const response = await fetch(
    `${config.apiUrl}/public/communityNotes?${queryString}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": locale,
      },
    }
  )
  if (!response.ok) throw new Error("Failed to fetch notes list.")
  return response.json()
}

module.exports.listCommunityNotes = async (interaction) => {
  try {
    const locale = interaction.locale.split("-")[0]
    const subcommand = interaction.options.getSubcommand()

    const getData = async ({ page }) => {
      const params = new URLSearchParams({ page, perPage: 3 })
      const noteContent = interaction.options.getString("content")
      const topicsIdsString = interaction.options.getString("topics-ids")
      const username = interaction.options.getString("username")

      const topicsIds = topicsIdsString?.split(",")?.reduce((acc, id) => {
        const parsedId = parseInt(id.trim(), 10)
        if (!isNaN(parsedId) && parsedId > 0) acc.push(parsedId)
        return acc
      }, [])

      if (noteContent) params.append("content", noteContent.trim())
      if (username) params.append("username", username.trim())
      topicsIds?.forEach((id) => params.append("topicId[]", id))

      return await fetchNotesList({ params, locale })
    }

    if (subcommand === "note") {
      await showCommunityNote(interaction)
    } else if (subcommand === "list") {
      await pagination({
        interaction,
        getData,
        embed: ({ data }) => noteListEmbed({ notes: data, locale }),
      })
    }
  } catch (error) {
    console.error(error)
    await interaction.editReply({
      content: "An error occurred while fetching the notes",
      ephemeral: true,
    })
  }
}
