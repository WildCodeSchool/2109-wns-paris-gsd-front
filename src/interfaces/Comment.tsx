import ITask from "./Task";
import IUser from "./User";

export default interface Comment {
    id?: number,
    content?: string,
    createdAt?: Date,
    task?: ITask,
    author?: IUser,
}