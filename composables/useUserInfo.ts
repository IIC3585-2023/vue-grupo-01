import type { UserInfoQuery, User } from './types'
import { userInfoQuery } from '~/utils/queries'

type Node = {
  node: User
}

const getRelated = (edges: Node[]) => edges
  .map((edge: Node) => edge.node)
  .sort((a, b) => a.following.totalCount - b.following.totalCount)

export default async function () {
  const { data } = await useAsyncQuery<UserInfoQuery>(userInfoQuery, {
    first: 100
  })

  const followers: User[] = getRelated(data.value.viewer.followers.edges)
  const following: User[] = getRelated(data.value.viewer.following.edges)

  return {
    followers,
    following,
  }
}
