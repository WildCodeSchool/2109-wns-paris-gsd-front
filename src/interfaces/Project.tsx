import ITask from "./Task";
import IUser from "./User";

export default interface IProject {
    id?: number;
    name?: string;
    starting_time?: Date;
    users?: IUser[];
    tasks?: ITask[];
}