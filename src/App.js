import { Route, Routes } from "react-router-dom";
import { BrowserRouter} from "react-router-dom";

import { Bookings } from "./components/Bookings";
import { Dashboard } from "./components/Dashboard";
import { useState } from "react";
import { PrivateRoute } from "./components/PrivateRoute";
import { Login } from "./components/Login";
import { Header } from "./components/Header";
import { Menu } from "./components/Menu";

export const App = () => {

    const [authenticated, setAuthenticated] = useState(false);
    const [titleHeader, setTitleHeader] = useState('Dashboard');

    return (
        <BrowserRouter>
            <Menu  setHeaderTitle={setTitleHeader}/>
            <Header title={titleHeader} />
            <Routes>
                <Route path="/login" element={<Login setAuthenticated={setAuthenticated}/>}/>
                <Route 
                    path="/" 
                    element={
                        <PrivateRoute authenticated={authenticated}>
                            <Dashboard/>
                        </PrivateRoute>
                    }     
                />
                <Route 
                    path="/dashboard" 
                    element={
                        <PrivateRoute authenticated={authenticated}>
                            <Dashboard/>
                        </PrivateRoute>
                    }     
                />
                <Route 
                    path="/bookings" 
                    element={
                        <PrivateRoute authenticated={authenticated}>
                            <Bookings/>
                        </PrivateRoute>
                    }     
                />
            </Routes>
        </BrowserRouter>

    )
}