import IComment from './Comment'
import IUser from './User'
import IProject from './Project'
import {StatusName} from './Task'

export interface ISingleTask {
  taskId?: number;
  id?: number;
  title?: string;
  description?: string;
  project?: IProject;
  advancement?: number;
  starting_time? : string;
  ending_time?: string;
  status?: StatusName;
  estimated_time?: number;
  comments?: [IComment];
  taskCreator?: IUser
;
}
