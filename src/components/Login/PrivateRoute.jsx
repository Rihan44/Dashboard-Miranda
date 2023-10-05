import { useContext } from "react";
import { Navigate } from "react-router-dom"
import { AuthContext } from "../Context/AuthContainer";


export const PrivateRoute = ({children}) => {

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

