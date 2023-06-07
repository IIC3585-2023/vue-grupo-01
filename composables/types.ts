export interface User {
  login: string
  name: string | null
  avatarUrl: string
  followers: Followers
  following: Following
}

export interface Followers {
  totalCount: number
  pageInfo?: {
    hasNextPage: boolean
    endCursor: string
  }
  edges: Array<{
    node: User
  }>
}

export interface Following extends Followers { }

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

export type PageSize = string | number
