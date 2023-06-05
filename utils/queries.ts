export const userInfoQuery = gql`
  query ($first: Int) {
    viewer {
      login
      avatarUrl
      followers(first: $first) {
        totalCount
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
  query ($login: String!, $first: Int) {
    user(login: $login) {
      following(first: $first) {
        totalCount
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
      followers(first: $first) {
        totalCount
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
