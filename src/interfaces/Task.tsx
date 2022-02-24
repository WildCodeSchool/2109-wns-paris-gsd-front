import IComment from './Comment'
import IUser from './User'
import IProject from './Project'

export enum StatusName {
  NEW = 'NEW',
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING_REVIEW = 'PENDING_REVIEW',
  REJECTED = 'REJECTED',
}

export interface ITask {
  id?: number;
  title?: string;
  description?: string;
  project: IProject;
  advancement?: number;
  ending_time: string;
  status?: StatusName;
  estimated_time?: number;
  comments?: [IComment];
  taskCreator?: IUser;
}
