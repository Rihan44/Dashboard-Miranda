import styled from "styled-components";

import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { LiaBedSolid } from "react-icons/lia";
import { LuCalendarCheck2 } from "react-icons/lu";
import { GoSignOut } from "react-icons/go";
import { GoSignIn } from "react-icons/go";

import { MainContainer } from "../Reusables/MainContainer";
import { LastestReview } from "./LastestReview";
import { getAllMessages } from "../../features/contactSlice";
import { SpinnerLoader } from "../Reusables/SpinnerLoader";
import { AsideContext } from "../Context/ToggleAsideContext";
import { ContactInterface } from "../../interfaces/contactInterface";


export const Dashboard = () => {

    const [dataContact, setDataContact] = useState<ContactInterface[]>([]);
    const { asideState } = useContext(AsideContext);

    const contactData = useAppSelector((state) => state.contact.data);
    const status = useAppSelector((state) => state.contact.status);

    const dispatch = useAppDispatch();

    useEffect(() => {
        let dataArray: ContactInterface[] = [...contactData];

        if (status === 'fulfilled') {
            setDataContact(dataArray);
        }

    }, [contactData, status]);

    useEffect(() => {
        dispatch(getAllMessages());
    }, [dispatch]);

    return (
        <>
            <MainContainer>
                <ContainerCards>
                    <Card darkmode={asideState.darkMode}>
                        <div>
                            <LiaBedSolid />
                        </div>
                        <div>
                            <h4>8,461</h4>
                            <p>New Booking</p>
                        </div>
                    </Card>
                    <Card darkmode={asideState.darkMode}>
                        <div>
                            <LuCalendarCheck2 />
                        </div>
                        <div>
                            <h4>963</h4>
                            <p>Scheduled Room</p>
                        </div>
                    </Card>
                    <Card darkmode={asideState.darkMode}>
                        <div>
                            <GoSignOut />
                        </div>
                        <div>
                            <h4>753</h4>
                            <p>Check In</p>
                        </div>
                    </Card>
                    <Card darkmode={asideState.darkMode}>
                        <div>
                            <GoSignIn />
                        </div>
                        <div>
                            <h4>516</h4>
                            <p>Check Out</p>
                        </div>
                    </Card>
                </ContainerCards>
                {status === 'fulfilled'
                    ? <LastestReview darkMode={asideState.darkMode} dataDashboard={dataContact} />
                    : status === 'rejected' ? alert('Algo falló')
                        : <SpinnerLoader></SpinnerLoader>
                }
            </MainContainer>
        </>
    )
}

interface PropsContainerCards {
    darkmode?: boolean
}

const ContainerCards = styled.div`
    display: flex;
    margin-top: 50px;
    margin-left: 50px;
    min-width: 1485px;
`;

const Card = styled.div<PropsContainerCards>`
    width: 340px;
    height: 125px;
    background-color: ${props => props.darkmode ? '#202020' : '#ffff'};
    box-shadow: 0px 4px 4px #00000010;
    border-radius: 12px;
    margin-right: 38px;
    display: flex;
    align-items: center;
    transition: 0.5s;

    &:hover {

        transform: scale(1.1);
        div:nth-child(1) {
            background: #E23428;
            svg {
               color: #FFFFFF; 
            }
        }
    }

    div:nth-child(1) {
        background-color: ${props => props.darkmode ? '#E234281C' : '#FFEDEC'};
        width: 65px;
        height: 65px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 30px;
        transition: 0.5s;
        svg {
            width: 28px;
            height: 20px;
            color: #E23428;
        }
    }

    div:nth-child(2){
        margin-left: 22px;
        h4 {
            font-family: 'Poppins', sans-serif;
            font-size: 30px;
            transition: color 0.5s;
            color: ${props => props.darkmode ? '#FFEDEC' : '#393939'};
        }

        p {
            font-size: 14px;
            color: #787878;
            font-family: 'Poppins', sans-serif;
        }
    } 
`;
