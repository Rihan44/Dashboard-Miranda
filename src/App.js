
import { useState } from "react";
import { Header } from "./components/Header";
import { Menu } from "./components/Menu";
import { RoutesComponent } from "./Routes/Routes";
import { useLocation } from "react-router-dom";

export const App = () => {

    const [titleHeader, setTitleHeader] = useState('Dashboard');
    const location = useLocation();

    return (
        <>
            {location.pathname !== '/login' && <Menu setHeaderTitle={setTitleHeader} />}
            {location.pathname !== '/login' && <Header title={titleHeader} />}
            <RoutesComponent />
        </>

    )
}
