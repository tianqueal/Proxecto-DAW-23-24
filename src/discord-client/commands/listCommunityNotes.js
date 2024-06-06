const config = require("../config")
const { pagination } = require("../functions/pagination")
const { noteListEmbed } = require("../embeds/noteListEmbed")

module.exports.listCommunityNotes = async (interaction) => {
  try {
    const getData = async ({ page }) => {
      const res = await fetch(
        `${config.apiUrl}/public/communityNotes?page=${page}`
      )
      if (!res.ok) throw new Error()
      const data = await res.json()

      /* return {
        title: "Community Notes",
        description: "List of community notes",
        color: 0x0099ff,
        fields: data.data.map((note) => ({
          name: `Note ID: ${note.id}`,
          value: `**User**: ${note.user.username}\n**Content**: ${JSON.parse(
            note.content
          )
            .blocks.map((block) => block.data.text)
            .join(" ")}\n**Created At**: ${new Date(
            note.createdAt
          ).toLocaleString()}`,
        })),
        footer: {
          text: `Page ${data.meta.current_page} of ${data.meta.last_page}`,
        },
      } */
      return data
    } /* 
    const res = await fetch(
      `${config.apiUrl}/public/communityNotes?page=${page}`
    )
    if (!res.ok) throw new Error()
    const data = await res.json()
*/
    await pagination({
      interaction,
      getData,
      embed: ({ data }) => noteListEmbed({ notes: data }),
    })
  } catch (error) {}
}
