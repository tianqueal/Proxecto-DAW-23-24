const config = require("../config")
const { noteEmbed } = require("../embeds/noteEmbed")

module.exports.showCommunityNote = async (interaction) => {
  try {
    const noteId = interaction.options.getInteger("id")
    const res = await fetch(`${config.apiUrl}/public/communityNotes/${noteId}`)
    if (!res.ok) throw new Error()
    const data = await res.json()

    const note = data.data
    const embed = {
      title: `Community Note`,
      description: ``,
      fields: [noteEmbed({ note, allDescriptions: false })],
      color: 0x0099ff,
    }

    await interaction.reply({
      embeds: [embed],
    })
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: "An error occurred while fetching the note",
      ephemeral: true,
    })
  }
}
