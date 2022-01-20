import { gql } from '@apollo/client'

// query Query {
//   getTasks {
//     id
//     title
//     description
//     advancement
//     status
//     scheduled_time
//   }
// }
export const GET_TASKS = gql`
  query GetTasks {
    getTasks {
      id
      title
      status
      description
      estimated_time
      starting_time
      ending_time
      taskCreator {
        username
        email
        role {
          label
        }
      }
    }
  }
`

export const LOGIN_USER = gql`
  query LoginUser($data: LoginInput!) {
    loginUser(data: $data) {
      token
    }
  }
`
