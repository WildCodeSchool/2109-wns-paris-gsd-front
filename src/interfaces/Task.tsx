import IComment from './Comment'
import IUser from './User'
import IProject from './Project'

export default interface ITask {
  id?: number
  title?: string
  description?: string
  project: IProject
  advancement?: number
  ending_time: string
  status?: string
  estimated_time?: number
  comments?: [IComment]
  taskCreator?: IUser
}
