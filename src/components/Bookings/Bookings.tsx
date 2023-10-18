import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BsTrash } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

import { MainContainer } from "../Reusables/MainContainer";
import { deleteBooking, getAllBookings, getBookingDetail} from "../../features/bookingsSlice";
import { SpinnerLoader } from "../Reusables/SpinnerLoader";
import { Tabla } from "../Reusables/Tabla";
import { DeleteSpinner } from "../Reusables/DeleteSpinner";
import { AsideContext } from "../Context/ToggleAsideContext";
import { StatusParagraph } from "../Reusables/StatusParagraph";
import { ToastAlert } from "../Reusables/ToastAlert";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BookingsInterface } from "../../interfaces/bookingsInterface";

export const Bookings = () => {

    const {asideState}: any = useContext(AsideContext);

    const [dataBooking, setBookingData] = useState<BookingsInterface[]>([]);
    const [selectData, setSelectData] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState('');
    const [isActiveButton, setIsActiveButton] = useState('allBookings');
    const [searchData, setSearchData] = useState<string>('');

    const bookingsSliceData = useAppSelector((state) => state.bookings.data);
    const bookingsSliceDataUpdated = useAppSelector((state) => state.bookings.bookingUpdateData);

    const status = useAppSelector((state) => state.bookings.status);
    const statusDelete = useAppSelector((state) => state.bookings.statusDelete);

    const dispatch = useAppDispatch();

    const allBookings = isActiveButton === 'allBookings';
    const checkIn = isActiveButton === 'checkIn';
    const checkOut = isActiveButton === 'checkOut';
    const inProgress = isActiveButton === 'inProgress';

    const navigate = useNavigate();

    let options: object = { year: 'numeric', month: 'long', day: 'numeric' };

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectData(e.target.value);
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchData(e.target.value.toLowerCase());
    }

    const handleTab = (activeButton: string) => {
        setIsActiveButton(activeButton);
    }

    const handleBookingId = (id: string | number | undefined) => {
        if (id !== undefined) {
            navigate(`/bookings/${id}`);
            dispatch(getBookingDetail(id));
        }
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    const handleOpenModal = (data: string) => {
        setModalInfo(data);
        setModalOpen(true);
    }

    const handleDelete = (id: string | number | undefined) => {
        if (id !== undefined)
            dispatch(deleteBooking(id));
    }

    const handleUpdate = (id: string | number | undefined) => {
        if (id !== undefined) {
            dispatch(getBookingDetail(id));
            navigate(`/bookings/update-bookings/${id}`);
        }    
    }

    const handleSelectDate = (date: Date | string) => {
        if (typeof date === 'string') {
          const [year, month, day] = date.split('-');
          return new Date(Number(year), Number(month) - 1, Number(day)).toLocaleDateString('en-EN', options);
        }
        return date.toLocaleDateString('en-EN', options);
    };

    useEffect(() => {
        let dataArray: BookingsInterface[] = bookingsSliceDataUpdated.length !== 0 ? [ ...bookingsSliceDataUpdated] : [...bookingsSliceData];

        if (status === 'fulfilled') {
            setBookingData(dataArray);
        }

        if (searchData !== '') {
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
                    return dateA.getTime() - dateB.getTime();;
                });
                break;
            case 'Guest':
                dataArray.sort((a, b) => a.guest.localeCompare(b.guest));
                break;
            default:
        }

        setBookingData(dataArray);

    }, [isActiveButton, selectData, searchData, bookingsSliceData, status, bookingsSliceDataUpdated]);

    useEffect(() => {
        dispatch(getAllBookings());
    }, [dispatch])

    const cols = [
        {
            property: 'guest', label: 'Guest', display: ({ guest, phone_number, id }: BookingsInterface) => (
                <TableContainerBodyContent>
                    <CostumerName darkmode={asideState.darkMode}>{guest}</CostumerName>
                    <Paragraphs>{phone_number}</Paragraphs>
                    <ButtonID onClick={() => handleBookingId(id)}>#{id}</ButtonID>
                </TableContainerBodyContent>
            )
        },
        {
            property: 'order_date', label: 'Order Date', display: ({ order_date }: BookingsInterface) => (
                <TableContainerBodyContent>
                    <OrderDate>{handleSelectDate(order_date)}</OrderDate>
                </TableContainerBodyContent>
            )
        },
        {
            property: 'check_in', label: 'Check In', display: ({ check_in }: BookingsInterface) => (
                <TableContainerBodyContent>
                    <CheckInDate darkmode={asideState.darkMode}>{handleSelectDate(check_in)}</CheckInDate>
                    <CheckInTime>9.46 PM</CheckInTime>
                </TableContainerBodyContent>
            )
        },
        {
            property: 'check_out', label: 'Check Out', display: ({ check_out }: BookingsInterface) => (
                <TableContainerBodyContent>
                    <CheckOutDate darkmode={asideState.darkMode}>{handleSelectDate(check_out) }</CheckOutDate>
                    <CheckOutTime>6.12 PM</CheckOutTime>
                </TableContainerBodyContent>
            )
        },
        {
            property: 'special_request', label: 'Special Request', display: ({ special_request }: BookingsInterface) => (
                <TableContainerBodyContent>
                    <ViewNotesButton onClick={() => handleOpenModal(special_request)}>View Notes</ViewNotesButton>
                </TableContainerBodyContent>
            )
        },
        {
            property: 'room_type', label: 'Room Type', display: ({ room_type, room_number }: BookingsInterface) => (
                <TableContainerBodyContent>
                    <TypeRoom darkmode={asideState.darkMode}>{room_type}-{room_number}</TypeRoom>
                </TableContainerBodyContent>
            )
        },
        {
            property: 'status', label: 'Status', display: ({ status, id }: BookingsInterface) => (
                <StatusContent>
                    <StatusParagraph status={status}>{status}</StatusParagraph>
                    <OptionsButton>
                        <BsTrash onClick={() => handleDelete(id)} />
                        <FiEdit onClick={() => handleUpdate(id)} />
                    </OptionsButton>
                </StatusContent>
            )
        }
    ]

    return (
        <>
            <MainContainer>
                <BookingContainer>
                    {statusDelete === 'pending' && <DeleteSpinner/>}
                    <Modal modalOpen={modalOpen}>
                        <ModalInfo>
                            <ButtonModalClose onClick={handleCloseModal}>
                                <AiOutlineCloseCircle />
                            </ButtonModalClose>
                            <p>{modalInfo}</p>
                        </ModalInfo>
                    </Modal>
                    <FilterContainer>
                        <TabsContainer>
                            <ButtonTabs actived={allBookings} onClick={() => handleTab('allBookings')}>
                                All Bookings
                            </ButtonTabs>
                            <ButtonTabs actived={checkIn} onClick={() => handleTab('checkIn')}>
                                Check In
                            </ButtonTabs>
                            <ButtonTabs actived={checkOut} onClick={() => handleTab('checkOut')}>
                                Check Out
                            </ButtonTabs>
                            <ButtonTabs actived={inProgress} onClick={() => handleTab('inProgress')}>
                                In Progress
                            </ButtonTabs>
                        </TabsContainer>
                        <Filters>
                            <input type="text" placeholder="Customer Name..." onChange={handleSearch} />
                            <Select onChange={handleSelect}>
                                <Option>Order Date</Option>
                                <Option>Guest</Option>
                            </Select>
                        </Filters>
                    </FilterContainer>
                    {status === 'fulfilled'
                        ? <Tabla cols={cols} data={dataBooking} totalCols={7} totalHeaders={7} />
                        : status === 'rejected' 
                            ? <ToastAlert></ToastAlert>
                            : <SpinnerLoader></SpinnerLoader>
                    }
                </BookingContainer>
            </MainContainer>
        </>
    )
}

