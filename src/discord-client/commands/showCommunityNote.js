const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")
const config = require("../config")
const { noteField } = require("../embeds/noteField")
const { text } = require("express")

module.exports.showCommunityNote = async (interaction) => {
  try {
    const noteId = interaction.options.getInteger("id")
    const res = await fetch(`${config.apiUrl}/public/communityNotes/${noteId}`)
    if (!res.ok) throw new Error()
    const data = await res.json()

    const note = data.data
    const embed = {
      title: `Community Note`,
      author: {
        name: note.user.username,
        icon_url: `https://ui-avatars.com/api/?name=${note.user.username}`,
      },
      description: ``,
      fields: [noteField({ note, allDescriptions: false, isLastNote: true })],
      color: 0x0099ff,
      footer: {
        text: `Created At: ${new Date(note.createdAt).toLocaleString()}${
          note.updatedAt !== note.createdAt
            ? `\nUpdated At: ${new Date(note.updatedAt).toLocaleString()}`
            : ""
        }`,
      },
    }

    const showCommunityNoteButton = new ButtonBuilder()
      .setLabel(`View on ${config.appName}`)
      .setURL(`${config.frontendUrl}/notes/${noteId}`)
      .setStyle(ButtonStyle.Link)

    const buttons = new ActionRowBuilder().addComponents([
      showCommunityNoteButton,
    ])

    await interaction.reply({
      embeds: [embed],
      components: [buttons],
    })
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: "An error occurred while fetching the note",
      ephemeral: true,
    })
  }
}
