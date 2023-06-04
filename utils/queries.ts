export const userInfoQuery = gql`
  query ($first: Int) {
    viewer {
      login
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
