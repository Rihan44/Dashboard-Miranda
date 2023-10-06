import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteRoom, getAllRooms, getRoom} from "../../features/roomsSlice";

import { SpinnerLoader } from "../Reusables/SpinnerLoader";

import { BsTrash } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

import { MainContainer } from "../Reusables/MainContainer";
import { Table } from "../Reusables/Table";


export const RoomsList = () => {

    const [isActiveButton, setIsActiveButton] = useState('allRooms');
    const [selectData, setSelectData] = useState('');
    const [dataRooms, setDataRooms] = useState([]);

    const allRooms = isActiveButton === 'allRooms';
    const statusAvailable = isActiveButton === 'statusAvailable';
    const statusBooked = isActiveButton === 'statusBooked';

    const roomsData = useSelector((state) => state.rooms.data);
    const status = useSelector((state) => state.rooms.status);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleTab = (activeButton) => {
        setIsActiveButton(activeButton);
    }

    const handleSelect = (e) => {
        setSelectData(e.target.value);
    }

    const handleDelete = (id) => {
        dispatch(deleteRoom(id));
    }

    const handleEdit = (id) => {
        dispatch(getRoom(id));
        navigate(`/rooms/update-room/${id}`);
    }

    useEffect(() => {

        let dataArray = [...roomsData];

        if (status === 'fulfilled') {
            setDataRooms(dataArray);
        }

        switch (isActiveButton) {
            case 'allRooms':
                dataArray.sort((a, b) => a.room_number - b.room_number);
                break;
            case 'statusAvailable':
                dataArray = dataArray.filter(data => data.state === 'available');
                break;
            case 'statusBooked':
                dataArray = dataArray.filter(data => data.state === 'booked');
                break;
            default:
                dataArray.sort((a, b) => a.room_number - b.room_number);
        }

        switch (selectData) {
            case 'Price':
                dataArray = dataArray.sort((a, b) => b.price - a.price);
                break;
            case 'Room Type':
                dataArray = dataArray.sort((a, b) => a.room_type.localeCompare(b.room_type));
                break;
            default:
                dataArray.sort((a, b) => a.room_number - b.room_number);
        }

        setDataRooms(dataArray);

    }, [isActiveButton, setDataRooms, selectData, roomsData, status])

    useEffect(() => {
        dispatch(getAllRooms());
    }, [dispatch]);

    const cols = [
        {
            property: 'image', label: 'Room Info', display: ({ image, id, room_number }) => (
                <TableContainerBodyContent>
                    <img src={image || ''} alt="imagen" />
                    <div>
                        <IDparagraph>{id}</IDparagraph>
                        <p>Room number {room_number}</p>
                    </div>
                </TableContainerBodyContent>
            )
        },

        {
            property: 'room_type', label: 'Room Type'
        },
        {
            property: 'amenities', label: 'Amenities', display: ({ amenities }) => (
                <AmenitiesContainer>
                    <p>{amenities !== null ? amenities.join(', ') : ''}</p>
                </AmenitiesContainer>
            )
        },
        {
            property: 'price', label: 'Price', display: ({ price, offer_price }) => (
                <PriceParagraph>
                    {offer_price ? <><del>{price}</del><small>/Night</small></> : <>{price}<small>/Night</small></>}
                </PriceParagraph>
            )
        },
        {
            property: 'offer_price', label: 'Offer Price', display: ({ offer_price, discount, price }) => (
                <Discount>{offer_price === false ? <del>No Offer</del> : ( price - (discount * price / 100))}</Discount>
            )
        },
        {
            property: 'status', label: 'Status', display: ({ state, id }) =>
                <StatusContent>
                    <Status $status={state}>{state}</Status>
                    <OptionsButton>
                        <BsTrash onClick={() => handleDelete(id)} />
                        <AiFillEdit onClick={() => handleEdit(id)} />
                    </OptionsButton>
                </StatusContent>
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
                    {status === 'fulfilled'
                        ? <Table cols={cols} data={dataRooms} totalCols={6}></Table>
                        : status === 'rejected' ? alert('Algo falló')
                            : <SpinnerLoader></SpinnerLoader>
                    }
                </RoomsContainer>
            </MainContainer>
        </>

    )
}

const RoomsContainer = styled.div`
    margin-top: 10px;
    margin-left: 70px;
    min-width: 1400px;
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
`;

const FilterContainer = styled.div`
    width: 100%;
    display: flex;
    height: 70px;
    max-width: 1400px;
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
    color: ${props => props.$actived ? "#135846" : "#6E6E6E"};
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

const Status = styled.p`
    ${(props) => {
        switch (props.$status) {
            case 'available':
                return `
                background: #5AD07A;
            `;
            case 'booked':
                return `
                background: #E23428;
                color: #ffffff; 
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

const TableBodyContent = styled.div`
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    position: relative;
    display: flex;
    flex-direction: column;

    div {
        height: 80px;
        width: 140px;
        position: absolute;
        background: #ffffff;
        top: -20px;
        left: -30px;
        box-shadow: 0px 4px 4px #00000010;
        border-radius: 10px;
        transition: 0.5s;
    }

`;

const StatusContent = styled(TableBodyContent)`
    display: flex;
    flex-direction: row;
`;

const OptionsButton = styled(Buttons)`
    font-size: 30px;
    color:#393939;
    display: flex;
    flex-direction: column;

    svg:nth-child(1) {
        color: #E23428;
        margin-left: 10px;
        transition: 0.5s;
        font-size: 1.05em;

        &:hover {
            transform: scale(1.1, 1.1);
        }
    }

    svg:nth-child(2) {
        color: #5AD07A;
        margin-left: 10px;
        transition: 0.5s;

        &:hover {
            transform: scale(1.1, 1.1);
        }
    }
`;


const TableContainerBodyContent = styled.div`
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    position: relative;
    display: flex;
    justify-content: center;

    p {
        font-family: inherit;
        margin-left: 40px;
        margin-top: 10px;
    }

    img {
        width: 70%;
        height: 120px;
        background: #C5C5C5;
        border-radius: 10px;
    }

    div {
        display: flex;
        flex-direction: column;
        width: 30%;
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
    color: #212121;
    font-weight: bold;
    font-size: 20px;
`;

const SpinnerContainer = styled.div`
    position: absolute;
    top: 35%;
    left: 50%;
`;