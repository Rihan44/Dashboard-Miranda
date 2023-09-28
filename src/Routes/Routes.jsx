import { Route, Routes} from "react-router-dom"
import { useState } from "react"

import { Login } from "../components/Login/Login"
import { PrivateRoute } from "../components/Login/PrivateRoute"
import { Bookings } from "../components/Bookings/Bookings"
import { BookingFile } from "../components/Bookings/BookingsDetails"
import { Dashboard } from "../components/Dashboard/Dashboard"
import { RoomsList } from "../components/Rooms/RoomsList"


export const RoutesComponent = () => {
    const [authenticated, setAuthenticated] = useState(false);

    const auth = localStorage.getItem('auth');
  
    /*     const navigate = useNavigate();
        if(auth) {
    
        } */

    return (
        <Routes>
            {/* SI ESTOY LOGEADO NO PUEDO IR AL LOGIN */}
            <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
            <Route
                path="/"
                element={
                    <PrivateRoute authenticated={authenticated}>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute authenticated={authenticated}>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/bookings"
                element={
                    <PrivateRoute authenticated={authenticated}>
                        <Bookings />
                    </PrivateRoute>
                }
            />
            <Route
                path="/bookings/:id"
                element={
                    <PrivateRoute authenticated={authenticated}>
                        <BookingFile />
                    </PrivateRoute>
                }
            />
             <Route
                path="/rooms"
                element={
                    <PrivateRoute authenticated={authenticated}>
                        <RoomsList />
                    </PrivateRoute>
                }
            />
        </Routes>
    )
}