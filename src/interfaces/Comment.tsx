import ITask from "./Task";

export default interface Comment {
    id?: number,
    content?: string,
    createdAt?: Date,
    task?: ITask,
}