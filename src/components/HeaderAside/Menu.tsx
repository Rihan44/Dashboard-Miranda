import styled from "styled-components";

import hotelIcon from '../../assets/hotel_icon.png';

import { LuCalendarCheck2 } from "react-icons/lu";
import { BiKey } from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuUser2 } from "react-icons/lu";
import { HiOutlinePuzzle } from "react-icons/hi";

import { NavLink } from "react-router-dom";
import { ProfileCompontent } from "../Dashboard/Profile";
import { useContext } from "react";
import { AsideContext } from "../Context/ToggleAsideContext";
import { Props } from "../../interfaces/Props";

interface PropsMenu {
    setHeaderTitle: (title: string) => void
}

export const Menu: React.FC<PropsMenu> = ({ setHeaderTitle }) => {

    const {asideState} = useContext(AsideContext);
    let asideVisible = asideState?.asideVisible || false;
    let darkMode: boolean = asideState?.darkMode || false;

    const handleHeaderTitle = (titleName: string) => {
        setHeaderTitle(titleName);
    }

    return (
        <AsideMenu darkmode={darkMode ? 0 : 1} context={asideVisible ? 0 : 1} id="aside_menu">
            <NavLink to="/" style={{
                textDecoration: "none",
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "40px",
                marginBottom: "85px"
            }}>
                <ImgIcon src={hotelIcon}/>
                <SubTitle darkmode={darkMode ? 0 : 1}>
                    travl
                    <span>Hotel admin dashboard</span>
                </SubTitle>
            </NavLink>
            <List>
                <LinkStyled 
                    darkmode={darkMode ? 0 : 1}
                    onClick={() => handleHeaderTitle('Dashboard')}
                    to='/dashboard'>
                    <div>
                    </div>
                    <LuLayoutDashboard />
                    Dashboard
                </LinkStyled>

                <LinkStyled 
                    darkmode={darkMode ? 0 : 1}
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
                    darkmode={darkMode ? 0 : 1}
                    onClick={() => handleHeaderTitle('Bookings')}
                    to="/bookings">
                    <div>
                    </div>
                    <LuCalendarCheck2  />
                    Bookings
                </LinkStyled>

                <LinkStyled
                    darkmode={darkMode ? 0 : 1}
                    onClick={() => handleHeaderTitle('Contact')}
                    to='/contact'>
                    <div>
                    </div>
                    <LuUser2 />
                    Contact
                </LinkStyled>

                <LinkStyled
                    darkmode={darkMode ? 0 : 1}
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
                <TitleFooter darkmode={darkMode ? 0 : 1}>Travl Hotel Admin Dashboard</TitleFooter>
                <ParagraphFooter>© 2023 All Rights Reserved</ParagraphFooter>
            </ContainerFooter>
            <CreatorParagraph>Made with ♥ by ASDev</CreatorParagraph>
        </AsideMenu>
    );
}

const AsideMenu = styled.aside<{darkmode: number, context: number}>`
    height: 100vh;
    width: 345px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    box-shadow: ${props => props.darkmode === 0 ? '0px 8px 24px #0000006E' : '0px 8px 24px rgba(149, 157, 165, 0.2)'};
    transition: 0.5s;
    background-color: ${props => props.darkmode === 0 ? '#202020' : '#ffff'};
    float: left;
    margin-left: ${props => props.context === 0 ? '-345px' : '0'};
`;

const ContainerFooter = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
    align-items: baseline;
`;

const TitleFooter = styled.h4<{darkmode: number}>`
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    transition: 0.5s;
    color: ${props => props.darkmode === 0 ? '#EBEBEB' : '#212121'};

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


const LinkStyled = styled(NavLink)<{darkmode: number}>`
    font-family: 'Poppins', sans serif;
    color: ;
    text-decoration: none;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 45px;
    transition: 0.5s;
    color: ${props => props.darkmode === 0 ? '#686868' : '#799283'};

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
        color: ${props => props.darkmode === 0 ? '#686868' : '#799283'};
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

const SubTitle = styled.h2<{darkmode: number}>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 23px;
    font-weight: bold;
    color: ${props => props.darkmode === 0 ? '#ffff' : '#212121'};
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

const ImgIcon = styled.img`
    width: 80px;
    height: 80px;
    transition: 0.5s;

    &:hover {
        transform: scale(1.05);
    }

`;