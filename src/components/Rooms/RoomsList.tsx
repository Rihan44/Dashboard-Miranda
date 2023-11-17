import styled from "styled-components";
import Swal from 'sweetalert2';

import error_image from '../../assets/error_image3.png';

import { useMemo, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { deleteTheRoom, getAllRooms, getRoom } from "../../features/slices/rooms/roomThunk";

import { SpinnerLoader } from "../Reusables/SpinnerLoader";
import { DeleteSpinner } from "../Reusables/DeleteSpinner";

import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

import { MainContainer } from "../Reusables/MainContainer";
import { Tabla } from "../Reusables/Tabla";
import { AsideContext } from "../Context/ToggleAsideContext";
import { StatusParagraph } from "../Reusables/StatusParagraph";
import { RoomInterface } from "../../interfaces/roomInterface";

export const RoomsList = () => {
    
    const {asideState} = useContext(AsideContext);
    let darkMode: boolean = asideState?.darkMode || false;

    const [isActiveButton, setIsActiveButton] = useState('allRooms');
    const [selectData, setSelectData] = useState('');

    const allRooms = isActiveButton === 'allRooms';
    const statusAvailable = isActiveButton === 'statusAvailable';
    const statusBooked = isActiveButton === 'statusBooked';

    const roomsData = useAppSelector((state) => state.rooms.data);

    const status = useAppSelector((state) => state.rooms.status);
    const statusDelete = useAppSelector((state) => state.rooms.statusDelete);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleTab = (activeButton: string) => {
        setIsActiveButton(activeButton);
    }

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectData(e.target.value);
    }

    const handleDelete = async(id: string | undefined) => {
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
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#135846',
            cancelButtonColor: '#E23428',
            confirmButtonText: 'Yes, delete it!'
        })

        if(id !== undefined && accept){
            dispatch(deleteTheRoom(id));
            setTimeout(() => {
                ToastDelete.fire({
                    icon: 'success',
                    title: 'Deleted room successfully!'
                  })
            }, 300)
        }
    }

    const handleEdit = (id: string | number | undefined) => {
        if(id !== undefined) {
            dispatch(getRoom(id));
            navigate(`/rooms/update-room/${id}`);
        } 
    }

    const dataRooms = useMemo(() => {
        let dataArray: RoomInterface[] = [];
        
        if(status === 'fulfilled') {
            dataArray = [...roomsData];

            switch (isActiveButton) {
                case 'statusAvailable':
                    dataArray = dataArray.filter(data => data.status === 'available');
                    break;
                case 'statusBooked':
                    dataArray = dataArray.filter(data => data.status === 'booked');
                    break;
                case 'allRooms':
                    dataArray.sort((a, b) => Number(a.room_number) - Number(b.room_number));
                    break;
                default:
                    dataArray.sort((a, b) => Number(a.room_number) - Number(b.room_number));
            }
    
            switch (selectData) {
                case 'Price':
                    dataArray = dataArray.sort((a, b) => Number(b.price) - Number(a.price));
                    break;
                case 'Room Type':
                    dataArray = dataArray.sort((a, b) => a.room_type.localeCompare(b.room_type));
                    break;
                default:
                    dataArray.sort((a, b) => Number(a.room_number) - Number(b.room_number));
            }
    
            return dataArray;
        }

    }, [isActiveButton, selectData, roomsData, status])

    useEffect(() => {
        dispatch(getAllRooms());
    }, [dispatch]);

    const cols = [
        {
            property: 'image', label: 'Room Photo', display: ({ room_photo }: RoomInterface) => (
                <TableContainerBodyContent>
                    <img src={room_photo || 'https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217.webp'} alt="imagen" />
                </TableContainerBodyContent>
            )
        },
        {
            property: 'room_number', label: 'Room Info', display: ({ _id, room_number }: RoomInterface) => (
                <TableContainerBodyContent>
                    <div>
                        <IDparagraph>{_id}</IDparagraph>
                        <p>N. {room_number}</p>
                    </div>
                </TableContainerBodyContent>
            )
        },
        {
            property: 'room_type', label: 'Room Type'
        },
        {
            property: 'amenities', label: 'Amenities', display: ({ amenities }: RoomInterface) => (
                <AmenitiesContainer>
                    <p>{amenities !== undefined ? amenities?.join(', ') : ''}</p>
                </AmenitiesContainer>
            )
        },
        {
            property: 'price', label: 'Price', display: ({ price, discount}: RoomInterface) => (
                <PriceParagraph darkmode={darkMode ? 0 : 1}>
                    {discount !== 0 ? <><del>{price}</del><small>/Night</small></> : <>{price}<small>/Night</small></>}
                </PriceParagraph>
            )
        },
        {
            property: 'offer_price', label: 'Offer Price', display: ({ discount, price }: RoomInterface) => (
                <Discount darkmode={darkMode ? 0 : 1}>{discount === 0 ? <del>No Offer</del> : (price - (discount * price / 100)).toFixed(2)}</Discount>
            )
        },
        {
            property: 'status', label: 'Status', display: ({ status, _id }: RoomInterface) =>
                <StatusContent>
                    <StatusParagraph status={status === undefined ? '' : status}>{status}</StatusParagraph>
                    <OptionsButton>
                        <BsTrash onClick={() => handleDelete(_id)} />
                        <FiEdit onClick={() => handleEdit(_id)} /> 
                    </OptionsButton>
                </StatusContent>
        }
    ]

    return (
        <>
            <MainContainer>
                <RoomsContainer>
                    <FilterContainer>
                    {statusDelete === 'pending' && <DeleteSpinner/>}
                        <TabsContainer>
                            <ButtonTabs actived={allRooms} onClick={() => handleTab('allRooms')}>
                                All Rooms
                            </ButtonTabs>
                            <ButtonTabs actived={statusAvailable} onClick={() => handleTab('statusAvailable')}>
                                All Available
                            </ButtonTabs>
                            <ButtonTabs actived={statusBooked} onClick={() => handleTab('statusBooked')}>
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
                    {status === 'fulfilled' || status === 'loading'
                        ? <Tabla cols={cols} data={dataRooms} totalCols={7} totalHeaders={7} />
                        : status === 'rejected' ? <ImageRejected src={error_image}/>
                            : <SpinnerLoader></SpinnerLoader>
                    }
                </RoomsContainer>
            </MainContainer>
        </>
    )
}

