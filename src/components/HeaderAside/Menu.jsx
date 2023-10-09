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
        <AsideMenu context={asideState.asideVisible.toString()} id="aside_menu">
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
                <SubTitle>
                    travl
                    <span>Hotel admin dashboard</span>
                </SubTitle>
            </NavLink>
            <List>
                <LinkStyled 
                    onClick={() => handleHeaderTitle('Dashboard')}
                    to='/dashboard'>
                    <div>
                    </div>
                    <LuLayoutDashboard />
                    Dashboard
                </LinkStyled>

                <LinkStyled 
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
                    onClick={() => handleHeaderTitle('Bookings')}
                    to="/bookings">
                    <div>
                    </div>
                    <LuCalendarCheck2  />
                    Bookings
                </LinkStyled>

                <LinkStyled
                    onClick={() => handleHeaderTitle('Contact')}
                    to='/contact'>
                    <div>
                    </div>
                    <LuUser2 />
                    Contact
                </LinkStyled>

                <LinkStyled
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
                <TitleFooter>Travl Hotel Admin Dashboard</TitleFooter>
                <ParagraphFooter>© 2023 All Rights Reserved</ParagraphFooter>
            </ContainerFooter>
            <CreatorParagraph>Made with ♥ by ASDev</CreatorParagraph>
        </AsideMenu>
    );
}

const AsideMenu = styled.aside`
    height: auto;
    width: 345px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 13px 3px 40px #00000005;
    float: left;
    transition: 0.5s;
    margin-left: ${props => props.context === 'true' ? '-345px' : '0'};
`;

const ContainerFooter = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 67px;
    align-items: baseline;
`;

const TitleFooter = styled.h4`
    color: #212121;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
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
    margin-bottom: 40px;
    align-self: baseline;
    margin-left: 40px;
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
    color: #799283;
    text-decoration: none;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 50px;
    transition: 0.5s;

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
        color: #799283;
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
    color: #212121;
    font-family: 'Poppins', sans-serif;
    margin-right: 30px;
    margin-left: 30px;
    span {
        font-size: 12px;
        color: #5D5449;
        font-weight: 300;
    }
`;

