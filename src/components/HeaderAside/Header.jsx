import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { HiOutlineMail } from "react-icons/hi";
import { LuBell } from "react-icons/lu";
import { GoSignOut } from "react-icons/go";
import { TbArrowsLeftRight } from "react-icons/tb";


export const Header = ({ title }) => {

    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear();

        navigate('/login');
    }

    return (
        <HeaderTag>
            <NavIcons>
                <ContainerTitle>
                    <TbArrowsLeftRight style={{ fontSize: "22px", cursor: "pointer" }} id=""/>
                    <Title>{title}</Title>
                </ContainerTitle>
                <ContainerIcons>
                    <HiOutlineMail style={iconClass} />
                    <LuBell style={iconClass} />
                    <Button onClick={handleLogOut}>
                        <GoSignOut/>
                    </Button>
                </ContainerIcons>
            </NavIcons>
        </HeaderTag>
    );
}

const iconClass = {
    color: "#135846",
    fontSize: "24px"
}

const HeaderTag = styled.header`
    display: flex;
    height: 120px;
`;

const NavIcons = styled.nav`
    height: 120px;
    box-shadow: 0px 3px 10px #00000005;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-width: 1300px;
`;

const ContainerTitle = styled.div`
    display: flex; 
    width: 20%;
    justify-content: space-around;
    margin-left: 30px;
    align-items: center;
`;

const ContainerIcons = styled.div`
    display: flex; 
    margin-left: 150px;
    width: 80%;
    justify-content: space-around;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 28px;
    color: #262626;
    font-family: 'Poppins', sans-serif;
    font-weight: semibold;
    margin-left: 30px;
`;


const Button = styled.button`
    border: none;
    background: none;
    cursor: pointer;

    svg {
        color: #135846;
        font-size: 24px;
        transition: 0.5s;
    }

    &:hover {
        svg {
            color: #E23428;
        }
    }
`;


