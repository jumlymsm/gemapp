/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGem = /* GraphQL */ `
  mutation CreateGem(
    $input: CreateGemInput!
    $condition: ModelGemConditionInput
  ) {
    createGem(input: $input, condition: $condition) {
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
export const updateGem = /* GraphQL */ `
  mutation UpdateGem(
    $input: UpdateGemInput!
    $condition: ModelGemConditionInput
  ) {
    updateGem(input: $input, condition: $condition) {
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
export const deleteGem = /* GraphQL */ `
  mutation DeleteGem(
    $input: DeleteGemInput!
    $condition: ModelGemConditionInput
  ) {
    deleteGem(input: $input, condition: $condition) {
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
