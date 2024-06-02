const { Routes, ApplicationCommandType } = require("discord.js")
const config = require("../config")

const commands = [
  {
    name: "ping",
    description: "Pong!",
    type: ApplicationCommandType.ChatInput,
    interaction: async (interaction) => await interaction.reply("Pong!"),
  },
  {
    name: "precio",
    description: "[TEST] Obtener el listado de los precio de la luz",
    type: ApplicationCommandType.ChatInput,
    interaction: async (interaction) => {
      try {
        const res = await fetch(
          "https://api.preciodelaluz.org/v1/prices/all?zone=PCB"
        )
        if (!res?.ok) throw new Error()
        const json = await res.json()

        const prices = Object.entries(json)

        const date = prices?.[0]?.[1]?.date

        const embed = {
          title: `Precios de la luz para la zona PCB - ${new Date(
            date
          ).toLocaleDateString()}`,
          description:
            "A continuación se muestran los precios de la luz por horas:",
          color: parseInt("0099ff", 16),
          fields: prices.map(([_, value]) => {
            const priceInfo = `**Precio:** ${value.price} ${value.units}`
            const cheapInfo = value["is-cheap"] ? "Barato" : "Caro"
            const averageInfo = value["is-under-avg"]
              ? "Bajo Promedio"
              : "Sobre Promedio"

            return {
              name: `Hora: ${value.hour}`,
              value: `\n${priceInfo}\n${cheapInfo}\n${averageInfo}`,
              inline: true,
            }
          }),
          timestamp: new Date(),
        }
        await interaction.reply({ embeds: [embed] })
      } catch (error) {
        console.log(error)
        await interaction.reply("Ha ocurrido un error")
      }
    },
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
