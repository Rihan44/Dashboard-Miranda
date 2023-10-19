import React, { useContext } from "react";
import { Navigate } from "react-router-dom"
import { AuthContext } from "../Context/AuthContainer";


interface Props {
    children: React.ReactNode
}

export const PrivateRoute: React.FC<Props> = ({children}) => {

   const { auth } = useContext(AuthContext)

    if(auth.authenticated){
        return (
            children
            );
        } else {
            return(
                <Navigate to="/login"/>
        )
    }
} 

