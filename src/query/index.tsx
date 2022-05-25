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

export const GET_PROJECTS = gql`
  query GetProjects {
    getProjects {
      id
      name
      starting_time
      ending_time
      tasks {
        id
        title
        description
        starting_time
        ending_time
        estimated_time
        advancement
        status
      }
      users {
        id
        firstName
        lastName
        username
        email
        role {
          id
          label
        }
      }
    }
  }
`

export const GET_PROJECT_BY_ID = gql`
  query GetProjectById {
    getProjectById {
      id
      name
      tasks {
        title
        taskCreator {
          userName
        }
        advancement
        status
        description
        estimated_time
        starting_time
        ending_time
      }
    }
  }
`

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      username
      role {
        label
      }
    }
  }
`

export const ADD_USER = gql`
  mutation AddUser($data: UserInput!) {
    addUser(data: $data) {
    username
      
  }
}
`
