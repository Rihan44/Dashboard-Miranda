
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { RoutesComponent } from "./Routes/Routes";
import { Header } from "./components/HeaderAside/Header";
import { Menu } from "./components/HeaderAside/Menu";
import { AuthContainer } from "./components/Context/AuthContainer";
import { ToggleAsideContext } from "./components/Context/ToggleAsideContext";
import { createGlobalStyle } from 'styled-components';
import { AsideContext } from './components/Context/ToggleAsideContext';


export const App = () => {

    const {asideState} = useContext(AsideContext);

    const [titleHeader, setTitleHeader] = useState('Dashboard');
    const [subtitle, setSubtitle] = useState('');
    const [subTitleSmall, setSubTitleSmall] = useState('');
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/bookings':
                setTitleHeader('Bookings');
                setSubtitle('');
                setSubTitleSmall('');
                break;
            case '/bookings/':
                setTitleHeader('Bookings');
                setSubtitle('');
                setSubTitleSmall('');
                break;
            case '/rooms':
                setTitleHeader('Rooms');
                setSubtitle('');
                setSubTitleSmall('');
                break;
            case '/rooms/add-room':
                setSubtitle('Rooms / ');
                setSubTitleSmall('Add room');
                break;
            case '/contact':
                setTitleHeader('Contact');
                setSubtitle('');
                setSubTitleSmall('');
                break;
            case '/users':
                setTitleHeader('Users');
                setSubtitle('');
                setSubTitleSmall('');
                break;
            case '/users/add-user':
                setTitleHeader('Users');
                setSubtitle('Users / ');
                setSubTitleSmall('Add user');
                break;
            case '/users/update-user/':
                setTitleHeader('Users');
                setSubtitle('Users / ');
                setSubTitleSmall('Update user');
                break;
            default:
                setSubtitle('');
                setSubTitleSmall('');
        }
    }, [location.pathname]);
    
    const GlobalStyles = createGlobalStyle`
        body {
            transition: background 0.5s;
            background-color: ${props => props.darkmode ? '#171717' : '#ffff'};
            font-family: Arial, sans-serif;
            font-size: 16px;
        }
    `;

    return (
        <>
            <GlobalStyles darkmode={asideState.darkMode}/>
            <AuthContainer>
                    {location.pathname !== '/login' && <Menu setHeaderTitle={setTitleHeader} />}
                    {location.pathname !== '/login' && <Header title={titleHeader} subtitle={subtitle} subtitleSmall={subTitleSmall} />}
                    <RoutesComponent />
            </AuthContainer>
        </>
    )
}
