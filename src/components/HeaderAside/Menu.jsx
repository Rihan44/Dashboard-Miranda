import styled from "styled-components";

import { LuCalendarCheck2 } from "react-icons/lu";
import { BiKey } from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuUser2 } from "react-icons/lu";
import { HiOutlinePuzzle } from "react-icons/hi";
import { FaHotel } from "react-icons/fa6"

import { NavLink } from "react-router-dom";
import { ProfileCompontent } from "../Dashboard/Profile";
import { useContext } from "react";
import { AsideContext } from "../Context/ToggleAsideContext";

export const Menu = ({ setHeaderTitle }) => {

    const {asideState} = useContext(AsideContext);

    const handleHeaderTitle = (titleName) => {
        setHeaderTitle(titleName);
    }

    return (
        <AsideMenu darkmode={asideState.darkMode} context={asideState.asideVisible.toString()} id="aside_menu">
            <NavLink to="/" style={{
                textDecoration: "none",
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "40px",
                marginBottom: "85px"
            }}>
                <FaHotel style={{ fontSize: "40px", color: "#135846", marginLeft: "50px" }} />
                <SubTitle darkmode={asideState.darkMode}>
                    travl
                    <span>Hotel admin dashboard</span>
                </SubTitle>
            </NavLink>
            <List>
                <LinkStyled 
                    darkmode={asideState.darkMode}
                    onClick={() => handleHeaderTitle('Dashboard')}
                    to='/dashboard'>
                    <div>
                    </div>
                    <LuLayoutDashboard />
                    Dashboard
                </LinkStyled>

                <LinkStyled 
                    darkmode={asideState.darkMode}
                    onClick={() => handleHeaderTitle('Rooms List')}
                    to="/rooms">
                    <div>
                    </div>
                    <BiKey
                    style={
                        {
                            transform: "rotate(90deg) rotateX(-180deg)",
                            fontSize: "32px",
                            marginRight: "30px"
                        }
                    } />
                    Rooms
                </LinkStyled>

                <LinkStyled
                    darkmode={asideState.darkMode}
                    onClick={() => handleHeaderTitle('Bookings')}
                    to="/bookings">
                    <div>
                    </div>
                    <LuCalendarCheck2  />
                    Bookings
                </LinkStyled>

                <LinkStyled
                    darkmode={asideState.darkMode}
                    onClick={() => handleHeaderTitle('Contact')}
                    to='/contact'>
                    <div>
                    </div>
                    <LuUser2 />
                    Contact
                </LinkStyled>

                <LinkStyled
                    darkmode={asideState.darkMode}
                    onClick={() => handleHeaderTitle('Users')}
                    to='/users'>
                    <div>
                    </div>
                    <HiOutlinePuzzle />
                    Users
                </LinkStyled>
            </List>
            <ProfileCompontent />
            <ContainerFooter>
                <TitleFooter darkmode={asideState.darkMode}>Travl Hotel Admin Dashboard</TitleFooter>
                <ParagraphFooter>© 2023 All Rights Reserved</ParagraphFooter>
            </ContainerFooter>
            <CreatorParagraph>Made with ♥ by ASDev</CreatorParagraph>
        </AsideMenu>
    );
}

const AsideMenu = styled.aside`
    height: 100vh;
    width: 345px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    box-shadow: ${props => props.darkmode ? '0px 8px 24px #0000006E' : '0px 8px 24px rgba(149, 157, 165, 0.2)'};
    transition: 0.5s;
    background-color: ${props => props.darkmode ? '#202020' : '#ffff'};
    float: left;
    margin-left: ${props => props.context === 'true' ? '-345px' : '0'};
`;

const ContainerFooter = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
    align-items: baseline;
`;

const TitleFooter = styled.h4`
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    transition: 0.5s;
    color: ${props => props.darkmode ? '#EBEBEB' : '#212121'};

`;

const ParagraphFooter = styled.p`
    color: #799283;
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
`;

const CreatorParagraph = styled.p`
    color: #799283;
    font-size: 14px; 
    font-family: 'Poppins', sans-serif;
    align-self: baseline;
    margin-left: 50px;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    list-style: none;
    height: auto;
`;


const LinkStyled = styled(NavLink)`
    font-family: 'Poppins', sans serif;
    color: ;
    text-decoration: none;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 45px;
    transition: 0.5s;
    color: ${props => props.darkmode ? '#686868' : '#799283'};

    div {
        height: 50px;
        border: 5px solid #E23428;
        border-radius: 0 6px 6px 0;
        position: absolute;
        left: 0px;
        top: -10px;
        opacity: 0;
        transition: 0.3s;
    }

    svg {
        font-size: 27px;
        color: ${props => props.darkmode ? '#686868' : '#799283'};
        margin-left: 56px;
        margin-right: 30px;
        transition: 0.5s;
    }

    &:hover {
        color: #E23428;

        div {
            opacity: 1;
        }

        svg {
            color: #E23428;
        }
    }

    &.active {
        color: #E23428;

        svg {
            color: #E23428;
        }

        div {
            opacity: 1;
        }
    }
`;


const SubTitle = styled.h2`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 23px;
    font-weight: bold;
    color: ${props => props.darkmode ? '#ffff' : '#212121'};
    font-family: 'Poppins', sans-serif;
    margin-right: 30px;
    margin-left: 30px;
    transition: 0.5s;
    span {
        font-size: 12px;
        color: #5D5449;
        font-weight: 300;
    }
`;

