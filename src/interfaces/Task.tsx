import IComment from './Comment';
import IUser from './User';

export default interface ITask {
    id?: number,
    title?: string,
    description?: string,
    advancement?: number,
    status?: string,
    estimated_time?: number,
    comments?: [IComment],
    taskCreator?: IUser,
}