const RoomsContainer = styled.div`
    margin-top: 50px;
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

const ButtonTabs = styled(Buttons)<{actived: boolean}>`
    color: ${props => props.actived ? "#135846" : "#6E6E6E"};
    border-bottom: ${props => props.actived ? "2px solid #135846" : "none"};
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
    
    p {
        display: flex;
        align-items: center;
    }
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
        margin-top: 8px;
        transition: 0.5s;
        font-size: 0.9em;

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
    padding: 10px;

    img {
        width: 100%;
        height: 120px;
        background: #C5C5C5;
        border-radius: 10px;
    }

    div {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-left: 20px;
    }

`;
const IDparagraph = styled.p`
    color: #799283;
    font-size: 0.750em;
    margin-right: 17px;
`;

const AmenitiesContainer = styled.div`
    width: 100%;
    font-size: 14px;
    padding: 10px;
`;

const PriceParagraph = styled.p<{darkmode: number}>`
    color: ${props => props.darkmode === 0 ? '#fff' : '#212121'};
    font-weight: bold;
    font-size: 20px;
    transition: 0.5s;

    small {
        color: #799283;
        font-size: 14px;
        margin-left: 5px;
    }
`;

const Discount = styled.div<{darkmode: number}>`
    font-weight: bold;
    font-size: 20px;
    color: ${props => props.darkmode ===  0 ? '#fff' : '#212121'};
    transition: 0.5s;
`;

const ImageRejected = styled.img`
    width:  600px;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 140px;
`;