interface PropsStyled {
    modalOpen?: boolean | string,
    actived?: boolean | string,
    darkmode?: boolean | string,
    onChange?: any /* cambiar esto */
}

const Modal = styled.div<PropsStyled>`
    display: ${(props: PropsStyled) => props.modalOpen === true ? 'block' : 'none'};
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
    color: ${(props: PropsStyled) => props.actived ? "#135846" : "#6E6E6E"};
    border-bottom: ${(props: PropsStyled) => props.actived ? "2px solid #135846" : "none"};
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

const Select = styled.select<PropsStyled>`
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

const CostumerName = styled.p<PropsStyled>`
    transition: 0.5s;
    color: ${(props: PropsStyled) => props.darkmode ? '#fff' : '#393939'};
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
    transition: 0.5s;
    color: ${(props: PropsStyled) => props.darkmode ? '#fff' : '#393939'};
`;

const CheckInTime = styled(Paragraphs)`
    font-size: 14px;
`;

const CheckOutDate = styled.p`
    transition: 0.5s;
    color: ${(props: PropsStyled) => props.darkmode ? '#fff' : '#393939'};
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
    transition: 0.5s;
    color: ${(props: PropsStyled) => props.darkmode ? '#fff' : '#393939'};
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
        margin-left: 13px;
        margin-top: 10px;
        transition: 0.5s;
        font-size: 0.9em;

        &:hover {
            transform: scale(1.1, 1.1);
        }
    }
`;

const StatusContent = styled(TableContainerBodyContent)`
    display: flex;
    flex-direction: row;

    p {
        color: ${(props: PropsStyled) => props.darkmode ? '#ffffff' : '#212121'};
    }
`;

