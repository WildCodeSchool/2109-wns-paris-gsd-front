import IRole from './Role'

type AuthUser = {
    username: string;
    role: IRole;
    userId: number;
    isConnected: boolean; 
} | null;


export default AuthUser;