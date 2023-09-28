
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { RoutesComponent } from "./Routes/Routes";
import { Header } from "./components/HeaderAside/Header";
import { Menu } from "./components/HeaderAside/Menu";

export const App = () => {

    const [titleHeader, setTitleHeader] = useState('Dashboard');
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/bookings':
                setTitleHeader('Bookings');
                break;
            case '/bookings/':
                setTitleHeader('Bookings');
                break;
            case '/rooms':
                setTitleHeader('Rooms');
                break;
            case '/rooms/add-room':
                setTitleHeader('Add Room');
                break;
            case '/contact':
                setTitleHeader('Contact');
                break;
            case '/users':
                setTitleHeader('Users');
                break;
            default:
        }
    }, [location.pathname]);

    return (
        <>
            {location.pathname !== '/login' && <Menu setHeaderTitle={setTitleHeader} />}
            {location.pathname !== '/login' && <Header title={titleHeader} />}
            <RoutesComponent />
        </>

    )
}
