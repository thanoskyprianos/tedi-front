export const endpoint = 'https://localhost:8080';

export const properties = {
  endpoint: endpoint,
  login: `${endpoint}/users/login`,
  register: `${endpoint}/users/register`,
  logout: `${endpoint}/users/logout`,

  user: `${endpoint}/users/`,
  self: `${endpoint}/users/self`,

  admin: `${endpoint}/admin`,
}

export const postOf = (userId: number, postId: number) => {
  return `${postsOf(userId)}/${postId}`
}

export const postsOf = (userId: number) => {
  return `${properties.user}${userId}/posts`
}

export const postsFor = (userId: number, page: number) => {
  return `${postsOf(userId)}/for?page=${page}`
}

export const jobOff = (userId: number, page: number) => {
  return `${postsOf(userId)}/job-offers?page=${page}`
}

export const info = (userId: number) => {
  return `${properties.user}${userId}/info`
}

export const infoPrivacy = (userId: number) => {
  return `${info(userId)}/privacy`;
}

export const messages = (friendId: number) => {
  return `${endpoint}/messages/${friendId}`;
}

