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

  const followersThatArentFollowingBack = followers.filter(follower => !following.some(following => following.login === follower.login))
  const followingThatArentFollowersBack = following.filter(following => !followers.some(follower => follower.login === following.login))

  return {
    followersThatArentFollowingBack,
    followingThatArentFollowersBack,
  }
}
