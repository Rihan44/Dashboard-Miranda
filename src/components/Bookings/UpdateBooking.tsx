import styled from "styled-components";
import { FormEvent, useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { MainContainer } from "../Reusables/MainContainer";

import { AiOutlineArrowLeft } from "react-icons/ai";

import { AsideContext } from "../Context/ToggleAsideContext";

import { SpinnerLoader } from "../Reusables/SpinnerLoader";
import { ToastAlert } from "../Reusables/ToastAlert";
import { getBookingDetail, updateBooking } from "../../features/bookingsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BookingsInterface } from "../../interfaces/bookingsInterface";

export const UpdateBooking = () => {

    const [guestNumber, setGuestNumber] = useState('');
    const [guestName, setGuestName] = useState('');
    const [priceState, setPriceState] = useState<number | string>('');
    const [specialRequest, setSpecialRequest] = useState('');
    const [checkIn, setCheckIn] = useState<Date | string>('');
    const [checkOut, setCheckOut] = useState<Date | string>('');
    const [roomTypeState, setRoomTypeState] = useState('');
    const [roomNumberState, setRoomNumberState] = useState<number | string>('');

    const paramsID = useParams();
    const id: string | undefined = paramsID.id;

    const {asideState}: any = useContext(AsideContext);

    const bookingsData = useAppSelector((state) => state.bookings.dataBooking);

    const status = useAppSelector((state) => state.bookings.status);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    }

    const handleUpdate = () => {
        const dataUpdate: BookingsInterface = {
            id: id,
            guest: guestName,
            phone_number: guestNumber,
            check_in: checkIn,
            check_out: checkOut,
            special_request: specialRequest,
            room_number: roomNumberState,
            room_type: roomTypeState,
            order_date: '',
            status: '',
            price: priceState
        }
        dispatch(updateBooking(dataUpdate));
        navigate('/bookings');
    }

    const handleGuestName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setGuestName(e.target.value);
    }

    const handleGuestNumber = (e: any): void => {
        setGuestNumber(e.target.value);
    }

    const handleCheckIn = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCheckIn(e.target.value);
    }

    const handleCheckOut = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCheckOut(e.target.value);
    }

    const handleSpecialRequest = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSpecialRequest(e.target.value);
    }

    const handleRoomNumber = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setRoomNumberState(e.target.value);
    }
    
    const handleRoomType = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setRoomTypeState(e.target.value);
    }

    const handlePrice = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPriceState(e.target.value);
    } 

    useEffect(() => {
        let data: BookingsInterface[] = [...bookingsData];

        if(status === 'fulfilled') {
            try {
                setGuestName(data[0].guest);
                setGuestNumber(data[0].phone_number);
                setCheckIn(data[0].check_in);
                setCheckOut(data[0].check_out);
                setSpecialRequest(data[0].special_request);
                setRoomTypeState(data[0].room_type);
                setPriceState(data[0].price);
                setRoomNumberState(data[0].room_number);
            } catch {
                <ToastAlert></ToastAlert>
            }
        }

    }, [bookingsData, status]);

    useEffect(() => {
        if(id !== undefined)
            dispatch(getBookingDetail(id));
    }, [dispatch, id]);

    return(
        <MainContainer>
            <UpdateRoomContainer>
            {status === 'fulfilled' ?
                <>
                    <ButtonBack onClick={() => navigate('/bookings')}><AiOutlineArrowLeft/></ButtonBack>
                    <FormContainer>
                        <Title>Update Booking: {id}</Title>
                        <Form onSubmit={handleSubmit} darkmode={asideState.darkMode}>
                        <FormBox>
                                <FormBoxInner>
                                    <div>
                                        <Label>Guest Name</Label>
                                        <Input type="text" value={guestName} onChange={handleGuestName}/>
                                    </div>
                                    <div>
                                        <Label>Phone Number</Label>
                                        <Input type="text" value={guestNumber} onChange={handleGuestNumber}/>
                                    </div>
                                    <div>
                                        <Label>Check In</Label>
                                        <Input type="date" value={checkIn} onChange={handleCheckIn}/>
                                    </div>
                                    <div>
                                        <Label>Check Out</Label>
                                        <Input type="date" value={checkOut} onChange={handleCheckOut}/>
                                    </div>
                                    <div>
                                        <Label>Price</Label>
                                        <Input type="text" value={priceState} onChange={handlePrice}/>
                                    </div>
                                    <div>
                                        <Label>Room Type</Label>
                                        <Select onChange={handleRoomType}>
                                            <Option>{roomTypeState}</Option>
                                            <Option>Single Bed</Option>
                                            <Option>Double Bed</Option>
                                            <Option>Suite</Option>
                                            <Option>Deluxe</Option>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Room Number</Label>
                                        <Input type="text" value={roomNumberState} onChange={handleRoomNumber}/>
                                    </div>
                                    <div>
                                        <Label>Special Request</Label>
                                        <Input type="text" value={specialRequest} onChange={handleSpecialRequest}/>
                                    </div>                              
                                </FormBoxInner>
                            </FormBox>
                            <Button onClick={handleUpdate}>Update Booking</Button>
                        </Form>
                    </FormContainer>
                    </>
                    : status === 'rejected' ? <ToastAlert></ToastAlert>
                        : <SpinnerLoader></SpinnerLoader>}
            </UpdateRoomContainer>
        </MainContainer>
    )
}

