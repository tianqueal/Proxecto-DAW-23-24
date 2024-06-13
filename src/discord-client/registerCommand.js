const {
  Routes,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} = require("discord.js")
const config = require("./config")
const { listCommunityNotes } = require("./commands/listCommunityNotes")
const { listTopics } = require("./commands/listTopics")
const { info } = require("./commands/info")
// const { electricityPrice } = require("./commands/electricityPrice")

const commands = [
  {
    name: "ping",
    description: "Pong!",
    type: ApplicationCommandType.ChatInput,
    interaction: async (interaction) => await interaction.reply("Pong!"),
  },
  //{
  //  name: "precio",
  //  description: "[TEST] Obtener el listado de los precio de la luz",
  //  type: ApplicationCommandType.ChatInput,
  //  interaction: electricityPrice,
  //},
  {
    name: "info",
    description: "Show info about the API",
    type: ApplicationCommandType.ChatInput,
    interaction: info,
  },
  {
    name: "community",
    description: "List community notes",
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: "list",
        description: "List notes based on criteria",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "content",
            description: "Content of the note",
            type: ApplicationCommandOptionType.String,
          },
          {
            name: "topics-ids",
            description: "ID of the topics. Format 1,2,3",
            type: ApplicationCommandOptionType.String,
          },
          {
            name: "username",
            description: "Username of the user",
            type: ApplicationCommandOptionType.String,
          },
        ],
      },
      {
        name: "note",
        description: "Show a note by ID",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "id",
            description: "ID of the note",
            type: ApplicationCommandOptionType.Integer,
            required: true,
          },
        ],
      },
    ],
    interaction: listCommunityNotes,
  },
  {
    name: "topics",
    description: "List topics",
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: "name",
        description: "Name of the topic",
        type: ApplicationCommandOptionType.String,
      },
    ],
    interaction: listTopics,
  },
]

module.exports.commandsMap = new Map(
  commands.map(({ name, interaction }) => [name, interaction])
)

module.exports.registerCommand = async (client) => {
  const token = config.token
  const rest = client.rest.setToken(token)

  await rest.put(Routes.applicationCommands(config.clientId), {
    body: commands,
  })
}
