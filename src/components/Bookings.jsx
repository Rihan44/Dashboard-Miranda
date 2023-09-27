import styled from "styled-components";

import { bookingData } from "../data/bookingData";

import { BiDotsVerticalRounded } from "react-icons/bi";
import { useEffect, useState } from "react";

export const Bookings = () => {

    let [dataBooking, setBookinData] = useState([]);
    const [selectData, setSelectData] = useState('');
    const [tabsSelect, setTabsSelect] = useState('');

    const handleSelect = (e) => {
        const optionValue = e.target.value;
        setSelectData(optionValue);
    }

    const handleTab = (value) => {
        setTabsSelect(value);
    }

    useEffect(() => {

        let dataArray = [];
        bookingData.forEach(data => {
            dataArray.push(data);
        });


        switch (tabsSelect) {
            case 'all_bookings':
                dataBooking = dataArray;
                break;
            case 'check_in':
                dataBooking = dataArray;
                dataArray = dataBooking.filter(data => data.status === 'check_in');
                break;
            case 'check_out':
                dataBooking = dataArray;
                dataArray = dataBooking.filter(data => data.status === 'check_out');
                break;
            case 'in_progress':
                dataBooking = dataArray;
                dataArray = dataBooking.filter(data => data.status === 'in_progress');
                break;
            default: 
                
        }
        setBookinData(dataArray);

        dataBooking = dataBooking.sort((a, b) => b.order_date - a.order_date);

    }, [tabsSelect, setBookinData])

    return (
        <>
            <Main>
                <BookingContainer>
                    <FilterContainer>
                        <TabsContainer>
                            <ButtonTabs onClick={() => handleTab('all_bookings')}>
                                All Bookings
                            </ButtonTabs>
                            <ButtonTabs onClick={() => handleTab('check_in')}>
                                Check In
                            </ButtonTabs>
                            <ButtonTabs onClick={() => handleTab('check_out')}>
                                Check Out
                            </ButtonTabs>
                            <ButtonTabs onClick={() => handleTab('in_progress')}>
                                In Progress
                            </ButtonTabs>
                        </TabsContainer>
                        <Filters>
                            <input type="text" placeholder="Customer Name..." />
                            <Select onChange={handleSelect}>
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
                    {dataBooking.map((data) => (
                        <TableContainerBody key={data.id}>
                            <TableContainerBodyContent>
                                <CostumerName>{data.guest}</CostumerName>
                                <Paragraphs>{data.phone_number}</Paragraphs>
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
                                <Status $status={data.status}>{data.status}</Status>
                                <OptionsButton><BiDotsVerticalRounded /></OptionsButton>
                            </TableContainerBodyContent>
                        </TableContainerBody>
                    ))}
                </BookingContainer>
            </Main>
        </>
    )
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
`;

const Buttons = styled.button`
    border: none;
    background: none;
    cursor: pointer;
`;

const BookingContainer = styled.div`
    margin-top: 50px;
    margin-left: 50px;
    min-width: 1400px;
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
`;

const FilterContainer = styled.div`
    width: 100%;
    display: flex;
    height: 70px;
`;

const TabsContainer = styled.div`
    width: 40%;
    display: flex;
    border-bottom: 1px solid #00000010;
    align-self: center;
`;


const ButtonTabs = styled(Buttons)`
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

const Filters = styled.div`
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

const Select = styled.select`
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

const Option = styled.option`
    background: #ffffff;
`;

const TableContainerTitle = styled.div`
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

const TableTitles = styled.div`
    color: #393939;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    width: 18%;
    margin-right: 10px;
    margin-left: 10px;
`;

const TableContainerBody = styled.div`
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

const Paragraphs = styled.p`
    color: #C5C5C5;

`;

const TableContainerBodyContent = styled.div`
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
`;

const CostumerName = styled.p`
    color: #393939;
`;

const ButtonID = styled.button`
    color: #799283;
    transition: 0.2s;
    border: none;
    background: none;
    cursor: pointer;
    &:hover {
        color: #135846;
    }
`;

const OrderDate = styled.p`
    align-self: baseline;
`;

const CheckInDate = styled.p`
    color: #393939;
`;

const CheckInTime = styled(Paragraphs)`
    font-size: 14px;
`;

const CheckOutDate = styled.p`
    color: #393939;
`;

const CheckOutTime = styled(Paragraphs)`
    font-size: 14px;
`;

const ViewNotesButton = styled(Buttons)`
    color: #212121;
    font-size: 16px;
    background: #EEF9F2;
    padding: 15px;
    border-radius: 12px;
    font-weight: 500;
    align-self: center;
    justify-center: center;
    width: 160px;
    transition: 0.3s;

    &:hover {
        background: #135846;
        color: #EEF9F2;
    }
`;

const TypeRoom = styled.p`
    color: #393939;
`;

const Status = styled.p`
    ${(props) => {
        switch (props.$status) {
            case 'check_in':
                return `
                background: #5AD07A;
            `;
            case 'check_out':
                return `
                background: #FFEDEC;
            `;
            case 'in_progress':
                return ` 
                background: #E2E2E2;
            `;
            default:
                return ` 
                background: #5AD07A;
            `
        }
    }}

    padding: 15px;
    border-radius: 12px;
`;

const OptionsButton = styled(Buttons)`
    font-size: 30px;
    color:#393939;
`;