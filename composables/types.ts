export interface User {
  login: string
  name: string | null
  avatarUrl: string
  followers: {
    totalCount: number
  }
  following: {
    totalCount: number
  }
}

export interface Followers {
  totalCount: number
  edges: Array<{
    node: User
  }>
}

export interface Following extends Followers {}

export interface Viewer {
  avatarUrl: string
  login: string
  followers: Followers
  following: Following
}

export interface UserInfoQuery {
  viewer: Viewer
}

export interface UserQuery {
  user: User
}
