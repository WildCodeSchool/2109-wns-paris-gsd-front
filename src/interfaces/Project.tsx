import {ITask} from "./Task";
import IUser from "./User";

export default interface IProject {
    id?: number;
    name?: string;
    status?: string;
    ending_time: string;
    users?: IUser[];
    tasks?: ITask[];
}