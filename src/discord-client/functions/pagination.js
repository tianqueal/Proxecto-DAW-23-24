const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js")
const e = require("express")

module.exports.pagination = async ({
  interaction,
  getData,
  time = 60000,
  embed,
}) => {
  try {
    if (!interaction || !getData) throw new Error("Invalid parameters")

    await interaction.deferReply()

    let page = 1
    let data = await getData({ page })

    const firstPageButton = new ButtonBuilder()
      .setCustomId("first")
      .setLabel("First")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(data.meta.current_page === 1)

    const prevPageButton = new ButtonBuilder()
      .setCustomId("prev")
      .setLabel("Previous")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(data.meta.current_page === 1)

    const nextPageButton = new ButtonBuilder()
      .setCustomId("next")
      .setLabel("Next")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(data.meta.current_page === data.meta.last_page)

    const buttons = new ActionRowBuilder().addComponents([
      firstPageButton,
      prevPageButton,
      nextPageButton,
    ])

    const msg = await interaction.editReply({
      embeds: [embed({ data })],
      components: [buttons],
      fetchReply: true,
    })

    const filter = (i) =>
      i.customId === "prev" || i.customId === "next" || i.customId === "first"

    const collector = msg.createMessageComponentCollector({
      componentType: ComponentType.Button,
      filter,
      time,
    })

    collector.on("collect", async (i) => {
      await i.deferUpdate()

      if (i.customId === "prev" && page > 1) {
        page -= 1
      }

      if (i.customId === "next") {
        page += 1
      }

      if (i.customId === "first") {
        page = 1
      }

      data = await getData({ page })

      firstPageButton.setDisabled(data.meta.current_page === 1)
      prevPageButton.setDisabled(data.meta.current_page === 1)
      nextPageButton.setDisabled(data.meta.current_page === data.meta.last_page)

      await i.editReply({
        embeds: [embed({ data })],
        components: [buttons],
      })

      collector.resetTimer()
    })

    collector.on("end", async () => {
      await interaction.editReply({
        embeds: [embed({ data })],
        components: [],
      })
    })
  } catch (error) {
    console.error(error)
    try {
      await interaction.reply("An error occurred while fetching the notes.")
    } catch (err) {
      console.error("Failed to send error message: ", err)
    }
  }
}
