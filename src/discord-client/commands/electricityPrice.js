module.exports.electricityPrice = async (interaction) => {
  try {
    await interaction.deferReply()
    const res = await fetch(
      "https://api.preciodelaluz.org/v1/prices/all?zone=PCB",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    if (!res?.ok) throw new Error()
    const data = await res.json()

    const prices = Object.entries(data)

    const date = prices?.[0]?.[1]?.date

    const embed = {
      title: `Precios de la luz para la zona PCB - ${new Date(
        date
      ).toLocaleDateString(interaction.locale)}`,
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
    await interaction.editReply({ embeds: [embed] })
  } catch (error) {
    console.log(error)
    await interaction.editReply({
      content: "Ha ocurrido un error",
      ephemeral: true,
    })
  }
}
