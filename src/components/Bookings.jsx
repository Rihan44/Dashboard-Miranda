import styles from "styled-components";
import {bookingData} from "../data/bookingData";

import { BiDotsVerticalRounded } from "react-icons/bi";

export const Bookings = () => {
    return(
        <>
            <Main>
                <BookingContainer>
                    <FilterContainer>
                        <TabsContainer>
                            <ButtonTabs>
                                All Bookings
                            </ButtonTabs>
                            <ButtonTabs>
                                Check In
                            </ButtonTabs>
                            <ButtonTabs>
                                Check Out
                            </ButtonTabs>
                            <ButtonTabs>
                                In Progress
                            </ButtonTabs>
                        </TabsContainer>
                        <Filters>
                            <input type="text" placeholder="Customer Name..."/>
                            <Select>
                                <Option>Order Date</Option>
                                <Option>Guest</Option>
                                <Option>Check In</Option>
                                <Option>Check Out</Option>
                            </Select>
                        </Filters>
                    </FilterContainer>
                    <TableContainerTitle>    
                        <TableTitles>Guest</TableTitles>
                        <TableTitles>Order Date</TableTitles>
                        <TableTitles>Check IN</TableTitles>
                        <TableTitles>Check Out</TableTitles>
                        <TableTitles>Special Request</TableTitles>
                        <TableTitles>Room Type</TableTitles>
                        <TableTitles>Status</TableTitles>
                    </TableContainerTitle>
                        {bookingData.map((data) => ( 
                            <TableContainerBody>
                                <TableContainerBodyContent>
                                    <CostumerName>{data.guest}</CostumerName>
                                    <CostumerPhone>{data.phone_number}</CostumerPhone>
                                    <ButtonID>#{data.id}</ButtonID>
                                </TableContainerBodyContent>
                                <TableContainerBodyContent>
                                    <OrderDate>{data.order_date}</OrderDate>
                                </TableContainerBodyContent>
                                <TableContainerBodyContent>
                                    <CheckInDate>{data.check_in}</CheckInDate>
                                    <CheckInTime>9.46 PM</CheckInTime>
                                </TableContainerBodyContent>
                                <TableContainerBodyContent>
                                    <CheckOutDate>{data.check_out}</CheckOutDate>
                                    <CheckOutTime>6.12 PM</CheckOutTime>
                                </TableContainerBodyContent>
                                <TableContainerBodyContent>
                                    <ViewNotesButton>View Notes</ViewNotesButton>
                                </TableContainerBodyContent>
                                <TableContainerBodyContent>
                                    <TypeRoom>{data.room_type}-{data.room_number}</TypeRoom>
                                </TableContainerBodyContent>
                                <TableContainerBodyContent>
                                    <Status>{data.status}</Status>
                                    <OptionsButton><BiDotsVerticalRounded/></OptionsButton>
                                </TableContainerBodyContent>
                            </TableContainerBody>
                        ))}
                </BookingContainer>
            </Main>
        </>
    )
}

const Main = styles.main`
    display: flex;
    flex-direction: column;
`;

const BookingContainer = styles.div`
    margin-top: 50px;
    margin-left: 50px;
    min-width: 1400px;
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
`;

const FilterContainer = styles.div`
    width: 100%;
    display: flex;
    height: 70px;
`;

const TabsContainer = styles.div`
    width: 40%;
    display: flex;
    border-bottom: 1px solid #00000010;
    align-self: center;
`;

const ButtonTabs = styles.button`
    border: none;
    background: none;
    cursor: pointer;
    color: #6E6E6E;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    height: 30px;
    width: 30%;

    &:hover {
        color: #135846;
        border-bottom: 2px solid #135846;
    }
`;

const Filters = styles.div`
    width: 60%;
    display: flex;
    justify-content: flex-end;
    margin-right: 50px;
    align-items: end;

    input {
        width: 427px;
        height: 50px;
        margin-right: 20px;
        outline: #135846;
        border: none;
        background: #135846 0% 0% no-repeat padding-box;
        border-radius: 12px;
        color: #ffffff;
        font-size: 16px;
        font-family: 'Poppins', sans-serif;
        padding-left: 10px;
    }
`;

const Select = styles.select`
    width: 129px; 
    height: 50px;
    border: 1px solid #135846;
    border-radius: 12px;
    color: #135846;
    background: none;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    
`;

const Option = styles.option`
    background: #ffffff;
`;

const TableContainerTitle = styles.div`
    border-radius: 20px 20px 0px 0px;
    border: 1px solid #00000015;
    height: 65px;
    margin-top: 35px;
    width: 97%;
    display: flex;
    justify-content: space-space-between;
    padding: 20px;

    div:nth-child(1), div:nth-child(2) {
        width: 25%;
    }

    div:nth-child(6){
        margin-left: 40px;
    }
`;

const TableTitles = styles.div`
    color: #393939;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    width: 18%;
    margin-right: 10px;
    margin-left: 10px;
`;

const TableContainerBody = styles.div`
    border: 1px solid #00000015;
    height: auto;
    width: 97%;
    display: flex;
    justify-content: space-space-between;
    padding: 20px;
    margin-right: 10px;
    align-items: center;

    div {
        width: 15%;
        width: 18%;
        margin-right: 10px;
        margin-left: 10px;
    }

    div:nth-child(1), div:nth-child(2) {
        width: 25%;
    }

    div:last-child {
        display: flex;
        justify-content: space-between;
    }

    div:nth-child(6){
        margin-left: 40px;
    }
`;

const TableContainerBodyContent = styles.div`
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
`;  

const CostumerName = styles.p`
    color: #393939;
`;

const CostumerPhone = styles.p`
    color: #C5C5C5;
`;

const ButtonID = styles.button`
    color: #799283;
    transition: 0.2s;
    border: none;
    background: none;
    cursor: pointer;
    &:hover {
        color: #135846;
    }
`;

const OrderDate = styles.p`
    color: #C5C5C5;
    align-self: baseline;
`;

const CheckInDate = styles.p`
    color: #393939;
`;

const CheckInTime = styles.p`
    color: #C5C5C5;
    font-size: 14px;
`;

const CheckOutDate = styles.p`
    color: #393939;
`;

const CheckOutTime = styles.p`
    color: #C5C5C5;
    font-size: 14px;
`;

const ViewNotesButton = styles.button`
    border: none;
    background: none;
    color: #212121;
    font-size: 16px;
    background: #EEF9F2;
    padding: 15px;
    border-radius: 12px;
    font-weight: 500;
    cursor: pointer;
    align-self: center;
    justify-center: center;
    width: 160px;
    transition: 0.3s;

    &:hover {
        background: #135846;
        color: #EEF9F2;
    }
`;

const TypeRoom = styles.p`
    color: #393939;
`;

const Status = styles.p`
    /* HACER LA LÓGICA DE LOS COLORES */
    color: ##5AD07A;
    background: #E8FFEE;
    padding: 15px;
    border-radius: 12px;
`;

const OptionsButton = styles.button`
    border: none;
    background: none;
    cursor: pointer;
    font-size: 30px;
    color:#393939;
`;