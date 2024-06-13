const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")
const config = require("../config")
const { noteField } = require("../embeds/noteField")
const { text } = require("express")

module.exports.showCommunityNote = async (interaction) => {
  try {
    await interaction.deferReply()
    const noteId = interaction.options.getInteger("id")
    const res = await fetch(
      `${config.apiUrl}/public/communityNotes/${noteId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": interaction.locale.split("-")[0],
        },
      }
    )
    if (!res.ok) throw new Error()
    const data = await res.json()

    const note = data.data

    const noteContent = noteField({
      note,
      allDescriptions: false,
      isLastNote: true,
    })

    if (noteContent.value.length > 1024) {
      noteContent.value = `**The note content is too long to be displayed here.**\n[View on ${config.appName}](${config.frontendUrl}/notes/${noteId})`
    }

    const embed = {
      title: `Community Note`,
      author: {
        name: note.user.username,
        icon_url: config.avatarUrl({ username: note.user.username }),
      },
      description: ``,
      fields: [noteContent],
      color: 0x0099ff,
      footer: {
        text: `Created At: ${new Date(note.createdAt).toLocaleString(
          interaction.locale
        )}${
          note.updatedAt !== note.createdAt
            ? `\nUpdated At: ${new Date(note.updatedAt).toLocaleString(
                interaction.locale
              )}`
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

    await interaction.editReply({
      embeds: [embed],
      components: [buttons],
    })
  } catch (error) {
    console.error(error)
    await interaction.editReply({
      content: "An error occurred while displaying the note",
      ephemeral: true,
    })
  }
}
