import { Route, Routes} from "react-router-dom"

import { Login } from "../components/Login/Login"
import { PrivateRoute } from "../components/Login/PrivateRoute"
import { Bookings } from "../components/Bookings/Bookings"
import { BookingFile } from "../components/Bookings/BookingsDetails"
import { Dashboard } from "../components/Dashboard/Dashboard"
import { RoomsList } from "../components/Rooms/RoomsList"
import { AddRoom } from "../components/Rooms/AddRoom"
import { Contact } from "../components/Contact/Contact"
import { UsersList } from "../components/Users/UsersList"
import { AddUser } from "../components/Users/AddUser"
import { AuthContainer} from "../components/Context/AuthContainer"


export const RoutesComponent = () => {

    return (
        <AuthContainer> 
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/bookings"
                        element={
                            <PrivateRoute>
                                <Bookings />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/bookings/:id"
                        element={
                            <PrivateRoute>
                                <BookingFile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/rooms"
                        element={
                            <PrivateRoute>
                                <RoomsList />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/rooms/add-room"
                        element={
                            <PrivateRoute>
                                <AddRoom />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/contact"
                        element={
                            <PrivateRoute>
                                <Contact />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <PrivateRoute>
                                <UsersList />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/users/add-user"
                        element={
                            <PrivateRoute>
                                <AddUser />
                            </PrivateRoute>
                        }
                    />
                </Routes> 
        </AuthContainer>
    )
}