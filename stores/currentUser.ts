import { defineStore } from 'pinia'
import type { UserInfoQuery, User } from '~/composables/types'
import { userInfoQuery } from '~/utils/queries'

type Node = {
  node: User
}

const getRelated = (edges: Node[]) => edges
  .map((edge: Node) => edge.node)
  .sort((a, b) => a.following.totalCount - b.following.totalCount)

export const useCurrentUserStore = defineStore('currentUser', {
  state: () => {
    return {
      getUserInfoPromise: null as any,
      info: null as any,
      followers: [] as User[],
      following: [] as User[],
      followersThatYouArentFollowingBack: [] as User[],
      followingThatArentFollowersBack: [] as User[],
    }
  },
  actions: {
    async getUserInfo () {
      const { data } = await useAsyncQuery<UserInfoQuery>(userInfoQuery, {
        first: 100
      })

      this.followers = getRelated(data.value.viewer.followers.edges)
      this.following = getRelated(data.value.viewer.following.edges)

      this.followersThatYouArentFollowingBack = this.followers
        .filter(
          follower =>
            !this.following.some(following => following.login === follower.login) &&
              follower.following.totalCount !== 0
        ).sort((a, b) => a.following.totalCount - b.following.totalCount)

      this.followingThatArentFollowersBack = this.following
        .filter(following =>
          !this.followers.some(follower => follower.login === following.login) &&
            following.following.totalCount !== 0
        ).sort((a, b) => a.following.totalCount - b.following.totalCount)

      this.info = {
        login: data.value.viewer.login,
        avatarUrl: data.value.viewer.avatarUrl,
      }
    },
  },
})
