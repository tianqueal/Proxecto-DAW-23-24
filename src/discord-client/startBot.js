const config = require("./config")

const {
  Client,
  GatewayIntentBits,
  Partials,
  ActivityType,
} = require("discord.js")
const { registerCommand, commandsMap } = require("./registerCommand.js")

module.exports.startBot = async () => {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
    partials: [Partials.Channel],
  })

  try {
    await registerCommand(client)
    console.log('Slash commands registered!')
  } catch (error) {
    console.error(error)
  }

  client.once("ready", () => {
    client.user.setPresence({
      activities: [{ name: `notes...`, type: ActivityType.Watching }],
      status: "online",
    })

    console.log(`Logged in as ${client.user.tag}!`)
  })

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const command = commandsMap.get(interaction.commandName)

    if (!command) return

    try {
      await command(interaction)
    } catch (error) {
      console.error("Error executing command:", error)
      await interaction.reply("Something went wrong! :(")
    }
  })

  const token = config.token

  try {
    await client.login(token)
    console.log('Bot logged in!')
  } catch (error) {
    console.error(error)
  }
}
