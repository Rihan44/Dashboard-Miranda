import { Route, Routes} from "react-router-dom"
import { useState } from "react"

import { Login } from "../components/Login/Login"
import { PrivateRoute } from "../components/Login/PrivateRoute"
import { Bookings } from "../components/Bookings/Bookings"
import { BookingFile } from "../components/Bookings/BookingsDetails"
import { Dashboard } from "../components/Dashboard/Dashboard"
import { RoomsList } from "../components/Rooms/RoomsList"
import { AddRoom } from "../components/Rooms/AddRoom"
import { Contact } from "../components/Contact/Contact"
import { UsersList } from "../components/Users/UsersList"


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
            <Route
                path="/rooms/add-room"
                element={
                    <PrivateRoute authenticated={authenticated}>
                        <AddRoom />
                    </PrivateRoute>
                }
            />
            <Route
                path="/contact"
                element={
                    <PrivateRoute authenticated={authenticated}>
                        <Contact />
                    </PrivateRoute>
                }
            />
            <Route
                path="/users"
                element={
                    <PrivateRoute authenticated={authenticated}>
                        <UsersList />
                    </PrivateRoute>
                }
            />
            <Route
                path="/users/add-users"
                element={
                    <PrivateRoute authenticated={authenticated}>
                        <Contact />
                    </PrivateRoute>
                }
            />
        </Routes>
    )
}