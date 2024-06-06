module.exports.noteEmbed = ({ note }) => {
  const noteContent = JSON.parse(note.content)
    .blocks.map((block) => {
      if (block.type === "header") {
        return `**${block.data.text}**`
      } else if (block.type === "paragraph") {
        // Reemplaza las etiquetas <code class="inline-code"> y <mark class="cdx-marker"> con el formato de Discord
        return block.data.text
          .replace(/<code class="inline-code">(.*?)<\/code>/g, "`$1`")
          .replace(/<mark class="cdx-marker">(.*?)<\/mark>/g, "`$1`")
      } else {
        return ""
      }
    })
    .join(" ")

  const topics = note.topics
    .map((topic) => `#${topic.name.replace(/\s/g, "-")}`)
    .join(", ")

  return {
    name: `Note ID: ${note.id}`,
    value: `**User**: ${
      note.user.username
    }\n**Content**: ${noteContent}\n**Topics**: ${
      topics || "No topics"
    }\n**Created At**: ${new Date(note.createdAt).toLocaleString()}`,
  }
}
