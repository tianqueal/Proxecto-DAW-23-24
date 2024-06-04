export const NoteFetchTypes = {
  COMMUNITY_NOTES: 'communityNotes',
  MY_NOTES: 'myNotes',
}

export const Roles = {
  ADMIN: 'Admin',
  USER: 'User',
  GUEST: 'Guest',
  USER_AUTHENTICATED: 'UserAuthenticated',
}

export const DiscordClientURL = () => {
  const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID

  const params = new URLSearchParams({
    client_id: clientId,
  })

  return `https://discord.com/api/oauth2/authorize?${params.toString()}`
}
