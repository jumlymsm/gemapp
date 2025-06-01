/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGem = /* GraphQL */ `
  query GetGem($id: ID!) {
    getGem(id: $id) {
      id
      name
      description
      price
      images
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listGems = /* GraphQL */ `
  query ListGems(
    $filter: ModelGemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        price
        images
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
