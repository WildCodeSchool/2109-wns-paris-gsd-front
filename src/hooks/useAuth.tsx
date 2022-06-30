import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import IRole from "../interfaces/Role";
import AuthUser from "../interfaces/AuthUser";

import jwt_decode from 'jwt-decode';

import { useNavigate, useLocation } from "react-router-dom";
// import { useLazyQuery } from "@apollo/client";
// import { LOGIN_USER } from "../query";


// interface Role {
//   label:string;
//   id: number;
// }

// type User = {
//     username: string;
//     role: Role;
//     userId: number;
//     isConnected: boolean; 
// } | null;

interface AuthContextType {
    loggedIn: boolean;
    user?: AuthUser;
    login: (loginAnswer: AuthUser) => void;
    // signUp: (username: string, password: string) => void;
    logout: () => void;
}

const defaultState = {
  loggedIn: false,
  user: null,
  login: () => {},
  logout: () =>{},
};

const AuthContext = createContext<AuthContextType>(defaultState);

export function AuthProvider({
    children,
  }: {
    children: ReactNode;
  }): JSX.Element {
    
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<AuthUser>(null);
   
    const navigate = useNavigate()

    function login(loginAnswer: AuthUser) {
      // TODO make a call api
        //   loginUser({variables: {data: {username, password}}})

        //   if(loginData) {
        //       console.log(loginData)
        //   }
    
        // decode the token
        
        
        const payload: AuthUser = loginAnswer;

        localStorage.setItem("connection", JSON.stringify(payload));

        // set the info from payload in state
        // set token in localStorage
        setUser(payload);
        setLoggedIn(true);
        navigate('/home');

    }
  
    useEffect(() => {
        const payload = JSON.parse(localStorage.getItem('connection') || "{}");

        if (payload && payload.isConnected) {
            login(payload);
            
        }// else {
        //     navigate('/');
        // }

    }, [])


    function logout() {
    //   vider local storage
        setUser(null);
        setLoggedIn(false);
        localStorage.removeItem('connection');
        navigate('/');
    }
  
    const memoedValue = useMemo(
        () => ({
          user,
          login,
          logout,
          loggedIn
        }),
        [user, loggedIn]
      );

    return (
      <AuthContext.Provider value={memoedValue}>
        {children}
      </AuthContext.Provider>
    );
  }
  
  // Let's only export the `useAuth` hook instead of the context.
  // We only want to use the hook directly and never the context component.
  export default function useAuth() {
    return useContext(AuthContext);
  }

