import styled from "styled-components";
import Swal from 'sweetalert2';

import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import moon from '../../assets/moon.png';

import { HiOutlineMail } from "react-icons/hi";
import { LuBell } from "react-icons/lu";
import { GoSignOut } from "react-icons/go";
import { TbArrowsLeftRight } from "react-icons/tb";
import { AuthContext } from "../Context/AuthContainer";
import { AsideContext } from "../Context/ToggleAsideContext";
import { useAppDispatch } from "../../app/hooks";
import { loginSlice } from "../../features/slices/loginSlice";

interface PropsHeader {
    title: string,
    subtitle: string,
    subtitleSmall: string
}

export const Header: React.FC<PropsHeader> = ({ title, subtitle, subtitleSmall }) => {

    const navigate = useNavigate();
    const { authDispatch } = useContext(AuthContext);
    const { asideDispatch } = useContext(AsideContext);

    const {asideState} = useContext(AsideContext);
    let darkMode: boolean = asideState?.darkMode || false;

    const dispatch = useAppDispatch();

    const handleLogOut = async() => {
        localStorage.clear();
        const ToastLogOut = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        dispatch(loginSlice.actions.resetStatus());

        const { value: accept } = await Swal.fire({
            title: 'Are you sure that you want to LogOut?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#135846',
            cancelButtonColor: '#E23428',
            confirmButtonText: 'Yes, logout'
        })

        if(accept){
            ToastLogOut.fire({
                icon: 'success',
                title: 'Logout successfully!'
            })
            setTimeout(() => {
                authDispatch({ type: 'LOGOUT' });
                navigate('/login');
            }, 500);
        }
 
    }

    const handleToggle = () => {
        asideDispatch({ type: 'Close_aside' });
    }

    const handleDark = () => {
        asideDispatch({ type: 'Dark_mode' });
    }

    return (
        <HeaderTag darkmode={darkMode ? 0 : 1}>
            <NavIcons darkmode={darkMode ? 0 : 1}>
                <ContainerTitle darkmode={darkMode ? 0 : 1}>
                    <TbArrowsLeftRight onClick={handleToggle} id="" />
                    <InnerContainerTitle>
                        <Title darkmode={darkMode ? 0 : 1}>{title}</Title>
                        <Subtitle darkmode={darkMode ? 0 : 1}>{subtitle} <small>{subtitleSmall}</small></Subtitle>
                    </InnerContainerTitle>
                </ContainerTitle>
                <ContainerIcons>
                    <HiOutlineMail/>
                    <LuBell/>
                    <Button onClick={handleLogOut}>
                        <GoSignOut />
                    </Button>
                    <Label>
                        <ImgIcon src={moon}/>
                        <input type="checkbox" />
                        <span onClick={handleDark}></span>
                    </Label>
                </ContainerIcons>
            </NavIcons>
        </HeaderTag>
    );
}

const ImgIcon = styled.img`
    width: 40px;
    height: 40px;
    margin-right: 15px;
`;

const HeaderTag = styled.header<{darkmode: number}>`
    display: flex;
    transition: background 0.5s;
    background-color: ${props => props.darkmode === 0 ? '#202020' : '#ffff'};
    height: 120px;
`;

const NavIcons = styled.nav<{darkmode: number}>`
    height: 120px;
    box-shadow: 0px 3px 10px #00000005;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.5s;
    width: 100%;
    min-width: 1400px;
    max-width: 1400px;
    background-color: ${props => props.darkmode === 0 ? '#202020' : '#ffff'};
`;

const ContainerTitle = styled.div<{darkmode: number}>`
    display: flex; 
    width: 20%;
    justify-content: space-around;
    margin-left: 30px;
    align-items: center;

    svg {
        font-size: 22px;
        cursor: pointer;
        transition: color 0.5s;
        color: ${props => props.darkmode === 0 ? '#ffff' : '#262626'};
    }
`;

const ContainerIcons = styled.div`
    display: flex; 
    margin-left: 150px;
    width: 80%;
    justify-content: space-around;
    align-items: center;

    svg {
        color: #135846;
        font-size: 32px;
        cursor: pointer;
        transition: 0.5s;
    }

    svg:hover {
        color: #E23428;
    }
`;

const InnerContainerTitle = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 30px;
`;

const Title = styled.h1<{darkmode: number}>`
    font-size: 28px;
    transition: color 0.5s;
    color: ${props => props.darkmode === 0 ? '#ffff' : '#262626'};
    font-family: 'Poppins', sans-serif;
    font-weight: semibold;
`;

const Subtitle = styled.h2<{darkmode: number}>`
    font-size: 16px;
    color: #135846;
    font-family: 'Poppins', sans-serif;
    font-weight: normal;
    margin-left: 2px;

    small {
        color: #6E6E6E;
        color: ${props => props.darkmode === 0 ? '#ffff' : '#262626'};
        font-size: 1em;
    }
`

const Button = styled.button`
    border: none;
    background: none;
    cursor: pointer;

    svg {
        color: #135846;
        font-size: 32px;
        transition: 0.5s;
    }

    &:hover {
        svg {
            color: #E23428;
        }
    }
`;


const Label = styled.label`
    --button-width: 3.5em;
    --button-height: 2em;
    --toggle-diameter: 1.5em;
    --button-toggle-offset: calc((var(--button-height) - var(--toggle-diameter)) / 2);
    --toggle-shadow-offset: 10px;
    --toggle-wider: 3em;
    --color-grey: #cccccc;
    --color-green: #135846;

    span {
        display: inline-block;
        width: var(--button-width);
        height: var(--button-height);
        background-color: var(--color-grey);
        border-radius: calc(var(--button-height) / 2);
        position: relative;
        transition: 0.3s all ease-in-out;
        cursor: pointer;
        margin-bottom: 5px;
    }

    span::after {
        content: "";
        display: inline-block;
        width: var(--toggle-diameter);
        height: var(--toggle-diameter);
        background-color: #fff;
        border-radius: calc(var(--toggle-diameter) / 2);
        position: absolute;
        top: var(--button-toggle-offset);
        transform: translateX(var(--button-toggle-offset));
        box-shadow: var(--toggle-shadow-offset) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
        transition: 0.3s all ease-in-out;
    }

    input:checked + span {
        background-color: var(--color-green);
    }

    input:checked + span::after {
        transform: translateX(calc(var(--button-width) - var(--toggle-diameter) - var(--button-toggle-offset)));
        box-shadow: calc(var(--toggle-shadow-offset) * -1) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
    }

    input {
        display: none;
    }

    input:active + span::after {
        width: var(--toggle-wider);
    }

    input:checked:active + span::after{
        transform: translateX(calc(var(--button-width) - var(--toggle-wider) - var(--button-toggle-offset)));
    }

`;




