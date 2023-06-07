export const userInfoQuery = gql`
  query ($first: Int) {
    viewer {
      login
      avatarUrl
      followers(first: $first) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            login
            name
            avatarUrl
            followers {
              totalCount
            }
            following {
              totalCount
            }
          }
        }
      }
      following(first: $first) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            login
            name
            avatarUrl
            followers {
              totalCount
            }
            following {
              totalCount
            }
          }
        }
      }
    }
  }
`

export const followingQuery = gql`
query GetFollowing($pageSize: Int, $afterCursor: String) {
  viewer {
    login
    avatarUrl
    following(first: $pageSize, after: $afterCursor) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          login
          name
          avatarUrl
          followers {
            totalCount
          }
          following {
            totalCount
          }
        }
      }
    }
  }
}
`

export const followersQuery = gql`
query GetFollowers($pageSize: Int, $afterCursor: String) {
  viewer {
    login
    avatarUrl
    followers(first: $pageSize, after: $afterCursor) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          login
          name
          avatarUrl
          followers {
            totalCount
          }
          following {
            totalCount
          }
        }
      }
    }
  }
}
`

export const userQuery = gql`
  query ($login: String!, $pageSize: Int) {
    user(login: $login) {
      following(first: $pageSize) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            login
            name
            avatarUrl
            followers {
              totalCount
            }
            following {
              totalCount
            }
          }
        }
      }
      followers(first: $pageSize) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            login
            name
            avatarUrl
            followers {
              totalCount
            }
            following {
              totalCount
            }
          }
        }
      }
    }
  }
`

export const userQueryFollowing = gql`
query GetFollowing($login: String!, $pageSize: Int, $afterCursor: String) {
    user(login: $login) {
      following(first: $pageSize, after: $afterCursor) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            login
            name
            avatarUrl
            followers {
              totalCount
            }
            following {
              totalCount
            }
          }
        }
      }
    }
  }
`

export const userQueryFollowers = gql`
query GetFollowers($login: String!, $pageSize: Int, $afterCursor: String) {
    user(login: $login) {
      followers(first: $pageSize, after: $afterCursor) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            login
            name
            avatarUrl
            followers {
              totalCount
            }
            following {
              totalCount
            }
          }
        }
      }
    }
  }
`
