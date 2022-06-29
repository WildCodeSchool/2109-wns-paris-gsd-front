import {ITask} from "./Task";
import IUser from "./User";

export default interface ISingleProject {
    id?: number;
    projectId: number;
    name?: string;
    status?: string;
    ending_time?: string;
    starting_time?:string;
    users?: IUser[];
    tasks?: ITask[];
}