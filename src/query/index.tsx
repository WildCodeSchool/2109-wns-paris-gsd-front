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

export const UPDATE_TASK = gql`
  mutation UpdateTaskbyId($data: UpdateDeleteTaskInput!) {
    updateTaskbyId(data: $data) {
      id
    }
}
`;

export const LOGIN_USER = gql`
  query LoginUser($data: LoginInput!) {
    loginUser(data: $data) {
      username
      role {
        label
        id
      }
      userId
      isConnected
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

/**
 * PROJECT QUERIES
 */

export const GET_PROJECT_BY_ID = gql`
query GetProjectById($getProjectByIdId: Float!) {
  getProjectById(id: $getProjectByIdId) {
      id
      name
      users {
        id
        username
        role {
          id
          label
        }
        email
      }
      tasks {
        id
        title
        status
      }
      starting_time
      ending_time
    }
  }
`

export const GET_PROJECT_MEMBERS = gql`
query GetProjectById($getProjectByIdId: Float!) {
  getProjectById(id: $getProjectByIdId) {
    id
    users {
      username
      id
    }
  }
}
`;

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      username
      role {
        label
        id
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

export const GET_ROLES = gql`
  query GetRoles {
    getRoles {
      id
      label
    }
}
`
export const UPDATE_USER_ROLE = gql`
mutation UpdateUserRole($data: UpdateRoleInput!) {
  updateUserRole(data: $data) {
    role {
      label
    }
  }
}
`
export const TASK_BY_ID = gql`
query GetTaskById($data: TaskIdInput!) {
  getTaskById(data: $data) {
    id
    title
    description
    starting_time
    ending_time
    estimated_time
    advancement
    status
    project {
      id
      name
    }
    taskCreator {
      id
      username
    }
  }
}`

export const CHANGE_ASSIGNEE = gql`
mutation ChangeAssignee($data: ChangeAssigneeInput!) {
  changeAssignee(data: $data) {
    id
  }
}`;