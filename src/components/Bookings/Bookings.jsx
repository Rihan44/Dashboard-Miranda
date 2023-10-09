import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { BsTrash } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";

import { MainContainer } from "../Reusables/MainContainer";
import { Table } from "../Reusables/Table";
import { deleteBooking, getAllBookings, getBookingDetail, updateBooking } from "../../features/bookingsSlice";
import { SpinnerLoader } from "../Reusables/SpinnerLoader";
import { TablePrueba } from "../Reusables/TablePrueba";


export const Bookings = () => {

    const [dataBooking, setBookingData] = useState([]);
    const [selectData, setSelectData] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState('');
    const [isActiveButton, setIsActiveButton] = useState('allBookings');
    const [searchData, setSearchData] = useState('');

    const bookingsSliceData = useSelector((state) => state.bookings.data);
    const status = useSelector((state) => state.bookings.status);

    const dispatch = useDispatch();

    const allBookings = isActiveButton === 'allBookings';
    const checkIn = isActiveButton === 'checkIn';
    const checkOut = isActiveButton === 'checkOut';
    const inProgress = isActiveButton === 'inProgress';

    const navigate = useNavigate();

    let options = { year: 'numeric', month: 'long', day: 'numeric' };

    const handleSelect = (e) => {
        setSelectData(e.target.value);
    }

    const handleSearch = (e) => {
        setSearchData(e.target.value.toLowerCase());
    }

    const handleTab = (activeButton) => {
        setIsActiveButton(activeButton);
    }

    const handleBookingId = (id) => {
        navigate(`/bookings/${id}`);
        dispatch(getBookingDetail(id));
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    const handleOpenModal = (data) => {
        setModalInfo(data);
        setModalOpen(true);
    }

    const handleDelete = (id) => {
        dispatch(deleteBooking(id));
    }

    const handleUpdate = (id) => {
        /* dispatch(updateBooking(id));
        navigate(`/bookings/update-booking/${id}`); */
        console.log(id)
    }


    useEffect(() => {
        let dataArray = [...bookingsSliceData];

        if (status === 'fulfilled') {
            setBookingData(dataArray);
        }

        if (searchData.length !== '') {
            dataArray = dataArray.filter(data => data.guest.toLowerCase().includes(searchData));
        }

        switch (isActiveButton) {
            case 'allBookings':
                setBookingData(dataArray);
                break;
            case 'checkIn':
                dataArray = dataArray.filter(data => data.status === 'check_in');
                break;
            case 'checkOut':
                dataArray = dataArray.filter(data => data.status === 'check_out');
                break;
            case 'inProgress':
                dataArray = dataArray.filter(data => data.status === 'in_progress');
                break;
            default:
        }

        switch (selectData) {
            case 'Order Date':
                dataArray.sort((a, b) => {
                    const dateA = new Date(a.order_date);
                    const dateB = new Date(b.order_date);
                    return dateA - dateB;
                });
                break;
            case 'Guest':
                dataArray.sort((a, b) => a.guest.localeCompare(b.guest));
                break;
           /*  case 'Check In':
                dataArray.sort((a, b) => a.check_in.localeCompare(b.check_in));
                break;
            case 'Check Out':
                dataArray.sort((a, b) => a.check_out.localeCompare(b.check_out));
                break;
            case 'In Progress':
                dataArray.sort((a, b) => a.in_progress.localeCompare(b.in_progress));
                break; */
            default:
        }

        setBookingData(dataArray);

    }, [isActiveButton, selectData, searchData, bookingsSliceData, status]);

    useEffect(() => {
        dispatch(getAllBookings());
    }, [dispatch])

    const cols = [
        {
            property: 'guest', label: 'Guest', display: ({ guest, phone_number, id }) => (
                <TableContainerBodyContent>
                    <CostumerName>{guest}</CostumerName>
                    <Paragraphs>{phone_number}</Paragraphs>
                    <ButtonID onClick={() => handleBookingId(id)}>#{id}</ButtonID>
                </TableContainerBodyContent>
            )
        },
        {
            property: 'order_date', label: 'Order Date', display: ({ order_date }) => (
                <TableContainerBodyContent>
                    <OrderDate>{
                        new Date(order_date.split("-")[0], order_date.split("-")[1] - 1,
                            order_date.split("-")[2]).toLocaleDateString('en-EN', options)
                    }</OrderDate>
                </TableContainerBodyContent>
            )
        },
        {
            property: 'check_in', label: 'Check In', display: ({ check_in }) => (
                <TableContainerBodyContent>
                    <CheckInDate>{
                        new Date(check_in.split("-")[0], check_in.split("-")[1] - 1,
                            check_in.split("-")[2]).toLocaleDateString('en-EN', options)
                    }</CheckInDate>
                    <CheckInTime>9.46 PM</CheckInTime>
                </TableContainerBodyContent>
            )
        },
        {
            property: 'check_out', label: 'Check Out', display: ({ check_out }) => (
                <TableContainerBodyContent>
                    <CheckOutDate>{
                        new Date(check_out.split("-")[0], check_out.split("-")[1] - 1,
                            check_out.split("-")[2]).toLocaleDateString('en-EN', options)
                    }</CheckOutDate>
                    <CheckOutTime>6.12 PM</CheckOutTime>
                </TableContainerBodyContent>
            )
        },
        {
            property: 'special_request', label: 'Special Request', display: ({ special_request }) => (
                <TableContainerBodyContent>
                    <ViewNotesButton onClick={() => handleOpenModal(special_request)}>View Notes</ViewNotesButton>
                </TableContainerBodyContent>
            )
        },
        {
            property: 'room_type', label: 'Room Type', display: ({ room_type, room_number }) => (
                <TableContainerBodyContent>
                    <TypeRoom>{room_type}-{room_number}</TypeRoom>
                </TableContainerBodyContent>
            )
        },
        {
            property: 'status', label: 'Status', display: ({ status, id }) => (
                <StatusContent>
                    <Status $status={status}>{status}</Status>
                    <OptionsButton>
                        <BsTrash onClick={() => handleDelete(id)} />
                        <AiFillEdit onClick={() => handleUpdate(id)} />
                    </OptionsButton>
                </StatusContent>
            )
        }
    ]

    return (
        <>
            <MainContainer>
                <BookingContainer>
                    <Modal $modalOpen={modalOpen}>
                        <ModalInfo>
                            <ButtonModalClose onClick={handleCloseModal}>
                                <AiOutlineCloseCircle />
                            </ButtonModalClose>
                            <p>{modalInfo}</p>
                        </ModalInfo>
                    </Modal>
                    <FilterContainer>
                        <TabsContainer>
                            <ButtonTabs $actived={allBookings} onClick={() => handleTab('allBookings')}>
                                All Bookings
                            </ButtonTabs>
                            <ButtonTabs $actived={checkIn} onClick={() => handleTab('checkIn')}>
                                Check In
                            </ButtonTabs>
                            <ButtonTabs $actived={checkOut} onClick={() => handleTab('checkOut')}>
                                Check Out
                            </ButtonTabs>
                            <ButtonTabs $actived={inProgress} onClick={() => handleTab('inProgress')}>
                                In Progress
                            </ButtonTabs>
                        </TabsContainer>
                        <Filters>
                            <input type="text" placeholder="Customer Name..." onChange={handleSearch} />
                            <Select onChange={handleSelect}>
                                <Option>Order Date</Option>
                                <Option>Guest</Option>
                                {/* <Option>Check In</Option>
                                <Option>Check Out</Option>
                                <Option>In Progress</Option> */}
                            </Select>
                        </Filters>
                    </FilterContainer>
                    {status === 'fulfilled'
                        ? <TablePrueba cols={cols} data={dataBooking} totalCols={7} totalHeaders={7} />
                        : status === 'rejected' ? alert('Algo falló')
                            : <SpinnerLoader></SpinnerLoader>
                    }
                </BookingContainer>
            </MainContainer>
        </>
    )
}

const Modal = styled.div`
    display: ${props => props.$modalOpen === true ? 'block' : 'none'};
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); 
    transition: 0.5s;
`;

const ModalInfo = styled.div`
    background:#ffff;
    position: absolute; 
    top: 25%;
    left: 40%;
    width: 450px;
    height: 250px;
    border: 1px solid #EBEBEB;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0px 4px 4px #00000010;
    word-wrap: break-word;
    text-align: center;

    p {
        width: 90%;
        margin: auto;
        margin-top: 30px;
        color: #4E4E4E;
        font-family: 'Poppins', sans-serif;
        font-size: 18px;
        margin-bottom: 30px;
        max-height: 300px;
        overflow: auto;
    }
`;

const ButtonModalClose = styled.button`
    color: #aaa;
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
    font-size: 24px;
    transition: 0.4s;
    border: none;
    background: none;

    &:hover {
        color: black;
    }
`;

const Buttons = styled.button`
    border: none;
    background: none;
    cursor: pointer;
`;

const BookingContainer = styled.div`
    margin-top: 50px;
    margin-left: 80px;
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


const Paragraphs = styled.p`
    color: #C5C5C5;
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 5px;
`;

const TableContainerBodyContent = styled.div`
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

const StatusContent = styled(TableContainerBodyContent)`
    display: flex;
    flex-direction: row;
`;

