export const endpoint = 'http://localhost:8080';

export const properties = {
  endpoint: endpoint,
  login: `${endpoint}/users/login`,
  register: `${endpoint}/users/register`,
  logout: `${endpoint}/users/logout`,

  user: `${endpoint}/users/`,
  self: `${endpoint}/users/self`,
}

export const posts = (userId: number) => {
  return `${properties.user}${userId}/posts`
}
