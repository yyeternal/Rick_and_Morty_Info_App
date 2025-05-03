import { gql } from '@apollo/client';

const GET_CHARACTERS = gql`
  query {
    characters(page: 1) {
      results {
        id
        name
        status
        species
      }
    }
  }
`;