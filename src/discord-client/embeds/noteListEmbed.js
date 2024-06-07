const config = require("../config")
const { noteField } = require("./noteField")

module.exports.noteListEmbed = ({ notes, locale }) => {
  let description = "List of community notes"
  if (!notes.data || notes.data.length === 0) {
    description = "No community notes to display"
  }

  const fields = notes.data
    ? notes.data.map((note, index, array) =>
        noteField({ note, isLastNote: index === array.length - 1, locale })
      )
    : []

  return {
    title: "Community Notes",
    url: `${config.frontendUrl}/community`,
    description,
    color: 0x0099ff,
    fields: [{ name: "\u200b", value: "" }, ...fields],
    footer: {
      text: `Page ${notes.meta.current_page} of ${notes.meta.last_page}  |  Total notes: ${notes.meta.total}`,
    },
  }
}
