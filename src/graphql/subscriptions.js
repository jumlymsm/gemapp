/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGem = /* GraphQL */ `
  subscription OnCreateGem(
    $filter: ModelSubscriptionGemFilterInput
    $owner: String
  ) {
    onCreateGem(filter: $filter, owner: $owner) {
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
export const onUpdateGem = /* GraphQL */ `
  subscription OnUpdateGem(
    $filter: ModelSubscriptionGemFilterInput
    $owner: String
  ) {
    onUpdateGem(filter: $filter, owner: $owner) {
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
export const onDeleteGem = /* GraphQL */ `
  subscription OnDeleteGem(
    $filter: ModelSubscriptionGemFilterInput
    $owner: String
  ) {
    onDeleteGem(filter: $filter, owner: $owner) {
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
