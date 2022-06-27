import IUser from "./User";

export enum RoleName {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    DEVELOPER = 'DEVELOPER',
    USER = 'USER',
  }

export default interface IRole {
    id?: number,
    label?: RoleName,
    users?: [IUser]
}