const config = require("./config")

const {
  Client,
  GatewayIntentBits,
  Partials,
  ActivityType,
} = require("discord.js")
const { registerCommand, commandsMap } = require("./registerCommand")

module.exports.startBot = async () => {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
    partials: [Partials.Channel],
  })

  try {
    await registerCommand(client)
    console.log("Comandos slash registrados!")
  } catch (error) {
    console.error("Error al registrar comandos slash:", error)
  }

  client.once("ready", () => {
    client.user.setPresence({
      activities: [{ name: `notes...`, type: ActivityType.Watching }],
      status: "online",
    })

    console.log(`Conectando como ${client.user.tag}!`)
  })

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const command = commandsMap.get(interaction.commandName)

    if (!command) return

    try {
      await command(interaction)
    } catch (error) {
      console.error("Error executing command:", error)
      await interaction.reply("Something went wrong!")
    }
  })

  const token = config.token

  try {
    await client.login(token)
    console.log("Cliente conectado!")
  } catch (error) {
    console.error("Error al iniciar sesión:", error)
  }
}
