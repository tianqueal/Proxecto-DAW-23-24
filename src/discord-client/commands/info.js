const config = require("../config")
const { fetch } = require("undici")

module.exports.info = async (interaction) => {
  try {
    await interaction.deferReply()
    const apiStartTime = Date.now()
    const res = await fetch(config.apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": interaction.locale.split("-")[0],
      },
    })
    const apiEndTime = Date.now()
    const apiLatency = apiEndTime - apiStartTime

    if (!res?.ok) throw new Error()
    const data = await res.json()

    const apiWsLatency = interaction.client.ws.ping

    const botLatency = Date.now() - interaction.createdTimestamp

    const embed = {
      title: `${config.appName} API + Discord Client`,
      description: "API Information and Latency Data",
      color: parseInt("0099ff", 16),
      fields: [
        {
          name: "Location assigned by Discord API",
          value: interaction.locale,
        },
        {
          name: "Response from `GET /api/v1`",
          value: "```json\n" + JSON.stringify(data, null, 2) + "\n```",
        },
        {
          name: "API Latency",
          value: `${apiLatency}ms`,
        },
        {
          name: "API WebSocket Latency",
          value: `${apiWsLatency}ms`,
        },
        {
          name: "Bot Latency",
          value: `${botLatency}ms`,
        },
      ],
      timestamp: new Date(),
    }

    await interaction.editReply({ embeds: [embed] })
  } catch (error) {
    console.log(error)
    await interaction.editReply({
      content: "An error occurred",
      ephemeral: true,
    })
  }
}
