import { Route, Routes } from "react-router-dom"

import { PrivateRoute } from "../components/Login/PrivateRoute"

import { Login } from "../components/Login/Login"
import { Bookings } from "../components/Bookings/Bookings"
import { BookingFile } from "../components/Bookings/BookingsDetails"
import { Dashboard } from "../components/Dashboard/Dashboard"
import { RoomsList } from "../components/Rooms/RoomsList"
import { AddRoom } from "../components/Rooms/AddRoom"
import { Contact } from "../components/Contact/Contact"
import { UsersList } from "../components/Users/UsersList"
import { AddUser } from "../components/Users/AddUser"
import { UpdateRoom } from "../components/Rooms/UpdateRoom"
import { UpdateUser } from "../components/Users/UpdateUser"
import { UpdateBooking } from "../components/Bookings/UpdateBooking"


export const RoutesComponent = () => {

    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/*"
                    element={
                        <PrivateRoute>
                            <Routes>
                                <Route index element={<Dashboard />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/bookings" element={<Bookings />} />
                                <Route path="/bookings/:id" element={<BookingFile />} />
                                <Route path="/bookings/update-bookings/:id" element={<UpdateBooking />} />
                                <Route path="/rooms" element={<RoomsList />} />
                                <Route path="/rooms/add-room" element={<AddRoom />} />
                                <Route path="/rooms/update-room/:id" element={<UpdateRoom />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/users" element={<UsersList />} />
                                <Route path="/users/add-user" element={<AddUser />} />
                                <Route path="/users/update-user/:id" element={<UpdateUser />} />
                            </Routes>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </>
    )
}