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

export const LayoutTypes = {
  DEFAULT:
    '2xl:max-w-7xl" mx-auto min-h-screen w-full flex-1 p-4 sm:max-w-xl md:w-screen md:max-w-2xl lg:max-w-4xl xl:max-w-6xl',
  FULLSCREEN: 'mx-auto w-full flex-1',
}

export const RefreshInterval = {
  ADMIN_STATS: 5000,
  ADMIN_NOTES: 2 * 60 * 1000,
  ADMIN_USERS: 2 * 60 * 1000,
  ADMIN_TOPICS: 2 * 60 * 1000,
}

export const DiscordClientURL = () => {
  const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID

  const params = new URLSearchParams({
    client_id: clientId,
  })

  return `https://discord.com/oauth2/authorize?${params.toString()}`
}