interface Props {
    darkmode?: boolean
    onChange?: any /* TODO CAMBIAR EL TIPO */
    value?: any /* TODO CAMBIAR EL TIPO */
}

const UpdateRoomContainer = styled.div`
    margin: 20px;
    position: relative;
    max-width: 1300px;
`;

const FormContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h2`
    font-size: 2em;
    color: #135846;
    font-family: 'Poppins', sans-serif;
`;

const Form = styled.form<Props>`
    width: 750px;
    height: 660px;
    box-shadow: 0px 3px 10px #00000030;
    margin-top: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: ${props => props.darkmode ? '#202020' : '#ffff'};
    transition: 0.5s;

    div {
        display: flex;
        width: 90%;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        margin-top: 10px;
    }
`;

const FormBox = styled.div`
    display: flex;
`;

const FormBoxInner = styled.div`
    display:flex;
    flex-direction: column;

    div {
        width: 80%;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
    }
`;

const Select = styled.select<Props>`
    width: 140px; 
    height: 30px;
    border: 1px solid #135846;
    border-radius: 12px;
    color: #135846;
    background: none;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    margin-right: 10px;
`;

const Option = styled.option`
    background: #ffffff;
`;

const Input = styled.input<Props>`
    margin-left: 20px;
    margin-bottom: 10px;
    width: 150px;
    height: 30px;
    border: none;
    outline: gray;
    border-radius: 5px;
    box-shadow: 0px 3px 10px #00000030;
    padding: 10px;
    font-family: 'Poppins', sans-serif;
    color: #262626;
`;

const Label = styled.label`
    color: #135846;
    font-family: 'Poppins', sans-serif;
`;

const Button = styled.button` 
    background: #EBF1EF 0% 0% no-repeat padding-box;
    background: #135846;
    color: #FFFFFF;
    width: 150px;
    height: 40px;
    border-radius: 12px;
    margin-right: 20px;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    transition: 0.3s;
    cursor: pointer;
    margin-bottom: 25px;
    border: none;
    box-shadow: 0px 3px 10px #00000030;
    position: absolute;
    bottom: 0px;
    right: 10px;

    &:hover {
        background: #799283;
    }

    &:hover {
        background: #799283 0% 0% no-repeat padding-box;
        color: #EBF1EF;
    }
`;

const ButtonBack = styled(Button)`
    position: absolute;
    top: 1%;
    left: 3%;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

     &:hover {
        transform: scale(1.1);
        background: #135846;
     }
`;