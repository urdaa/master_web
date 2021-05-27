export const listBeitelagsWithReq = /* GraphQL */ `
  query ListBeitelags(
    $id: ID
    $filter: ModelBeitelagFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listBeitelags(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        description
        joinRequests {
          nextToken
          items {
            beitelagID
            id
          }
        }
      }
      nextToken
    }
  }
`;
export const getBeitelagMemberCustom = /* GraphQL */ `
  query GetBeitelagMember($id: ID!) {
    getBeitelagMember(id: $id) {
      id
      beitelagID
      nickName
      beitelag {
        id
        name
        description
        members
        beitelagMembers {
          items {
            id
            nickName 
            trips(limit: 7) {
              items {
                id
                name
                started
                observations
                userPath
                shared
                createdAt
                updatedAt
              }
            nextToken
            }   
          }
        }
        joinRequests {
          nextToken
          items {    
            nickname
            email
            id
          }
        }
      }
    }
  }
`;



