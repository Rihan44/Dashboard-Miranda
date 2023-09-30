import styled from "styled-components";
import { roomsData } from "../../data/roomsData";

import { MainContainer } from "../Reusables/MainContainer";
import { Table } from "../Reusables/Table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const RoomsList = () => {

    const [isActiveButton, setIsActiveButton] = useState('allRooms');
    const [selectData, setSelectData] = useState('');
    const [dataRooms, setDataRooms] = useState([]);

    const allRooms = isActiveButton === 'allRooms';
    const statusAvailable = isActiveButton === 'statusAvailable';
    const statusBooked = isActiveButton === 'statusBooked';

    const navigate = useNavigate();

    const handleTab = (activeButton) => {
        setIsActiveButton(activeButton);
    }

    const handleSelect = (e) => {
        setSelectData(e.target.value);
    }

    useEffect(() => {

        let dataArray = [...roomsData];

        /* TODO EN UN FUTURO HACER QUE SE PUEDAN USAR AMBOS FILTROS JUNTOS */

        switch (isActiveButton) {
            case 'allRooms':
                dataArray.sort((a, b) => a.room_number - b.room_number);
                setDataRooms(dataArray);
                break;
            case 'statusAvailable':
                setDataRooms(dataArray.filter(data => data.state === 'available'));
                break;
            case 'statusBooked':
                setDataRooms(dataArray.filter(data => data.state === 'booked'));
                break;
            default: 
            dataArray.sort((a, b) => a.room_number - b.room_number);
        }

        switch(selectData) {
            case 'Price':
                setDataRooms(dataArray.sort((a, b) => b.price - a.price));
                break;
            case 'Room Type':
                setDataRooms(dataArray.sort((a, b) => a.room_type.localeCompare(b.room_type)));
                break;
            default :
            dataArray.sort((a, b) => a.room_number - b.room_number);
        }


    }, [isActiveButton, setDataRooms, selectData])

    const cols = [
        {
            property: 'image', label: 'Room Info', display: ({ image, id, room_number }) => (
                <TableContainerBodyContent>
                    <img src={image || ''} alt="imagen" />
                    <IDparagraph>{id}</IDparagraph>
                    <p>Room number {room_number}</p>
                </TableContainerBodyContent>
            )
        },

        {
            property: 'room_type', label: 'Room Type'
        },
        {
            property: 'amenities', label: 'Amenities', display: ({amenities}) =>(
                <AmenitiesContainer>
                    <p>{amenities}</p>
                </AmenitiesContainer>
            )
        },
        {
            property: 'price', label: 'Price', display: ({price}) => (
                <PriceParagraph>${price}<small>/Night</small></PriceParagraph>
            )
        },
        {
            property: 'offer_price', label: 'Offer Price', display: ({offer_price, discount}) => (
                <Discount existOffer={offer_price}>{offer_price === false ? 'No Offer' : discount+ '%'}</Discount>
            )
        },
        {
            property: 'status', label: 'Status', display: ({ state }) => <StatusDecoration $state={state}>{state}</StatusDecoration>
        }
    ]

    return (
        <>
            <MainContainer>
                <RoomsContainer>
                    <FilterContainer>
                        <TabsContainer>
                            <ButtonTabs $actived={allRooms} onClick={() => handleTab('allRooms')}>
                                All Rooms
                            </ButtonTabs>
                            <ButtonTabs $actived={statusAvailable} onClick={() => handleTab('statusAvailable')}>
                                All Available 
                            </ButtonTabs>
                            <ButtonTabs $actived={statusBooked} onClick={() => handleTab('statusBooked')}>
                                All Booked 
                            </ButtonTabs>
                        </TabsContainer>
                        <Filters>
                            <ButtonCreateRoom onClick={() => navigate('/rooms/add-room')}>
                                + New Room
                            </ButtonCreateRoom>
                            <Select onChange={handleSelect}>
                                <Option>Price</Option>
                                <Option>Room Type</Option>
                            </Select>
                        </Filters>
                    </FilterContainer>
                    <Table cols={cols} data={dataRooms} totalCols={7}></Table>
                </RoomsContainer>
            </MainContainer>
        </>

    )
}

const RoomsContainer = styled.div`
    margin-top: 10px;
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


const Buttons = styled.button`
    border: none;
    background: none;
    cursor: pointer;
`;

const ButtonTabs = styled(Buttons)`
    color: ${props => props.$actived ?  "#135846" : "#6E6E6E"};
    border-bottom: ${props => props.$actived ? "2px solid #135846" : "none"};
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    height: 30px;
    width: 30%;

    &:hover {
        color: #135846;
        border-bottom: 2px solid #135846;
    }

`;

const ButtonCreateRoom = styled(Buttons)`
    background: #135846;
    color: #FFFFFF;
    width: 213px;
    height: 49px;
    border-radius: 12px;
    margin-right: 20px;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    transition: 0.3s;
    box-shadow: 0px 3px 10px #00000030;
    cursor: pointer;

    &:hover {
        background: #799283;
    }
`;

const Filters = styled.div`
    width: 60%;
    display: flex;
    justify-content: flex-end;
    margin-right: 125px;
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

const StatusDecoration = styled.div`
    width: 10px;
    height: 50px;
    ${(props) => {
        switch (props.$state) {
            case 'booked':
                return `
                background: #E23428;
                color: #FFFFFF;
            `;
            case 'available':
                return `
                background: #5AD07A;
                color: #FFFFFF;
            `;
            default:
                return ` 
                background: #5AD07A;
                color: #FFFFFF;
            `
        }
    }}

    border-radius: 10px;
    display: flex; 
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
`;


const TableContainerBodyContent = styled.div`
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
        font-family: inherit;
        margin-left: 40px;
        margin-top: 10px;
    }

    img {
        width: 120px;
        height: 120px;
        background: #C5C5C5;
        margin-left: 40px;
    }

`;
const IDparagraph = styled.p`
    color: #799283;
`;

const AmenitiesContainer = styled.div`
    width: 15%;
    font-size: 14px;
`;

const PriceParagraph = styled.p`
    color: #212121;
    font-weight: bold;
    font-size: 20px;
    margin-left: 40px;
    small {
        color: #799283;
        font-size: 14px;
        margin-left: 10px;
    }
`;

const Discount = styled.div`
    color: ${props => props.existOffer === true ? '#5AD07A' : '#E23428'};
    font-weight: bold;
    font-size: 20px;
`;