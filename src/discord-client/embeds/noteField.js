module.exports.noteField = ({ note, allDescriptions = true, isLastNote }) => {
  const noteContent = JSON.parse(note.content)
    .blocks.map((block, index, array) => {
      if (block.type === "header") {
        return `**${block.data.text}**\n`
      } else if (block.type === "paragraph") {
        return block.data.text
          .replace(/<code class="inline-code">(.*?)<\/code>/g, "`$1`")
          .replace(/<mark class="cdx-marker">(.*?)<\/mark>/g, "`$1`")
          .concat(index !== array.length - 1 ? "\n" : "")
      } else {
        return ""
      }
    })
    .join(" ")

  const topics = note.topics
    .map((topic) => `\`#${topic.name.replace(/\s/g, "-")}\``)
    .join(" ")
  const separator = isLastNote ? "" : "---------------"

  if (!allDescriptions) {
    return {
      name: ``,
      value: `
      Note ID: ${note.id}

      ${noteContent}
      
      **Topics**: ${topics || "No topics"}
      `,
    }
  }

  return {
    name: ``,
    value: `
    **Note ID**: ${note.id}  |  **User**: ${note.user.username}

    ${noteContent}
    
    **Topics**: ${topics || "No topics"}
    
    **Created At**: ${new Date(note.createdAt).toLocaleString()}
    ${
      note.updatedAt !== note.createdAt
        ? `**Updated At**: ${new Date(note.updatedAt).toLocaleString()}`
        : ""
    }
    ${separator}`,
  }
}
