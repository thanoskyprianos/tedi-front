export const endpoint = 'https://localhost:8080';

export const properties = {
  endpoint: endpoint,
  login: `${endpoint}/users/login`,
  register: `${endpoint}/users/register`,
  logout: `${endpoint}/users/logout`,

  user: `${endpoint}/users/`,
  self: `${endpoint}/users/self`,
}

export const postsOf = (userId: number) => {
  return `${properties.user}${userId}/posts`
}

export const postsFor = (userId: number) => {
  return `${postsOf(userId)}/for`
}

export const info = (userId: number) => {
  return `${properties.user}${userId}/info`
}

export const infoPrivacy = (userId: number) => {
  return `${info(userId)}/privacy`;
}
