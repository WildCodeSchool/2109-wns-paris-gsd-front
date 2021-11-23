import IComment from './Comment';

export default interface ITask {
    id?: number,
    title?: string,
    description?: string,
    advancement?: number,
    status?: string,
    scheduled_time?: string,
    comments: [IComment]
}