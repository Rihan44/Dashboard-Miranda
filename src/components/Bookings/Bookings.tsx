import styled from "styled-components";
import Swal from 'sweetalert2';

import { format } from "date-fns";

import error_image from '../../assets/error_image3.png';

import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BsTrash } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

import { deleteBooking, getAllBookings, getBookingDetail} from "../../features/thunks/bookingsThunk";

import { MainContainer } from "../Reusables/MainContainer";
import { SpinnerLoader } from "../Reusables/SpinnerLoader";
import { Tabla } from "../Reusables/Tabla";
import { DeleteSpinner } from "../Reusables/DeleteSpinner";
import { AsideContext } from "../Context/ToggleAsideContext";
import { StatusParagraph } from "../Reusables/StatusParagraph";
import { ToastAlert } from "../Reusables/ToastAlert";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BookingsInterface } from "../../interfaces/bookingsInterface";

export const Bookings = () => {

    const {asideState} = useContext(AsideContext);

    let darkMode: boolean = asideState?.darkMode || false;

    const [selectData, setSelectData] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState('');
    const [isActiveButton, setIsActiveButton] = useState('allBookings');
    const [searchData, setSearchData] = useState<string>('');

    const bookingsSliceData = useAppSelector((state) => state.bookings.data);

    const status = useAppSelector((state) => state.bookings.status);
    const statusDelete = useAppSelector((state) => state.bookings.statusDelete);

    const dispatch = useAppDispatch();

    const allBookings = isActiveButton === 'allBookings';
    const checkIn = isActiveButton === 'checkIn';
    const checkOut = isActiveButton === 'checkOut';
    const inProgress = isActiveButton === 'inProgress';

    const navigate = useNavigate();

    let options: object = { year: 'numeric', month: 'long', day: 'numeric' };

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectData(e.target.value);
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchData(e.target.value.toLowerCase());
    }

    const handleTab = (activeButton: string) => {
        setIsActiveButton(activeButton);
    }

    const handleBookingId = (id: string | number | undefined)=> {
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

    const handleDelete = async (id: string | number | undefined) => {
        const ToastDelete = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    
        const { value: accept } = await Swal.fire({
            title: 'Are you sure you want to delete this booking?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#135846',
            cancelButtonColor: '#E23428',
            confirmButtonText: 'Yes, delete it!'
        })

        if (id !== undefined && accept){
            dispatch(deleteBooking(id));
            setTimeout(() => {
                ToastDelete.fire({
                    icon: 'success',
                    title: 'Deleted booking successfully!'
                  })
            }, 850)
           
        } 
    }

    const handleUpdate = (id: string | number | undefined) => {
        if (id !== undefined) {
            dispatch(getBookingDetail(id));
            navigate(`/bookings/update-bookings/${id}`);
        }    
    }

    const dataBooking  = useMemo(() => {
        let dataArray: BookingsInterface[] = [];

        if(status === 'fulfilled') {
            dataArray = [...bookingsSliceData];

            if (searchData !== '') {
                dataArray = dataArray.filter(data => data.guest.toLowerCase().includes(searchData.toLowerCase()));
            }
    
            switch (isActiveButton) {
                case 'allBookings':
                    return dataArray;
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
                        const dateA = a.order_date ? new Date(a.order_date) : null;
                        const dateB = b.order_date ? new Date(b.order_date) : null;

                        if (dateA && dateB) {
                            return dateA.getTime() - dateB.getTime();
                        }
            
                        return 0;
                    });
                    break;
                case 'Guest':
                    dataArray.sort((a, b) => a.guest.localeCompare(b.guest));
                    break;
                default:
            }
    
            return dataArray;
        }

    }, [isActiveButton, selectData, searchData, bookingsSliceData, status]);

    useEffect(() => {
        dispatch(getAllBookings());
    }, [dispatch])

    const cols = [
        {
            property: 'guest', label: 'Guest', display: ({ guest, phone_number, _id }: BookingsInterface) => (
                <TableContainerBodyContent>
                    <CostumerName darkmode={darkMode ? 0 : 1}>{guest}</CostumerName>
                    <Paragraphs>{phone_number}</Paragraphs>
                    <ButtonID onClick={() => handleBookingId(_id)}>#{_id}</ButtonID>
                </TableContainerBodyContent>
            )
        },
        {
            property: 'order_date', label: 'Order Date', display: ({ order_date }: BookingsInterface) => (
                <TableContainerBodyContent>
                    <OrderDate>{order_date ? format(new Date(order_date), "dd/MM/yyyy HH:mm") : "Invalid Date"}</OrderDate>
                </TableContainerBodyContent>
            )
        },
        {
            property: 'check_in', label: 'Check In', display: ({ check_in }: BookingsInterface) => (
                <TableContainerBodyContent>
                    <CheckInDate darkmode={darkMode ? 0 : 1}>{check_in ? format(new Date(check_in), "dd/MM/yyyy") : "Invalid Date"}</CheckInDate>
                    <CheckInTime>At {format(new Date(check_in),"HH:mm")}</CheckInTime>
                </TableContainerBodyContent>
            )
        },
        {
            property: 'check_out', label: 'Check Out', display: ({ check_out }: BookingsInterface) => (
                <TableContainerBodyContent>
                    <CheckOutDate darkmode={darkMode ? 0 : 1}>{check_out ? format(new Date(check_out), "dd/MM/yyyy") : "Invalid Date"}</CheckOutDate>
                    <CheckOutTime>At {format(new Date(check_out),"HH:mm")}</CheckOutTime>
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
                    <TypeRoom darkmode={darkMode ? 0 : 1}>{room_type}-{room_number}</TypeRoom>
                </TableContainerBodyContent>
            )
        },
        {
            property: 'status', label: 'Status', display: ({ status, _id }: BookingsInterface) => (
                <StatusContent>
                    <StatusParagraph status={status || ''}>{status}</StatusParagraph>
                    <OptionsButton>
                        <BsTrash onClick={() => handleDelete(_id)} />
                        <FiEdit onClick={() => handleUpdate(_id)} />
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
                    <Modal modalopen={modalOpen ? 0 : 1}>
                        <ModalInfo>
                            <ButtonModalClose onClick={handleCloseModal}>
                                <AiOutlineCloseCircle />
                            </ButtonModalClose>
                            <p>{modalInfo}</p>
                        </ModalInfo>
                    </Modal>
                    <FilterContainer>
                        <TabsContainer>
                            <ButtonTabs actived={allBookings.toString()} onClick={() => handleTab('allBookings')}>
                                All Bookings
                            </ButtonTabs>
                            <ButtonTabs actived={checkIn.toString()} onClick={() => handleTab('checkIn')}>
                                Check In
                            </ButtonTabs>
                            <ButtonTabs actived={checkOut.toString()} onClick={() => handleTab('checkOut')}>
                                Check Out
                            </ButtonTabs>
                            <ButtonTabs actived={inProgress.toString()} onClick={() => handleTab('inProgress')}>
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
                            ? <ImageRejected src={error_image}/>
                            : <SpinnerLoader></SpinnerLoader>
                    }
                </BookingContainer>
            </MainContainer>
        </>
    )
}

