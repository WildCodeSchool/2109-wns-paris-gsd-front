import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query Query {
    getTasks {
      id
      title
      description
      advancement
      status
      scheduled_time
    }
  }
`;