import { Navigate } from "react-router-dom"

export const PrivateRoute = ({authenticated, children}) => {

    const auth = localStorage.getItem('auth');

    if(authenticated || auth){
        return (
            children
            );
        } else {
            return(
                <Navigate to="/login"/>
        )
    }
} 

