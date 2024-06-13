module.exports = {
  PORT: process.env.PORT,
  token: process.env.TOKEN,
  apiUrl: process.env.API_URL,
  frontendUrl:
    process.env.FRONTEND_URL.split("=")[1] ?? process.env.FRONTEND_URL,
  clientId: process.env.CLIENT_ID,
  appName: process.env.APP_NAME,
  guildId: null,
  avatarUrl: ({ username }) => {
    const params = new URLSearchParams({
      format: "png",
      size: 512,
      name: username,
    })
    return `https://ui-avatars.com/api/?${params.toString()}`
  },
}
