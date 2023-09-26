import { Route, Routes } from "react-router-dom"

import { Login } from "../components/Login"
import { PrivateRoute } from "../components/PrivateRoute"
import { Dashboard } from "../components/Dashboard"
import { Bookings } from "../components/Bookings"
import { useState } from "react"


export const RoutesComponent = () => {
    const [authenticated, setAuthenticated] = useState(false);

    return(
        <Routes>
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
        </Routes>
    )
}