const { noteEmbed } = require("./noteEmbed")

module.exports.noteListEmbed = ({ notes }) => {
  let description = "List of community notes"
  if (!notes.data || notes.data.length === 0) {
    description = "No community notes to display"
  }

  return {
    title: "Community Notes",
    description,
    color: 0x0099ff,
    fields: notes.data ? notes.data.map((note) => noteEmbed({ note })) : [],
    footer: {
      text: `Page ${notes.meta.current_page} of ${notes.meta.last_page}`,
    },
  }
}
