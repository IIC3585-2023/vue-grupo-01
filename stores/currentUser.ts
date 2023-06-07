import { defineStore } from 'pinia'
import type { NuxtApp } from 'nuxt/app'
import type { UserInfoQuery, User, PageSize } from '~/composables/types'
import { userInfoQuery, followingQuery } from '~/utils/queries'
import { pageSize } from '~/utils/variables'

type Node = {
  node: User
}

const getRelated = (edges: Node[]) => edges
  .map((edge: Node) => edge.node)
  .sort((a, b) => a.following.totalCount - b.following.totalCount)

const getNextQuery = async (app: NuxtApp, data: any, followType: 'followers' | 'following', pageSize: PageSize) => {
  const followQuery = followType === 'followers' ? followersQuery : followingQuery
  while (data?.value?.viewer[followType]?.pageInfo?.hasNextPage) {
    // console.log(followType, 'query has next page!!!')
    const { data: data2 } = await useGithubQuery<UserInfoQuery>(app, followQuery, {
      pageSize,
      afterCursor: data.value.viewer[followType].pageInfo.endCursor,
    })
    data.value.viewer[followType].edges = data.value.viewer[followType].edges.concat(data2.value.viewer[followType].edges)
    data.value.viewer[followType].pageInfo = data2.value.viewer[followType].pageInfo
  }
}

export const useCurrentUserStore = defineStore('currentUser', {
  state: () => {
    return {
      getUserInfoPromise: null as any,
      info: null as any,
      followers: [] as User[],
      following: [] as User[],
      followersThatYouArentFollowingBack: [] as User[],
      followingThatArentFollowersBack: [] as User[],
      loadingUserInfo: false as boolean
    }
  },
  actions: {
    async getUserInfo () {
      this.loadingUserInfo = true
      const app = useNuxtApp()
      const { data } = await useGithubQuery<any>(app, userInfoQuery, {
        first: pageSize
      })

      await getNextQuery(app, data, 'following', pageSize)
      await getNextQuery(app, data, 'followers', pageSize)

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
      this.loadingUserInfo = false
    },
  },
})
