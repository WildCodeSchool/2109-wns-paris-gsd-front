import { gql } from '@apollo/client'

export const GET_TASKS = gql`
  query GetTasks {
    getTasks {
      id
      title
      project{
        name
      }
      taskCreator{
        username
      }
      advancement
      status
      description
      estimated_time
      starting_time
      ending_time
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
