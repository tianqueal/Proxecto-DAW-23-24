const { Client } = require("discord.js")

const { registerCommand, commandsMap } = require("../registerCommand.js")

jest.mock("discord.js")

describe("Bot Tests", () => {
  let client

  beforeAll(() => {
    client = new Client()
    Client.mockImplementation(() => client)
  })

  test("Ping Command Test", async () => {
    const interaction = {
      reply: jest.fn(),
    }

    await commandsMap.get("ping")(interaction)

    expect(interaction.reply).toHaveBeenCalledWith("Pong!")
  })
})
