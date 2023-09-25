import styles from "styled-components";

import { Header } from "./Header"
import { Menu } from "./Menu"

import { LiaBedSolid } from "react-icons/lia";
import { LuCalendarCheck2 } from "react-icons/lu";
import { GoSignOut } from "react-icons/go";
import { GoSignIn } from "react-icons/go";


export const Dashboard = () => {
    return (
        <>
            <Header title="Dashboard" />
            <Menu />
            <Main>
                <ContainerCards>
                    <Card>
                        <div>
                            <LiaBedSolid/>
                        </div>
                        <div>
                            <h4>8,461</h4>
                            <p>New Booking</p>
                        </div>
                    </Card>
                    <Card>
                        <div>
                            <LuCalendarCheck2/>
                        </div>
                        <div>
                            <h4>963</h4>
                            <p>Scheduled Room</p>
                        </div>
                    </Card>
                    <Card>
                        <div>
                            <GoSignOut/>
                        </div>
                        <div>
                            <h4>753</h4>
                            <p>Check In</p>
                        </div>
                    </Card>
                    <Card>
                        <div>
                            <GoSignIn/>
                        </div>
                        <div>
                            <h4>516</h4>
                            <p>Check Out</p>
                        </div>
                    </Card>
                </ContainerCards>
            </Main>
        </>
    )
}

const Main = styles.main`
    display: flex;
    flex-direction: column;
    padding-left: 0px;
`;

const ContainerCards = styles.div`
    display: flex;
    width: 100%;
    margin-top: 50px;
`;

const Card = styles.div`
    width: 340px;
    height: 125px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 4px 4px #00000010;
    border-radius: 12px;
    margin-right: 38px;
    display: flex;
    align-items: center;
    transition: 0.5s;

    &:hover {
        div:nth-child(1) {
            background: #E23428;
            svg {
               color: #FFFFFF; 
            }
        }
    }

    div:nth-child(1) {
        background: #FFEDEC;
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
            color: #393939;
        }

        p {
            font-size: 14px;
            color: #787878;
            font-family: 'Poppins', sans-serif;
        }
    } 
`;

