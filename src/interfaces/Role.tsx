import IUser from "./User";

export default interface IRole {
    id?: number,
    label?: string,
    users?: [IUser]
}