const Modal = styled.div<{modalopen: number}>`
    display: ${props => props.modalopen === 0 ? 'block' : 'none'};
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
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
    height: 300px;
    border: 1px solid #EBEBEB;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0px 4px 4px #00000010;
    word-wrap: break-word;
    text-align: center;
    overflow-y: scroll; 

    p {
        width: 90%;
        margin: auto;
        margin-top: 20px;
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


const ButtonTabs = styled(Buttons)<{actived: string}>`
    color: ${props => props.actived === 'true' ? "#135846" : "#6E6E6E"};
    border-bottom: ${props => props.actived === 'true' ? "2px solid #135846" : "none"};
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

const Select = styled.select<{onChange: any}>`
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

const CostumerName = styled.p<{darkmode: number}>`
    transition: 0.5s;
    color: ${props => props.darkmode === 0 ? '#fff' : '#393939'};
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

const CheckInDate = styled.p<{darkmode: number}>`
    transition: 0.5s;
    color: ${props => props.darkmode === 0 ? '#fff' : '#393939'};
`;

const CheckInTime = styled(Paragraphs)`
    font-size: 14px;
`;

const CheckOutDate = styled.p<{darkmode: number}>`
    transition: 0.5s;
    color: ${props => props.darkmode === 0 ? '#fff' : '#393939'};
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

const TypeRoom = styled.p<{darkmode: number}>`
    transition: 0.5s;
    color: ${props => props.darkmode === 0 ? '#fff' : '#393939'};
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
`;

const ImageRejected = styled.img`
    width:  600px;
    border-radius: 10px;
    margin-top: 140px;
    margin-left: 350px;
`;
