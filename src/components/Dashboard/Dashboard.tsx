import styled from "styled-components";

import { useContext, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { LiaBedSolid } from "react-icons/lia";
import { LuCalendarCheck2 } from "react-icons/lu";
import { GoSignOut } from "react-icons/go";
import { GoSignIn } from "react-icons/go";

import { MainContainer } from "../Reusables/MainContainer";
import { LastestReview } from "./LastestReview";
import { getAllMessages } from "../../features/thunks/contactThunk";
import { SpinnerLoader } from "../Reusables/SpinnerLoader";
import { ContactInterface } from "../../interfaces/contactInterface";

import { AsideContext } from "../Context/ToggleAsideContext";

export const Dashboard = () => {

    const { asideState } = useContext(AsideContext);
    let darkMode: boolean = asideState?.darkMode || false;

    const contactData = useAppSelector((state) => state.contact.data);
    const status = useAppSelector((state) => state.contact.status);

    const dispatch = useAppDispatch();

    const dataContact = useMemo(() => {
           
        let dataArray: ContactInterface[] = [];
        
        if (status === 'fulfilled' && contactData) {
            dataArray = [...contactData];
        }
    
        return dataArray;
    
    }, [contactData, status]);

    useEffect(() => {
        dispatch(getAllMessages());
    }, [dispatch]);

    return (
        <>
            <MainContainer>
                <ContainerCards>
                    <Card darkmode={darkMode ? 0 : 1}>
                        <div>
                            <LiaBedSolid />
                        </div>
                        <div>
                            <h4>8,461</h4>
                            <p>New Booking</p>
                        </div>
                    </Card>
                    <Card darkmode={darkMode ? 0 : 1}>
                        <div>
                            <LuCalendarCheck2 />
                        </div>
                        <div>
                            <h4>963</h4>
                            <p>Scheduled Room</p>
                        </div>
                    </Card>
                    <Card darkmode={darkMode ? 0 : 1}>
                        <div>
                            <GoSignOut />
                        </div>
                        <div>
                            <h4>753</h4>
                            <p>Check In</p>
                        </div>
                    </Card>
                    <Card darkmode={darkMode ? 0 : 1}>
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
                    ? <LastestReview darkMode={darkMode} dataDashboard={dataContact} />
                    : status === 'rejected' ? <h1>Error Something went wrong try to reload the page</h1>
                    : status === 'pending' && <SpinnerLoader></SpinnerLoader>
                }
            </MainContainer>
        </>
    )
}

const ContainerCards = styled.div`
    display: flex;
    margin-top: 50px;
    margin-left: 50px;
    min-width: 1485px;
`;

const Card = styled.div<{darkmode: number}>`
    width: 340px;
    height: 125px;
    background-color: ${props => props.darkmode === 0 ? '#202020' : '#ffff'};
    box-shadow: 0px 4px 4px #00000010;
    border-radius: 12px;
    margin-right: 38px;
    display: flex;
    align-items: center;
    transition: 0.5s;

    &:hover {
        transform: scale(1.1);

        div:nth-child(1) {
            transition: 0.5s;
            background: #E23428;

            svg {
               color: #FFFFFF; 
            }
        }
    }

    div:nth-child(1) {
        background-color: ${props => props.darkmode === 0 ? '#E234281C' : '#FFEDEC'};
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
        transition: 0.5s;

        h4 {
            font-family: 'Poppins', sans-serif;
            font-size: 30px;
            transition: color 0.5s;
            color: ${props => props.darkmode === 0 ? '#FFEDEC' : '#393939'};
        }

        p {
            font-size: 14px;
            color: #787878;
            font-family: 'Poppins', sans-serif;
        }
    } 
`;

