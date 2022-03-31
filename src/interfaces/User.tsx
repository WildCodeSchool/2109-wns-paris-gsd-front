import IComment from './Comment';
import IRole from './Role';
import {ITask} from './Task';

export default interface IUser {
    id?: number,
    firstName?: string,
    lastName?: string,
    username: string,
    email?: string,
    role: IRole,
    comments: [IComment],
    Tasks: [ITask]
}